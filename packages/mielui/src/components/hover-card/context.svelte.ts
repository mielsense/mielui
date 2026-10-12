import { createContext } from '@mielui/svelte/utils';

export type HoverCardContext = {
    readonly id: string;
    open: boolean;
    state: {
        title: boolean;
        description: boolean;
    };
};

const { set: setHoverCardContext, get: getHoverCardContext } =
    createContext<HoverCardContext>('hover-card');

export { getHoverCardContext, setHoverCardContext };
