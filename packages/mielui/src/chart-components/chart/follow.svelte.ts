import { untrack } from 'svelte';
import { Tween } from 'svelte/motion';
import type { ChartContext } from './context.svelte';
import { followSpring } from './motion';

type FollowOptions = {
    duration?: number;
    easing?: (progress: number) => number;
};

/**
 * Tweens toward `target` while the pointer moves between categories. It snaps when the target
 * first appears and whenever the keyboard drives the change. A `null` target means hidden.
 */
export function createChartFollow<T>(
    chart: ChartContext,
    target: () => T | null,
    initial: T,
    { duration = 320, easing = followSpring }: FollowOptions = {}
) {
    const tween = new Tween(initial, {
        easing
    });
    let shown = false;

    $effect.pre(() => {
        const next = target();

        if (next === null) {
            shown = false;
            return;
        }

        untrack(() => {
            const glide =
                shown && chart.pointer !== null && chart.motion && chart.animation !== 'none';

            void tween.set(next, {
                duration: glide ? duration * chart.motionScale : 0
            });
        });
        shown = true;
    });

    return tween;
}
