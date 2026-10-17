import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';
import type { DataTableLabels, DataTableToolbarProps } from '.';

export type DataTableToolbarSlot = {
    children?: Snippet;
    className?: ClassValue | null;
    rest: Omit<DataTableToolbarProps, 'children' | 'class'>;
};

export type DataTableContext = {
    variant: 'default' | 'inset';
    toolbarSlot: DataTableToolbarSlot | undefined;
};

const { set: setDataTableContext, find: findDataTableContext } =
    createContext<DataTableContext>('data-table');

const { set: setDataTableLabels, find: findDataTableLabels } =
    createContext<() => DataTableLabels | undefined>('data-table-labels');

export { findDataTableContext, findDataTableLabels, setDataTableContext, setDataTableLabels };
