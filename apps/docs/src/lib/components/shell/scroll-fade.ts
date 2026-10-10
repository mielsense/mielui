type ScrollFadeOptions = {
    axis?: 'x' | 'y';
    /** Largest fade, in pixels. The fade shrinks to nothing as the scroller reaches that end. */
    size?: number;
    start?: boolean;
    end?: boolean;
    /** Element that receives the fade variables. Use the parent when a sibling edge reads them. */
    target?: HTMLElement | 'parent';
};

const variables = ['--fade-start', '--fade-end', '--fade-start-opacity', '--fade-end-opacity'];

/** Mask for a vertical scroller. Pair with `scrollFade`. */
export const fadeY =
    '[mask-image:linear-gradient(to_bottom,transparent,black_var(--fade-start,0px),black_calc(100%-var(--fade-end,0px)),transparent)]';

/** Mask for a vertical scroller that fades only its start. Pair with a filled end edge. */
export const fadeYStart =
    '[mask-image:linear-gradient(to_bottom,transparent,black_var(--fade-start,0px))]';

/** Mask for a vertical scroller that fades only its end. Use when sticky content sits at the start. */
export const fadeYEnd =
    '[mask-image:linear-gradient(to_bottom,black_calc(100%-var(--fade-end,0px)),transparent)]';

/** Mask for a horizontal scroller. Pair with `scrollFade({ axis: 'x' })`. */
export const fadeX =
    '[mask-image:linear-gradient(to_right,transparent,black_var(--fade-start,0px),black_calc(100%-var(--fade-end,0px)),transparent)]';

/**
 * Fades the edges of a scroller while more content lies beyond them. The fade
 * grows with the distance from each end, so content at rest is never dimmed.
 */
export function scrollFade(options: ScrollFadeOptions = {}) {
    const { axis = 'y', size = 40, start = true, end = true, target } = options;

    return (node: HTMLElement) => {
        const host = target === 'parent' ? (node.parentElement ?? node) : (target ?? node);
        let frame = 0;

        function update() {
            const vertical = axis === 'y';
            const extent = vertical
                ? node.scrollHeight - node.clientHeight
                : node.scrollWidth - node.clientWidth;
            const position = Math.abs(vertical ? node.scrollTop : node.scrollLeft);
            const before = start ? Math.min(size, Math.max(0, position)) : 0;
            const after = end ? Math.min(size, Math.max(0, extent - position)) : 0;

            host.style.setProperty('--fade-start', `${before}px`);
            host.style.setProperty('--fade-end', `${after}px`);
            host.style.setProperty('--fade-start-opacity', String(before / size));
            host.style.setProperty('--fade-end-opacity', String(after / size));
        }

        function schedule() {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        }

        const resize = new ResizeObserver(schedule);

        function observe() {
            resize.disconnect();
            resize.observe(node);
            for (const child of node.children) {
                resize.observe(child);
            }
            schedule();
        }

        const mutation = new MutationObserver(observe);
        mutation.observe(node, { childList: true });
        node.addEventListener('scroll', schedule, { passive: true });
        observe();

        return () => {
            cancelAnimationFrame(frame);
            resize.disconnect();
            mutation.disconnect();
            node.removeEventListener('scroll', schedule);
            for (const name of variables) {
                host.style.removeProperty(name);
            }
        };
    };
}
