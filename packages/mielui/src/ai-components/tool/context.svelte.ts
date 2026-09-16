import { createContext } from '@mielui/svelte/utils';
import type { ToolState, ToolVariant } from '.';

type ToolContext = {
    readonly id: string;
    get open(): boolean;
    set open(value: boolean);
    readonly name: string;
    readonly duration: string | undefined;
    readonly state: ToolState;
    readonly variant: ToolVariant;
    registerContent: () => () => void;
    transitionStart: (open: boolean) => number;
    transitionComplete: (open: boolean, revision: number) => void;
};

const { set: setToolContext, get: getToolContext } = createContext<ToolContext>('tool');

export { getToolContext, setToolContext };
