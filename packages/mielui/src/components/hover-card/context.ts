import { createContext } from '@mielui/svelte/utils';
import type { HoverCardPlacement } from '.';

export type HoverCardContext = {
    readonly id: string;
    readonly placement: HoverCardPlacement;
    open: boolean;
    state: {
        title: boolean;
        description: boolean;
    };
};

const { set: setHoverCardContext, get: getHoverCardContext } =
    createContext<HoverCardContext>('hover-card');

export { getHoverCardContext, setHoverCardContext };
