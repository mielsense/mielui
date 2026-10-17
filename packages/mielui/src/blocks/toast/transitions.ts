import { getCssDuration } from '@mielui/svelte/transition';
import { cubicOut, quartOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

function themedDuration(node: Element, token: string, fallback: number) {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    return reduced ? 0 : getCssDuration(node, token, fallback);
}

/** A toast rises, sharpens, and settles from just below its slot. */
export function toastIn(node: Element): TransitionConfig {
    return {
        duration: themedDuration(node, '--motion-duration-toast-in', 300),
        easing: quartOut,
        css: (t) => {
            return `opacity: ${Math.min(1, t * 2)}; filter: blur(${(1 - t) * 2}px); transform: translateY(${(1 - t) * 16}px) scale(${0.985 + t * 0.015});`;
        }
    };
}

/** A toast leaves faster than it arrived, sinking and blurring out. */
export function toastOut(node: Element): TransitionConfig {
    return {
        duration: themedDuration(node, '--motion-duration-toast-out', 180),
        easing: cubicOut,
        css: (t) => {
            return `filter: blur(${(1 - t) * 2}px); opacity: ${t}; transform: translateY(${(1 - t) * 12}px) scale(${0.985 + t * 0.015});`;
        }
    };
}
