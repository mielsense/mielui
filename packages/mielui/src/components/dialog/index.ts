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
    surface?: 'solid' | 'glass';
    allowClickOutside?: boolean;
    allowEscape?: boolean;
    role?: 'dialog' | 'alertdialog';
    contentClass?: string;
    overlayClass?: string;
    surfaceClass?: string;
    panelIdPrefix?: string;
    showClose?: boolean;
    /** Width preset. Vertical layouts remain compact; horizontal layouts are one step wider. */
    size?: DialogSize;
} & DefaultProps &
    Partial<Record<`aria-${string}`, string | boolean | null | undefined>>;

export type DialogProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Sets supported browser chrome to red while the dialog is open. */
    error?: boolean;
    /** Controls the default width and action layout. Defaults to `horizontal`. */
    orientation?: DialogOrientation;
    children?: Snippet;
};

export { Body, Close, Confirm, Content, Description, Footer, Header, Root, Title, Trigger };
