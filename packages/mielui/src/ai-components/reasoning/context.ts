import { createContext } from '@mielui/svelte/utils';
import type { ReasoningLabels } from '.';

export type ReasoningContext = {
    id: string;
    get open(): boolean;
    set open(value: boolean);
    get streaming(): boolean;
    registerContent: () => () => void;
    transitionStart: (open: boolean) => number;
    transitionComplete: (open: boolean, revision: number) => void;
};

const { set: setReasoningContext, get: getReasoningContext } =
    createContext<ReasoningContext>('reasoning');

const { set: setReasoningLabels, find: findReasoningLabels } =
    createContext<() => ReasoningLabels | undefined>('reasoning-labels');

export { findReasoningLabels, getReasoningContext, setReasoningContext, setReasoningLabels };
