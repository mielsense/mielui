import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { ButtonProps } from '../button';
import Root from './dialog.svelte';
import Body from './dialog-body.svelte';
import Close from './dialog-close.svelte';
import Confirm from './dialog-confirm.svelte';
import Content from './dialog-content.svelte';
import Description from './dialog-description.svelte';
import Footer from './dialog-footer.svelte';
import Header from './dialog-header.svelte';
import Title from './dialog-title.svelte';
import Trigger from './dialog-trigger.svelte';

export type DialogState = {
    open: boolean;
    error: boolean;
    orientation: DialogOrientation;
};

export type DialogOrientation = 'horizontal' | 'vertical';
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

export type DialogTriggerProps = ButtonProps;
export type DialogTitleProps = DefaultProps;
export type DialogHeaderProps = DefaultProps;
export type DialogFooterProps = DefaultProps;
export type DialogBodyProps = DefaultProps;
export type DialogConfirmProps = ButtonProps;
export type DialogCloseProps = ButtonProps;
export type DialogDescriptionProps = DefaultProps;

export type DialogContentProps = {
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /**
     * Closes when the pointer is pressed outside it. Set false to keep it open until it is
     * dismissed another way.
     */
    allowClickOutside?: boolean;
    /** Lets Escape dismiss the dialog. */
    allowEscape?: boolean;
    /** ARIA role of the panel. */
    role?: 'dialog' | 'alertdialog';
    /** Classes for the positioned dialog element. */
    contentClass?: string;
    /** Classes for the backdrop. */
    overlayClass?: string;
    /** Classes for the inner surface. */
    surfaceClass?: string;
    /** Prefix of the generated panel id. */
    panelIdPrefix?: string;
    /** Shows the close button in the corner. */
    showClose?: boolean;
    /** Width preset. Vertical layouts remain compact; horizontal layouts are one step wider. */
    size?: DialogSize;
} & DefaultProps &
    Partial<Record<`aria-${string}`, string | boolean | null | undefined>>;

export type DialogProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Sets supported browser chrome to red while the dialog is open. */
    error?: boolean;
    /** Controls the default width and action layout. Defaults to `horizontal`. */
    orientation?: DialogOrientation;
    /** Content rendered inside. */
    children?: Snippet;
};

export { Body, Close, Confirm, Content, Description, Footer, Header, Root, Title, Trigger };
