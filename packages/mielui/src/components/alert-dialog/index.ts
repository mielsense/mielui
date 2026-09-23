import type { ButtonProps } from '@mielui/svelte/components/button';
import type { DialogOrientation, DialogSize } from '@mielui/svelte/components/dialog';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import Root from './alert-dialog.svelte';
import Confirm from './alert-dialog-confirm.svelte';
import Content from './alert-dialog-content.svelte';
import Description from './alert-dialog-description.svelte';
import Exit from './alert-dialog-exit.svelte';
import Footer from './alert-dialog-footer.svelte';
import Header from './alert-dialog-header.svelte';
import Title from './alert-dialog-title.svelte';
import Trigger from './alert-dialog-trigger.svelte';

export type AlertDialogState = {
    open: boolean;
    triggerRef?: HTMLElement | null;
};

export type AlertDialogProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Sets supported browser chrome to red while the alert dialog is open. */
    error?: boolean;
    /** Controls the default width and action layout. Defaults to `vertical`. */
    orientation?: DialogOrientation;
    children?: Snippet;
};

export type AlertDialogContentProps = {
    surface?: 'solid' | 'glass';
    ariaBusy?: boolean;
    allowEscape?: boolean;
    /** Width preset. Vertical layouts remain compact; horizontal layouts are one step wider. */
    size?: DialogSize;
} & DefaultProps;

export type AlertDialogActionProps = {
    closeOnClick?: boolean;
} & ButtonProps;

export { Confirm, Content, Description, Exit, Footer, Header, Root, Title, Trigger };
