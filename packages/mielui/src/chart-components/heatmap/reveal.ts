import { getCssDuration } from '@mielui/svelte/transition';
import type { Cell } from './calendar';

/** The theme's motion speed and curve, read once per heatmap. */
export type HeatmapMotion = {
    readonly scale: number;
    readonly easing: string;
};

/**
 * Reads the theme's motion once for the whole heatmap and keeps it current with the
 * reduced-motion preference. Calls `onChange` with `undefined` when motion is off.
 */
export function watchHeatmapMotion(node: HTMLElement, onChange: (motion?: HeatmapMotion) => void) {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

    function update() {
        const scale = Math.max(0, getCssDuration(node, '--motion-duration-panel', 180) / 180);
        if (preference.matches || scale === 0) {
            onChange(undefined);
            return;
        }
        const easing = getComputedStyle(node).getPropertyValue('--ease-out').trim() || 'ease-out';
        onChange({ scale, easing });
    }

    update();
    preference.addEventListener('change', update);

    return () => {
        preference.removeEventListener('change', update);
    };
}

/** Delay before a cell appears: rows sweep down the week, columns sweep across it. */
export function revealDelay(day: Cell, order: 'rows' | 'columns', weeks: number) {
    if (order === 'rows') {
        return (day.row - 1) * 50;
    }

    return (day.column - 1) * Math.min(35, 360 / weeks);
}

/** Fades and lifts one cell into place. Returns the cleanup that cancels it. */
export function revealCell(element: Element, motion: HeatmapMotion, delay: number) {
    const animation = element.animate(
        [
            { opacity: 0, transform: 'translateY(5px) scale(0.82)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' }
        ],
        {
            duration: 360 * motion.scale,
            delay: delay * motion.scale,
            easing: motion.easing,
            fill: 'backwards'
        }
    );

    return () => {
        animation.cancel();
    };
}
