import { createContext } from '@mielui/svelte/utils';

const root = createContext<{
    readonly disabled: boolean;
    readonly hintId: string;
    lifted: (id: string) => boolean;
    held: (id: string) => boolean;
    keydown: (event: KeyboardEvent, id: string) => void;
    pointerdown: (event: PointerEvent, id: string) => void;
    cancel: () => void;
}>('reorder-list');
const item = createContext<{ readonly id: string; readonly label: string }>('reorder-list-item');
export const setReorderList = root.set;
export const getReorderList = root.get;
export const setReorderItem = item.set;
export const getReorderItem = item.get;
