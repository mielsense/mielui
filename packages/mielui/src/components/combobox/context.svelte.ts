import { createContext } from '@mielui/svelte/utils';
import type { createComboboxController } from './controller.svelte';

export type ComboboxContext = ReturnType<typeof createComboboxController> & {
    id: string;
};

const { set: setComboboxContext, get: getComboboxContext } =
    createContext<ComboboxContext>('combobox');

export { getComboboxContext, setComboboxContext };
