import { createContext } from '@mielui/svelte/utils';

const context = createContext<{ readonly pending: boolean }>('form');
export const getFormContext = context.get;
export const setFormContext = context.set;
