import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { SheetState } from '.';

export type SheetContext = {
    id: string;
    titleId?: string;
    descriptionId?: string;
    footer?: Snippet;
    state: SheetState;
};

const { set: setSheetContext, get: getSheetContext } = createContext<SheetContext>('sheet');

export { getSheetContext, setSheetContext };
