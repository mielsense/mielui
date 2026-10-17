import { createContext } from '@mielui/svelte/utils';
import type { ContextMenuState } from '.';

export type ContextMenuContext = {
    state: ContextMenuState;
};

const { set: setContextMenuContext, get: getContextMenuContext } =
    createContext<ContextMenuContext>('context-menu');

export { getContextMenuContext, setContextMenuContext };
