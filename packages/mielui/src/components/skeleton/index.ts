import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Skeleton from './skeleton.svelte';
import SkeletonSwap from './skeleton-swap.svelte';

export type SkeletonProps = {
    /** `shimmer` sweeps a highlight across the placeholder. */
    variant?: 'default' | 'shimmer';
    /** Content rendered inside. */
    children?: Snippet;
    /** Classes added to the element. */
    class?: string;
    /** Width, in `unit`. */
    w?: number;
    /** Height, in `unit`. */
    h?: number;
    /** CSS unit for `w` and `h`. */
    unit?:
        | 'px'
        | 'rem'
        | 'em'
        | '%'
        | 'vh'
        | 'vw'
        | 'vmin'
        | 'vmax'
        | 'ch'
        | 'ex'
        | 'cm'
        | 'mm'
        | 'in'
        | 'pt'
        | 'pc';
};

export type SkeletonSwapProps = {
    /** Shows the content when true and the skeleton when false. */
    ready: boolean;
    /** Content rendered inside. */
    children?: Snippet;
    /** Custom placeholder. Defaults to text lines. */
    skeleton?: Snippet;
    /** Number of placeholder lines. */
    lines?: number;
    /** Height of a text line in pixels. */
    lineHeight?: number;
    /** Height of each placeholder bar in pixels. */
    barHeight?: number;
    /** Height to hold in pixels so the swap does not shift the layout. */
    reserve?: number;
    /** Milliseconds to wait before showing the skeleton, so fast loads skip it. */
    delay?: number;
    /** Shortest time in milliseconds the skeleton stays once shown. */
    minVisible?: number;
    /** Accessible name while loading. */
    label?: string;
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export { Skeleton, SkeletonSwap };
