import { createContext } from '@mielui/svelte/utils';
import type { ComboboxLabels } from '.';
import type { createComboboxController } from './controller.svelte';

export type ComboboxContext = ReturnType<typeof createComboboxController> & {
    id: string;
};

const { set: setComboboxContext, get: getComboboxContext } =
    createContext<ComboboxContext>('combobox');

const { set: setComboboxLabels, find: findComboboxLabels } =
    createContext<() => ComboboxLabels | undefined>('combobox-labels');

export { findComboboxLabels, getComboboxContext, setComboboxContext, setComboboxLabels };
