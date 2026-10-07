import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export type DataTableToolbarSlot = {
    children?: Snippet;
    className?: ClassValue | null;
    rest: Record<string, unknown>;
};

export type DataTableContext = {
    variant: 'default' | 'inset';
    toolbarSlot: DataTableToolbarSlot | undefined;
};

const { set: setDataTableContext, get: getDataTableContext } =
    createContext<DataTableContext>('data-table');

export { getDataTableContext, setDataTableContext };
