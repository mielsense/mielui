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
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Sets supported browser chrome to red while the alert dialog is open. */
    error?: boolean;
    /** Controls the default width and action layout. Defaults to `vertical`. */
    orientation?: DialogOrientation;
    /** Content rendered inside. */
    children?: Snippet;
};

export type AlertDialogContentProps = {
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /** Marks the dialog busy for assistive technology while an action runs. */
    ariaBusy?: boolean;
    /** Lets Escape dismiss the dialog. */
    allowEscape?: boolean;
    /** Width preset. Vertical layouts remain compact; horizontal layouts are one step wider. */
    size?: DialogSize;
} & DefaultProps;

export type AlertDialogActionProps = {
    /**
     * Closes the dialog after the button is clicked. Set false to keep it open while work finishes.
     */
    closeOnClick?: boolean;
} & ButtonProps;

export { Confirm, Content, Description, Exit, Footer, Header, Root, Title, Trigger };
