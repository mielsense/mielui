import { untrack } from 'svelte';
import type { Toast } from './lib.svelte';

const COLLAPSED_OFFSET = 14;
const COLLAPSED_SCALE_STEP = 0.05;
const COLLAPSED_OPACITY_STEP = 0.16;
const EXPANDED_GAP = 10;
const FALLBACK_HEIGHT = 72;

/** Toasts beyond this many hide behind the stack until it expands. */
export const MAX_VISIBLE = 3;

/**
 * Layout for the toast stack: newest first, fanned behind each other at rest and
 * spread out by measured height while the pointer or focus is inside.
 */
type StackOptions = {
    readonly toasts: readonly Toast[];
};

export function createToastStack(options: StackOptions) {
    let hovered = $state(false);
    let focused = $state(false);
    const heights = $state<Record<number, number>>({});

    const toasts = $derived([...options.toasts].reverse());
    const expanded = $derived(hovered || focused);
    const measured = $derived(
        toasts.map((toast) => {
            return toast.id === undefined
                ? FALLBACK_HEIGHT
                : (heights[toast.id] ?? FALLBACK_HEIGHT);
        })
    );
    const offsets = $derived.by(() => {
        let y = 0;

        return measured.map((height) => {
            const offset = y;
            y += height + EXPANDED_GAP;

            return offset;
        });
    });
    const height = $derived.by(() => {
        const count = toasts.length;
        if (count === 0) {
            return 0;
        }
        if (expanded) {
            const total = measured.reduce((sum, value) => sum + value, 0);

            return total + (count - 1) * EXPANDED_GAP;
        }

        return measured[0] + (Math.min(count, MAX_VISIBLE) - 1) * COLLAPSED_OFFSET;
    });

    $effect(() => {
        const live = new Set(toasts.map((toast) => String(toast.id)));
        untrack(() => {
            for (const id of Object.keys(heights)) {
                if (!live.has(id)) {
                    delete heights[Number(id)];
                }
            }
        });
    });

    return {
        get toasts() {
            return toasts;
        },
        get expanded() {
            return expanded;
        },
        get height() {
            return height;
        },
        /** Measured heights by toast id, for `bind:clientHeight`. */
        heights,
        set hovered(value: boolean) {
            hovered = value;
        },
        set focused(value: boolean) {
            focused = value;
        },
        transform(index: number) {
            const y = expanded ? (offsets[index] ?? 0) : index * COLLAPSED_OFFSET;
            const scale = expanded ? 1 : Math.max(1 - index * COLLAPSED_SCALE_STEP, 0.8);

            return `translateY(-${y}px) scale(${scale})`;
        },
        opacity(index: number) {
            if (expanded) {
                return 1;
            }
            if (index >= MAX_VISIBLE) {
                return 0;
            }

            return Math.max(1 - index * COLLAPSED_OPACITY_STEP, 0);
        },
        /** Whether the toast at `index` is tucked out of reach behind the stack. */
        hidden(index: number) {
            return !expanded && index >= MAX_VISIBLE;
        }
    };
}
