import { createContext } from '@mielui/svelte/utils';
import type { CollapsibleState } from '.';

export type CollapsibleContext = {
    id: string;
    state: CollapsibleState;
};

const { set: setCollapsibleContext, get: getCollapsibleContext } =
    createContext<CollapsibleContext>('collapsible');

export { getCollapsibleContext, setCollapsibleContext };
