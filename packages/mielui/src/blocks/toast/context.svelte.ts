import { getContext, setContext } from 'svelte';
import type { Toast } from './lib.svelte';

const key = Symbol('toast-item');

type ToastContext = {
    readonly toast: Toast;
};

export function setToastContext(context: ToastContext) {
    setContext(key, context);
}

export function getToastContext(): ToastContext {
    const context = getContext<ToastContext | undefined>(key);
    if (!context) {
        throw new Error('Toast parts must be rendered inside Toast.Root.');
    }
    return context;
}
