import { tick } from 'svelte';
import type { Action } from 'svelte/action';
import { svgTransition } from './geometry';

type Options = {
    key: unknown;
    duration?: number;
};
export const morph: Action<HTMLElement, Options> = (node, initial) => {
    let options = initial;
    let frame = 0;
    let revision = 0;
    let disposed = false;
    const originalPosition = node.style.position;
    const originalColor = node.style.color;
    const hiddenSvgs = new Map<SVGSVGElement, string>();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    visual.setAttribute('data-morph-visual', '');
    visual.inert = true;
    Object.assign(visual.style, {
        position: 'absolute',
        inset: '0',
        display: 'grid',
        placeItems: 'center',
        pointerEvents: 'none',
        lineHeight: 'inherit'
    });
    if (getComputedStyle(node).position === 'static') {
        node.style.position = 'relative';
    }

    function read() {
        for (const [svg, opacity] of hiddenSvgs) {
            if (!node.contains(svg)) {
                svg.style.opacity = opacity;
                hiddenSvgs.delete(svg);
            }
        }
        const svg = [...node.querySelectorAll<SVGSVGElement>('svg')].find(
            (svg) => !visual.contains(svg)
        );
        if (svg) {
            if (!hiddenSvgs.has(svg)) {
                hiddenSvgs.set(svg, svg.style.opacity);
            }
            const clone = svg.cloneNode(true) as SVGSVGElement;
            clone.style.opacity = '1';
            clone.style.visibility = 'visible';
            clone.style.width = '100%';
            clone.style.height = '100%';
            svg.style.opacity = '0';
            return clone;
        }
        return [...node.childNodes]
            .filter((child) => child !== visual)
            .map((child) => child.textContent ?? '')
            .join('');
    }

    function syncColor() {
        node.style.color = originalColor;
        const hasSvg = [...node.querySelectorAll('svg')].some((svg) => !visual.contains(svg));
        visual.style.color = hasSvg ? 'inherit' : getComputedStyle(node).color;
        if (!hasSvg) {
            node.style.color = 'transparent';
        }
    }

    function render(value: SVGSVGElement | string) {
        visual.replaceChildren(value);
    }

    syncColor();
    render(read());
    node.append(visual);

    async function animate() {
        const current = ++revision;
        cancelAnimationFrame(frame);
        await tick();
        if (disposed || current !== revision) {
            return;
        }
        syncColor();
        const target = read();
        const duration = options.duration ?? 220;
        const themeDuration = getComputedStyle(node).getPropertyValue('--motion-duration-panel');
        if (
            reduced.matches ||
            Number.parseFloat(themeDuration) === 0 ||
            !Number.isFinite(duration) ||
            duration <= 0
        ) {
            render(target);
            return;
        }
        const existing = [...visual.querySelectorAll<SVGSVGElement>(':scope > svg')];
        const source = existing[0];
        let draw: (progress: number) => void;
        if (source && target instanceof SVGSVGElement) {
            const incoming = target.cloneNode(true) as SVGSVGElement;
            Object.assign(incoming.style, { position: 'absolute', inset: '0', opacity: '0' });
            visual.append(incoming);
            try {
                const geometry =
                    existing.length === 1 && Number(source.style.opacity || 1) === 1
                        ? svgTransition(source, incoming)
                        : null;
                incoming.remove();
                if (geometry) {
                    draw = geometry;
                } else {
                    visual.append(incoming);
                    const outgoing = existing.map((svg) => ({
                        svg,
                        opacity: Number(svg.style.opacity || 1),
                        rotation: Number(
                            svg.style.transform.match(/rotate\((-?[\d.]+)deg\)/)?.[1] ?? 0
                        ),
                        scale: Number(svg.style.transform.match(/scale\(([\d.]+)\)/)?.[1] ?? 1)
                    }));
                    draw = (progress) => {
                        for (const entry of outgoing) {
                            entry.svg.style.opacity = String(entry.opacity * (1 - progress));
                            entry.svg.style.transform = `rotate(${entry.rotation + (-90 - entry.rotation) * progress}deg) scale(${entry.scale + (0.5 - entry.scale) * progress})`;
                        }
                        incoming.style.opacity = String(progress);
                        incoming.style.transform = `rotate(${90 * (1 - progress)}deg) scale(${0.5 + progress * 0.5})`;
                    };
                }
            } catch {
                render(target);
                return;
            }
        } else {
            if (visual.childElementCount === 0) {
                const text = document.createElement('span');
                text.textContent = visual.textContent;
                text.style.gridArea = '1 / 1';
                text.style.whiteSpace = 'inherit';
                visual.replaceChildren(text);
            }
            const outgoing = [...visual.children].map((element) => ({
                element: element as HTMLElement,
                opacity: Number((element as HTMLElement).style.opacity || 1)
            }));
            const after = document.createElement('span');
            after.textContent = typeof target === 'string' ? target : '';
            Object.assign(after.style, { gridArea: '1 / 1', whiteSpace: 'inherit' });
            visual.append(after);
            draw = (progress) => {
                for (const entry of outgoing) {
                    entry.element.style.opacity = String(entry.opacity * (1 - progress));
                    entry.element.style.filter = `blur(${progress * 2}px)`;
                }
                after.style.opacity = String(progress);
                after.style.filter = `blur(${(1 - progress) * 2}px)`;
            };
        }
        draw(0);
        const start = performance.now();
        function step(now: number) {
            if (disposed || current !== revision) {
                return;
            }
            const progress = Math.min(1, (now - start) / duration);
            draw(1 - (1 - progress) ** 4);
            if (progress < 1) {
                frame = requestAnimationFrame(step);
            } else {
                render(target);
            }
        }
        frame = requestAnimationFrame(step);
    }

    function settle() {
        revision += 1;
        cancelAnimationFrame(frame);
        syncColor();
        render(read());
    }

    let themeDuration = getComputedStyle(node).getPropertyValue('--motion-duration-panel');
    const themeObserver = new MutationObserver((records) => {
        const nextDuration = getComputedStyle(node).getPropertyValue('--motion-duration-panel');
        if (nextDuration !== themeDuration) {
            themeDuration = nextDuration;
            settle();
        } else if (
            records.some((record) => record.target !== node || record.attributeName === 'class')
        ) {
            syncColor();
        }
    });
    let ancestor: HTMLElement | null = node;
    while (ancestor) {
        themeObserver.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
        ancestor = ancestor.parentElement;
    }

    reduced.addEventListener('change', settle);
    return {
        update(next) {
            const changed = !Object.is(options.key, next.key);
            options = next;
            if (changed) {
                void animate();
            }
        },
        destroy() {
            themeObserver.disconnect();
            disposed = true;
            revision += 1;
            cancelAnimationFrame(frame);
            visual.remove();
            node.style.position = originalPosition;
            node.style.color = originalColor;
            for (const [svg, opacity] of hiddenSvgs) {
                svg.style.opacity = opacity;
            }
            hiddenSvgs.clear();
            reduced.removeEventListener('change', settle);
        }
    };
};
