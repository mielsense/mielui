import { createContext } from '@mielui/svelte/utils';
import type { TaskStepStatus, TaskStepsLabels, TaskStepsState } from '.';

const root = createContext<{ readonly state: TaskStepsState }>('task-steps');
const item = createContext<{ readonly status: TaskStepStatus }>('task-step');
const labels = createContext<() => TaskStepsLabels | undefined>('task-steps-labels');
export const getTaskSteps = root.get;
export const setTaskSteps = root.set;
export const getTaskStep = item.get;
export const setTaskStep = item.set;
export const findTaskStepsLabels = labels.find;
export const setTaskStepsLabels = labels.set;
