import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { DialogState } from '.';

export type DialogFooterSlot = {
    children?: Snippet;
    className?: string;
    rest: Record<string, unknown>;
};

export type DialogContext = {
    id: string;
    contentId: string;
    returnFocusEl: HTMLElement | undefined;
    state: DialogState;
    footerSlot: DialogFooterSlot | undefined;
    headerSlot: DialogFooterSlot | undefined;
};

const { set: setDialogContext, get: getDialogContext } = createContext<DialogContext>('dialog');

export { getDialogContext, setDialogContext };
