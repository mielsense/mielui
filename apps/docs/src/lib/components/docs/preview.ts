/** Matches the frame of every live example on a docs page. */
export const PREVIEW_SELECTOR = '[data-component-preview]';

function isNearViewport(node: HTMLElement, scroller: HTMLElement | null) {
    const viewport = scroller?.clientHeight ?? window.innerHeight;
    const scrollTop = scroller?.scrollTop ?? window.scrollY;
    const offsetTop = scroller ? scroller.getBoundingClientRect().top - scrollTop : -scrollTop;
    const offset = node.getBoundingClientRect().top - offsetTop;
    const atPageTop = offset < viewport * 1.5;
    const atCurrentScroll = offset > scrollTop - viewport && offset < scrollTop + viewport * 1.5;

    return atPageTop || atCurrentScroll;
}

/**
 * Reveals near the viewport before the first paint, and otherwise once the node scrolls
 * within a screen of it. For content that keeps its size while hidden.
 */
export function revealOnApproach(reveal: () => void) {
    return (node: HTMLElement) => {
        const scroller = node.closest<HTMLElement>('[data-docs-scroll]');
        if (isNearViewport(node, scroller)) {
            reveal();
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    observer.disconnect();
                    reveal();
                }
            },
            { root: scroller, rootMargin: '100% 0px' }
        );
        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    };
}
