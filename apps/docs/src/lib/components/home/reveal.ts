import type { Attachment } from 'svelte/attachments';

/**
 * Classes for an element that `reveal` controls. The element is only hidden once the
 * attachment has decided it starts below the fold, so it stays visible without scripting.
 */
export const revealClass =
    'transition-[opacity,translate] duration-700 ease-out [transition-delay:var(--reveal-delay,0ms)] data-[reveal=pending]:translate-y-3.5 data-[reveal=pending]:opacity-0 motion-reduce:transition-none';

/**
 * Reveals an element once, the first time it is genuinely on screen. Elements already
 * in view when the page loads are left alone, and reduced motion skips the effect.
 */
export function reveal(delay = 0): Attachment<HTMLElement> {
    return (node) => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const visible = node.getBoundingClientRect().top < window.innerHeight * 0.9;
        if (reduced || visible || !('IntersectionObserver' in window)) {
            return;
        }
        node.dataset.reveal = 'pending';
        node.style.setProperty('--reveal-delay', `${delay}ms`);
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) {
                    return;
                }
                node.dataset.reveal = 'shown';
                observer.disconnect();
            },
            { rootMargin: '0px 0px -10% 0px' }
        );
        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    };
}
