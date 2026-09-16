import { createContext } from '@mielui/svelte/utils';
import type { SheetState } from '.';

export type SheetContext = {
    id: string;
    titleId?: string;
    descriptionId?: string;
    state: SheetState;
};

const { set: setSheetContext, get: getSheetContext } = createContext<SheetContext>('sheet');

export { getSheetContext, setSheetContext };
