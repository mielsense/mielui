import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { SheetLabels, SheetState } from '.';

export type SheetContext = {
    id: string;
    readonly labels?: SheetLabels;
    titleId?: string;
    descriptionId?: string;
    footer?: Snippet;
    state: SheetState;
};

const { set: setSheetContext, get: getSheetContext } = createContext<SheetContext>('sheet');

export { getSheetContext, setSheetContext };
