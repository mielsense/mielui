import { flushSync } from 'svelte';

/** Matches the frame of every live example on a docs page. */
export const PREVIEW_SELECTOR = '[data-component-preview]';

const IDLE_BUDGET = 6;

let hydrated = false;
const idleQueue: Array<() => void> = [];
let draining = false;

/** Marks the app as hydrated. Every page rendered after this comes from client navigation. */
export function markHydrated() {
    hydrated = true;
}

/**
 * Whether this render comes from client navigation. Server-rendered pages must hydrate
 * everything they sent, so only client renders may hold offscreen work back.
 */
export function rendersOnClient() {
    return hydrated;
}

function scheduleIdle(callback: (deadline: { timeRemaining: () => number }) => void) {
    if (window.requestIdleCallback) {
        window.requestIdleCallback(callback);
        return;
    }
    setTimeout(() => {
        const start = performance.now();
        callback({
            timeRemaining: () => {
                return Math.max(0, IDLE_BUDGET - (performance.now() - start));
            }
        });
    }, 1);
}

function drainIdleQueue(deadline: { timeRemaining: () => number }) {
    do {
        idleQueue.shift()?.();
        flushSync();
    } while (idleQueue.length && deadline.timeRemaining() > 0);

    if (idleQueue.length) {
        scheduleIdle(drainIdleQueue);
    } else {
        draining = false;
    }
}

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

/**
 * Reveals near the viewport before the first paint, and everything else in small batches
 * while the browser is idle, in page order. The page settles to its full layout right
 * after it appears instead of growing while the reader scrolls.
 */
export function revealAfterPaint(reveal: () => void) {
    return (node: HTMLElement) => {
        if (isNearViewport(node, node.closest<HTMLElement>('[data-docs-scroll]'))) {
            reveal();
            return;
        }
        let pending = true;
        idleQueue.push(() => {
            if (pending) {
                reveal();
            }
        });
        if (!draining) {
            draining = true;
            scheduleIdle(drainIdleQueue);
        }

        return () => {
            pending = false;
        };
    };
}
