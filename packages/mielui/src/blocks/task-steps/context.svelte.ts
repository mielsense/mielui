import { createContext } from '@mielui/svelte/utils';
import type { TaskStepStatus, TaskStepsState } from '.';

const root = createContext<{ readonly state: TaskStepsState; readonly label: string }>(
    'task-steps'
);
const item = createContext<{ readonly status: TaskStepStatus }>('task-step');
export const getTaskSteps = root.get;
export const setTaskSteps = root.set;
export const getTaskStep = item.get;
export const setTaskStep = item.set;
