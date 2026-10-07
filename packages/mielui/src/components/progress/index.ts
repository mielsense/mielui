import type { HTMLAttributes } from 'svelte/elements';
import Progress from './progress.svelte';

export type ProgressProps = {
    /** Completed amount. */
    value?: number;
    /** Amount that counts as complete. */
    max?: number;
    /** Shows activity when the amount is not known. */
    indeterminate?: boolean;
} & Omit<
    HTMLAttributes<HTMLDivElement>,
    'children' | 'role' | 'aria-valuemin' | 'aria-valuemax' | 'aria-valuenow'
>;

export { Progress };
export default Progress;
