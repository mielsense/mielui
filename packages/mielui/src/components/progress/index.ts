import type { DefaultProps } from '@mielui/svelte/utils';
import Progress from './progress.svelte';

export type ProgressProps = {
    value?: number;
    max?: number;
    indeterminate?: boolean;
} & DefaultProps;

export { Progress };
export default Progress;
