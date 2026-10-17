import { createContext } from '@mielui/svelte/utils';

type FormContext = {
    readonly pending: boolean;
    readonly submissions: number;
};

const {
    set: setFormContext,
    get: getFormContext,
    find: findFormContext
} = createContext<FormContext>('form');

export { findFormContext, getFormContext, setFormContext };
