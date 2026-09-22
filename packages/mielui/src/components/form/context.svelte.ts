import { getContext, setContext } from 'svelte';

type FormContext = {
    readonly pending: boolean;
    readonly submissions: number;
};

const key = Symbol('mielui.form');

export function setFormContext(value: FormContext) {
    setContext(key, value);
}

export function getOptionalFormContext() {
    return getContext<FormContext | undefined>(key);
}

export function getFormContext() {
    const context = getOptionalFormContext();
    if (!context) {
        throw new Error('Form components must be used within <Form.Root>.');
    }
    return context;
}
