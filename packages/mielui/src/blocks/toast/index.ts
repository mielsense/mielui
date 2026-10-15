import { getToastUIState, toast } from './lib.svelte';
import * as Toast from './parts';
import Toaster from './toaster.svelte';

export type {
    Toast as ToastType,
    ToastAction,
    ToastFn,
    ToastState,
    ToastUIState
} from './lib.svelte';
export { Action, Actions, Close, Content, Footer, Icon, Root, Title } from './parts';
export type ToastLabels = {
    /** Accessible name of the notifications region. */
    region?: string;
    /** Accessible name of a toast's dismiss button. */
    dismiss?: string;
    /** Accessible name of the notch button that shows the previous notification. */
    previous?: string;
    /** Accessible name of the notch button that shows the next notification. */
    next?: string;
    /** Accessible name of the notch position counter. `position` starts at 1. */
    position?: (position: number, total: number) => string;
    /** Visible notch position counter, such as 2 of 5. `index` starts at 1. */
    count?: (index: number, total: number) => string;
};

export { getToastUIState, Toast, Toaster, toast };
