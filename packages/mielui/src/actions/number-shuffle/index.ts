import { tick } from 'svelte';
import type { Action } from 'svelte/action';
import { createRollRenderer } from './render';

export type NumberShuffleOptions = {
    value: number;
    format?: (value: number) => string;
    duration?: number;
};

function decimalPlaces(value: number) {
    const [coefficient, exponent = '0'] = String(value).split('e');
    const fraction = coefficient.split('.')[1]?.length ?? 0;
    return Math.min(10, Math.max(0, fraction - Number(exponent)));
}

export const numberShuffle: Action<HTMLElement, NumberShuffleOptions> = (node, initial) => {
    let options = initial;
    let current = 0;
    let frame = 0;
    let revision = 0;
    let disposed = false;
    let reservedWidth = node.getBoundingClientRect().width;
    const original = {
        position: node.style.position,
        display: node.style.display,
        minWidth: node.style.minWidth,
        fontVariantNumeric: node.style.fontVariantNumeric
    };
    const sourceFill = node.style.getPropertyValue('-webkit-text-fill-color');
    const sourceFillPriority = node.style.getPropertyPriority('-webkit-text-fill-color');
    let fontSignature = '';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visual = document.createElement('span');
    visual.className =
        'pointer-events-none absolute inset-0 flex items-center justify-center whitespace-pre tabular-nums';
    visual.setAttribute('aria-hidden', 'true');
    visual.setAttribute('data-number-shuffle-visual', '');
    visual.inert = true;
    visual.style.setProperty('-webkit-text-fill-color', 'currentColor');
    const renderer = createRollRenderer(visual);

    function format(value: number) {
        return options.format ? options.format(value) : String(value);
    }

    function target() {
        return Number.isFinite(options.value) ? options.value : 0;
    }

    function readDuration() {
        const token = getComputedStyle(node).getPropertyValue('--motion-duration-panel').trim();
        const amount = Number.parseFloat(token);
        if (reduced.matches || amount === 0) {
            return 0;
        }
        if (options.duration !== undefined && Number.isFinite(options.duration)) {
            return Math.max(0, options.duration);
        }
        const milliseconds = token.endsWith('ms') ? amount : amount * 1000;
        return Number.isFinite(milliseconds) ? milliseconds * 2 : 480;
    }

    function synchronizeSurface() {
        const appearance = getComputedStyle(node);
        const nextFont = `${appearance.font} ${appearance.letterSpacing}`;
        if (nextFont !== fontSignature) {
            fontSignature = nextFont;
            node.style.minWidth = original.minWidth;
            reservedWidth = 0;
        }
        node.style.setProperty('-webkit-text-fill-color', 'transparent');
        if (appearance.position === 'static') {
            node.style.position = 'relative';
        }
        if (appearance.display === 'inline') {
            node.style.display = 'inline-block';
        }
        node.style.fontVariantNumeric = 'tabular-nums';
        reservedWidth = Math.max(reservedWidth, node.getBoundingClientRect().width);
        node.style.minWidth = `${reservedWidth}px`;
        if (!node.contains(visual)) {
            node.append(visual);
        }
    }

    function settle() {
        revision += 1;
        cancelAnimationFrame(frame);
        current = target();
        synchronizeSurface();
        renderer.settle(format(current));
    }

    async function animate() {
        const change = ++revision;
        cancelAnimationFrame(frame);
        await tick();
        if (disposed || change !== revision) {
            return;
        }
        synchronizeSurface();
        const end = target();
        const start = current;
        const duration = readDuration();
        if (duration === 0 || start === end) {
            settle();
            return;
        }
        const direction = Math.sign(end - start);
        const precision = decimalPlaces(end);
        const started = performance.now();
        function advance(now: number) {
            if (disposed || change !== revision) {
                return;
            }
            const progress = Math.min(1, (now - started) / duration);
            current = start + (end - start) * (1 - (1 - progress) ** 3);
            if (progress < 1) {
                renderer.roll(current, direction, precision, format);
                frame = requestAnimationFrame(advance);
            } else {
                current = end;
                renderer.settle(format(end));
            }
        }
        advance(started);
    }

    let themeDuration = readDuration();
    const observer = new MutationObserver((records) => {
        if (
            node.style.getPropertyValue('-webkit-text-fill-color') !== 'transparent' ||
            records.some((record) => record.target !== node || record.attributeName === 'class')
        ) {
            synchronizeSurface();
        }
        const next = readDuration();
        if (next !== themeDuration) {
            themeDuration = next;
            if (next === 0) {
                settle();
            }
        }
    });
    let ancestor: HTMLElement | null = node;
    while (ancestor) {
        observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
        ancestor = ancestor.parentElement;
    }
    const resize = new ResizeObserver(() => {
        const appearance = getComputedStyle(node);
        if (`${appearance.font} ${appearance.letterSpacing}` !== fontSignature) {
            synchronizeSurface();
        }
    });
    resize.observe(node);
    reduced.addEventListener('change', settle);
    void animate();

    return {
        update(next) {
            const changed = next.value !== options.value || next.format !== options.format;
            options = next;
            if (changed) {
                void animate();
            } else if (readDuration() === 0) {
                settle();
            }
        },
        destroy() {
            disposed = true;
            revision += 1;
            cancelAnimationFrame(frame);
            observer.disconnect();
            resize.disconnect();
            reduced.removeEventListener('change', settle);
            visual.remove();
            Object.assign(node.style, original);
            if (node.style.getPropertyValue('-webkit-text-fill-color') === 'transparent') {
                node.style.setProperty('-webkit-text-fill-color', sourceFill, sourceFillPriority);
            }
        }
    };
};
