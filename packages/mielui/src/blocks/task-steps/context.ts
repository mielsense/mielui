import { createContext } from '@mielui/svelte/utils';
import type { TaskStepStatus, TaskStepsLabels, TaskStepsState } from '.';

export type TaskStepsContext = {
    readonly state: TaskStepsState;
};

export type TaskStepContext = {
    readonly status: TaskStepStatus;
};

const { set: setTaskStepsContext, get: getTaskStepsContext } =
    createContext<TaskStepsContext>('task-steps');

const { set: setTaskStepContext, get: getTaskStepContext } =
    createContext<TaskStepContext>('task-step');

const { set: setTaskStepsLabels, find: findTaskStepsLabels } =
    createContext<() => TaskStepsLabels | undefined>('task-steps-labels');

export {
    findTaskStepsLabels,
    getTaskStepContext,
    getTaskStepsContext,
    setTaskStepContext,
    setTaskStepsContext,
    setTaskStepsLabels
};
