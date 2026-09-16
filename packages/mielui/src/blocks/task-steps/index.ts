import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import TaskSteps from './task-steps.svelte';
import Indicator from './task-steps-indicator.svelte';
import Item from './task-steps-item.svelte';
import Label from './task-steps-label.svelte';
import List from './task-steps-list.svelte';
import Meta from './task-steps-meta.svelte';
import Summary from './task-steps-summary.svelte';

export type TaskStep = {
    id: string;
    label: string;
    meta?: string;
};

export type TaskStepStatus = 'pending' | 'active' | 'done' | 'error';

export type TaskStepsProps = {
    children?: Snippet<[TaskStepsState]>;
    steps: TaskStep[];
    current: number;
    failed?: boolean;
    label?: string;
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type TaskStepsState = {
    rows: (TaskStep & { status: TaskStepStatus })[];
    current: number;
    completed: number;
    total: number;
    failed: boolean;
    complete: boolean;
    sentence: string;
};
export type TaskStepsListProps = HTMLAttributes<HTMLOListElement>;
export type TaskStepsItemProps = HTMLAttributes<HTMLLIElement> & { status?: TaskStepStatus };
export type TaskStepsIndicatorProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    status?: TaskStepStatus;
};
export type TaskStepsLabelProps = HTMLAttributes<HTMLSpanElement>;
export type TaskStepsMetaProps = HTMLAttributes<HTMLSpanElement>;
export type TaskStepsSummaryProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children?: Snippet<[TaskStepsState]>;
};
export { Indicator, Item, Label, List, Meta, Summary, TaskSteps, TaskSteps as Root };
export default TaskSteps;
