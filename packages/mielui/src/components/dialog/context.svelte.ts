import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { DialogFooterProps, DialogLabels, DialogState } from '.';

export type DialogFooterSlot = {
    children?: Snippet;
    className?: string;
    rest: Omit<DialogFooterProps, 'class' | 'children'>;
};

export type DialogContext = {
    id: string;
    readonly labels?: DialogLabels;
    motion?: 'none';
    titleId?: string;
    descriptionId?: string;
    contentId: string;
    returnFocusEl: HTMLElement | undefined;
    state: DialogState;
    footerSlot: DialogFooterSlot | undefined;
    headerSlot: DialogFooterSlot | undefined;
};

const { set: setDialogContext, get: getDialogContext } = createContext<DialogContext>('dialog');

export { getDialogContext, setDialogContext };
