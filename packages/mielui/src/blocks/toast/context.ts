import { createContext } from '@mielui/svelte/utils';
import type { ToastLabels } from '.';
import type { Toast } from './lib.svelte';

type ToastContext = {
    readonly toast: Toast;
};

const { set: setToastContext, get: getToastContext } = createContext<ToastContext>('toast');
const { set: setToastLabels, find: findToastLabels } =
    createContext<() => ToastLabels | undefined>('toast-labels');

export { findToastLabels, getToastContext, setToastContext, setToastLabels };
