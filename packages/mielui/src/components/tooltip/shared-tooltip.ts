/**
 * A single shared tooltip surface.
 *
 * Every Tooltip.Trigger drives this one element, so moving from one trigger to
 * another *morphs* the same bubble -- the background stays put while it slides
 * and reshapes around the new label.
 *
 * Centering trick: the bubble is anchored by its *center* (left = trigger
 * centre + `translateX(-50%)`), so its width can change freely without ever
 * drifting off the trigger.
 *
 * Presentation lives in `ui.css` under `.mielui-tooltip`.
 */
import { autoUpdate, computePosition, flip, offset, type Placement, shift } from '@floating-ui/dom';
import '@scritto/core';
import { getCssDuration } from '@mielui/svelte/transition';
import type { Scritto as ScrittoElement } from '@scritto/core';

export function createTooltipManager() {
    let bubble: HTMLDivElement | null = null;
    let measurer: HTMLSpanElement | null = null;
    let label: HTMLSpanElement | null = null;
    let roller: ScrittoElement | null = null;
    let currentClass = '';
    let currentSource: HTMLElement | undefined;

    let visible = false;
    let currentText = '';
    let activeRef: HTMLElement | null = null;
    let pendingRef: HTMLElement | null = null;
    let lastCenter = 'translateX(-50%)';
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    let stopMotionTracking: (() => void) | undefined;
    let stopTracking: (() => void) | undefined;

    const SHOW = 'scale(1)';
    const HIDE = 'scale(0.94)';

    /**
     * Whether this platform can drive a Scritto roll. The unit-test DOM has no
     * `matchMedia` or Web Animations `getAnimations`, so it keeps the plain
     * textContent swap there while real browsers roll.
     */
    function supportsRoll(): boolean {
        return (
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            typeof Element !== 'undefined' &&
            typeof Element.prototype.getAnimations === 'function'
        );
    }

    /**
     * Writes `text` into the bubble label. Single-word labels ride the roller
     * (rolling when `animate`, set instantly otherwise); anything with whitespace
     * keeps the plain textContent swap so multi-word rows never hit the roller's
     * word layout.
     */
    function cloneVisual(source: HTMLElement, target: HTMLElement) {
        const excluded = new Set(['script', 'style', 'link', 'iframe', 'object', 'embed']);
        const passive = new Set([
            'span',
            'div',
            'p',
            'strong',
            'b',
            'em',
            'i',
            's',
            'del',
            'ins',
            'small',
            'sub',
            'sup',
            'code',
            'kbd',
            'samp',
            'time',
            'mark',
            'br',
            'ul',
            'ol',
            'li',
            'svg',
            'g',
            'path',
            'circle',
            'ellipse',
            'rect',
            'line',
            'polyline',
            'polygon',
            'text',
            'tspan'
        ]);
        function copyNode(node: Node): Node | undefined {
            if (!(node instanceof Element)) {
                return node.nodeType === Node.TEXT_NODE ? node.cloneNode(false) : undefined;
            }
            if (excluded.has(node.localName)) {
                return undefined;
            }
            const copy = passive.has(node.localName)
                ? (node.cloneNode(false) as Element)
                : document.createElement('span');
            for (const attribute of [...copy.attributes]) {
                if (
                    attribute.name === 'id' ||
                    attribute.name === 'for' ||
                    attribute.name === 'name' ||
                    attribute.name === 'form' ||
                    attribute.name === 'autofocus' ||
                    attribute.name === 'tabindex' ||
                    attribute.name === 'list' ||
                    attribute.name === 'headers' ||
                    attribute.name === 'contenteditable' ||
                    (['href', 'xlink:href'].includes(attribute.name) &&
                        attribute.value.startsWith('#')) ||
                    attribute.name.startsWith('aria-') ||
                    attribute.name.startsWith('on')
                ) {
                    copy.removeAttribute(attribute.name);
                }
            }
            for (const child of node.childNodes) {
                const copiedChild = copyNode(child);
                if (copiedChild) {
                    copy.appendChild(copiedChild);
                }
            }
            return copy;
        }
        const fragment = document.createDocumentFragment();
        for (const child of source.childNodes) {
            const copy = copyNode(child);
            if (copy) {
                fragment.appendChild(copy);
            }
        }
        target.replaceChildren(fragment);
    }

    function setLabel(text: string, animate: boolean) {
        const reduced =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        const duration = activeRef
            ? getCssDuration(activeRef, '--motion-duration-panel', 180)
            : 180;
        animate = animate && !reduced && duration > 0;
        if (!label) {
            return;
        }
        if (currentSource) {
            cloneVisual(currentSource, label);
            return;
        }
        if (roller && !reduced && duration > 0 && !/\s/.test(text)) {
            roller.setOptions({ transition: { duration } });
            if (roller.parentNode !== label) {
                label.replaceChildren(roller);
            }
            if (animate) {
                roller.update(text);
            } else {
                roller.value = text;
            }
            return;
        }
        label.textContent = text;
    }

    /**
     * Lazily builds the bubble, its label span, and the off-screen measuring twin.
     *
     * The twin exists so `applyWidth` can read a target width before the label
     * swaps, letting the bubble transition its shape instead of snapping when the
     * new label is a different length.
     *
     * The label span hosts a `<scritto-text>` roller when the platform supports
     * it; `setLabel` routes single-word labels through it.
     */
    function ensure() {
        if (bubble || typeof document === 'undefined') {
            return;
        }

        const el = document.createElement('div');
        el.setAttribute('data-mielui-tooltip', '');
        el.setAttribute('aria-hidden', 'true');
        el.inert = true;
        el.className = 'mielui-tooltip';
        el.style.transform = `translateX(-50%) ${HIDE}`;

        const span = document.createElement('span');
        span.className = 'mielui-tooltip-label';
        el.appendChild(span);
        document.body.appendChild(el);

        const m = document.createElement('span');
        m.setAttribute('aria-hidden', 'true');
        m.inert = true;
        m.className = 'mielui-tooltip-measure';
        document.body.appendChild(m);

        document.addEventListener('keydown', handleEscape);
        bubble = el;
        measurer = m;
        label = span;

        if (supportsRoll()) {
            const host = document.createElement('scritto-text') as ScrittoElement;
            span.appendChild(host);
            roller = host;
        }
    }

    function applyBubbleClass(className = '') {
        if (!bubble) {
            return;
        }
        currentClass = className;
        bubble.className = className ? `mielui-tooltip ${className}` : 'mielui-tooltip';
        if (measurer) {
            measurer.className = className
                ? `mielui-tooltip-measure ${className}`
                : 'mielui-tooltip-measure';
        }
    }

    /** Sizes the bubble to the measured width of `text` so the change can transition. */
    function applyWidth(text: string) {
        if (!bubble || !measurer) {
            return;
        }
        if (currentSource) {
            cloneVisual(currentSource, measurer);
        } else {
            measurer.textContent = text;
        }
        bubble.style.width = `${measurer.offsetWidth}px`;
    }

    /**
     * Places the bubble against `ref`.
     *
     * The `fixed` strategy is required because the bubble is `position: fixed` --
     * with absolute coordinates it drifts by the page scroll once you scroll down to
     * a component. The result is anchored by the bubble's centre so width and height
     * changes never decentre it. Rejections are swallowed: the active trigger can
     * disappear while Floating UI is measuring it, and a removed trigger needs no
     * recovery and must not leak an unhandled rejection.
     */
    function reposition(ref: HTMLElement, placement: Placement, animated: boolean) {
        if (!bubble) {
            return;
        }
        void computePosition(ref, bubble, {
            strategy: 'fixed',
            placement,
            middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })]
        })
            .then(({ x, y }) => {
                if (!bubble || activeRef !== ref) {
                    return;
                }
                const horizontal = placement === 'top' || placement === 'bottom';
                const center = horizontal ? 'translateX(-50%)' : 'translateY(-50%)';
                lastCenter = center;
                const left = horizontal ? x + bubble.offsetWidth / 2 : x;
                const top = horizontal ? y : y + bubble.offsetHeight / 2;

                if (animated) {
                    bubble.style.left = `${left}px`;
                    bubble.style.top = `${top}px`;
                } else {
                    const prev = bubble.style.transition;
                    bubble.style.transition = 'none';
                    bubble.style.transform = `${center} ${HIDE}`;
                    bubble.style.left = `${left}px`;
                    bubble.style.top = `${top}px`;
                    void bubble.offsetHeight;
                    bubble.style.transition = prev;
                }
                requestAnimationFrame(() => {
                    if (!bubble || activeRef !== ref) {
                        return;
                    }
                    bubble.style.opacity = '1';
                    bubble.style.transform = `${center} ${SHOW}`;
                });
            })
            .catch(() => {});
    }

    /**
     * Keeps the open bubble glued to `ref` across scroll, resize, and layout
     * shifts. The update only moves `left`/`top`, so the bubble glides on its
     * existing transition instead of replaying the show animation.
     */
    function trackPosition(ref: HTMLElement, placement: Placement) {
        stopTracking?.();
        if (!bubble) {
            return;
        }
        stopTracking = autoUpdate(ref, bubble, () => {
            if (activeRef === ref) {
                reposition(ref, placement, true);
            }
        });
    }

    function trackMotion(ref: HTMLElement) {
        stopMotionTracking?.();
        const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
        function refreshMotion() {
            if (!bubble || activeRef !== ref) {
                return;
            }
            for (const token of ['--motion-duration-panel', '--motion-duration-hover']) {
                const duration = preference?.matches ? 0 : getCssDuration(ref, token, 180);
                bubble.style.setProperty(token, `${duration}ms`);
            }
            setLabel(currentText, false);
        }
        refreshMotion();
        const observer = new MutationObserver(refreshMotion);
        for (let ancestor: HTMLElement | null = ref; ancestor; ancestor = ancestor.parentElement) {
            observer.observe(ancestor, { attributes: true, attributeFilter: ['style', 'class'] });
        }
        preference?.addEventListener('change', refreshMotion);
        stopMotionTracking = () => {
            observer.disconnect();
            preference?.removeEventListener('change', refreshMotion);
        };
    }

    /** Shows the bubble for `ref`; when one is already up it morphs to this label. */
    function present(
        ref: HTMLElement,
        text: string,
        placement: Placement,
        className = '',
        source?: HTMLElement
    ) {
        if (!bubble || !label || !ref.isConnected) {
            return;
        }
        pendingRef = null;
        clearTimeout(closeTimer);
        const morph = visible;
        activeRef = ref;
        currentSource = source;
        setLabel(text, false);
        currentText = text;
        trackMotion(ref);
        applyBubbleClass(className);
        applyWidth(text);
        reposition(ref, placement, morph);
        trackPosition(ref, placement);
        visible = true;
    }

    /** Hover/focus a trigger: show after `delay`, or morph instantly if one is already up. */
    function showTooltip(
        ref: HTMLElement,
        text: string,
        placement: Placement = 'top',
        delay = 125,
        className = '',
        source?: HTMLElement
    ) {
        if (typeof document === 'undefined' || !text) {
            return;
        }
        ensure();
        pendingRef = ref;
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        if (visible || delay <= 0) {
            present(ref, text, placement, className, source);
        } else {
            openTimer = setTimeout(() => present(ref, text, placement, className, source), delay);
        }
    }

    /** Re-label the active bubble in place (for example, a Copy→Copied flip). */
    function updateTooltipText(ref: HTMLElement, text: string) {
        if (!visible || activeRef !== ref || !label || !text || text === currentText) {
            return;
        }
        setLabel(text, true);
        currentText = text;
        applyWidth(text);
    }

    function updateTooltipClass(ref: HTMLElement, className: string) {
        if (!visible || activeRef !== ref || className === currentClass) {
            return;
        }
        applyBubbleClass(className);
        applyWidth(currentText);
    }

    /** Force the bubble up now and, unless the pointer is over the trigger, auto-hide after `holdMs`. */
    function flashTooltip(
        ref: HTMLElement,
        text: string,
        placement: Placement = 'top',
        holdMs = 1500,
        className = '',
        source?: HTMLElement
    ) {
        if (typeof document === 'undefined' || !text) {
            return;
        }
        ensure();
        pendingRef = ref;
        clearTimeout(openTimer);
        present(ref, text, placement, className, source);
        const hovered = typeof ref.matches === 'function' && ref.matches(':hover');
        if (!hovered) {
            clearTimeout(closeTimer);
            closeTimer = setTimeout(dismiss, holdMs);
        }
    }

    function handleEscape(event: KeyboardEvent) {
        if (event.key === 'Escape' && (visible || pendingRef)) {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
            pendingRef = null;
            dismiss();
        }
    }

    function dismiss() {
        if (!bubble) {
            return;
        }
        stopTracking?.();
        stopTracking = undefined;
        stopMotionTracking?.();
        stopMotionTracking = undefined;
        visible = false;
        activeRef = null;
        currentSource = undefined;
        bubble.style.opacity = '0';
        bubble.style.transform = `${lastCenter} ${HIDE}`;
    }

    /** Leave/blur a trigger: schedule a hide, ignored if a different trigger took over. */
    function hideTooltip(ref: HTMLElement | null, closeDelay = 100) {
        if (!ref || pendingRef === ref) {
            clearTimeout(openTimer);
            pendingRef = null;
        }
        if (ref && activeRef && ref !== activeRef) {
            return;
        }
        clearTimeout(closeTimer);
        closeTimer = setTimeout(dismiss, closeDelay);
    }

    /**
     * Test-only: tear down the shared bubble and clear its timers/state so browser
     * suites don't leak an open tooltip (or a pending open timer) from one case
     * into the next.
     */
    function resetSharedTooltipForTests() {
        if (typeof document !== 'undefined') {
            document.removeEventListener('keydown', handleEscape);
        }
        pendingRef = null;
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        stopTracking?.();
        stopTracking = undefined;
        stopMotionTracking?.();
        stopMotionTracking = undefined;
        openTimer = undefined;
        closeTimer = undefined;
        visible = false;
        activeRef = null;
        currentText = '';
        currentSource = undefined;
        currentClass = '';
        lastCenter = 'translateX(-50%)';
        bubble?.remove();
        measurer?.remove();
        bubble = null;
        measurer = null;
        label = null;
        roller = null;
    }

    function isActiveTooltip(ref: HTMLElement) {
        return visible && activeRef === ref;
    }

    function updateTooltipContent(ref: HTMLElement, source?: HTMLElement) {
        if (!visible || activeRef !== ref || (!source && !currentSource)) {
            return;
        }
        currentSource = source;
        setLabel(currentText, false);
        applyWidth(currentText);
    }

    return {
        showTooltip,
        hideTooltip,
        flashTooltip,
        updateTooltipText,
        updateTooltipClass,
        updateTooltipContent,
        isActiveTooltip,
        resetSharedTooltipForTests,
        destroy: resetSharedTooltipForTests
    };
}

export type TooltipManager = ReturnType<typeof createTooltipManager>;

export const sharedTooltip = createTooltipManager();

export const {
    showTooltip,
    hideTooltip,
    flashTooltip,
    updateTooltipText,
    updateTooltipClass,
    isActiveTooltip,
    resetSharedTooltipForTests
} = sharedTooltip;
