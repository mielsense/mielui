import type { HTMLAttributes } from 'svelte/elements';
import Progress from './progress.svelte';

export type ProgressProps = {
    value?: number;
    max?: number;
    indeterminate?: boolean;
} & Omit<
    HTMLAttributes<HTMLDivElement>,
    'children' | 'role' | 'aria-valuemin' | 'aria-valuemax' | 'aria-valuenow'
>;

export { Progress };
export default Progress;
