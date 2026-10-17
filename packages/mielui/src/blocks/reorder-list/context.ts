import { createContext } from '@mielui/svelte/utils';

export type ReorderListContext = {
    readonly disabled: boolean;
    readonly hintId: string;
    lifted: (id: string) => boolean;
    held: (id: string) => boolean;
    keydown: (event: KeyboardEvent, id: string) => void;
    pointerdown: (event: PointerEvent, id: string) => void;
    cancel: () => void;
};

export type ReorderListItemContext = {
    readonly id: string;
    readonly label: string;
};

const { set: setReorderListContext, get: getReorderListContext } =
    createContext<ReorderListContext>('reorder-list');

const { set: setReorderListItemContext, get: getReorderListItemContext } =
    createContext<ReorderListItemContext>('reorder-list-item');

export {
    getReorderListContext,
    getReorderListItemContext,
    setReorderListContext,
    setReorderListItemContext
};
