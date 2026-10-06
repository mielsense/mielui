import type { ButtonProps } from '@mielui/svelte/components/button';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import Root from './attachment.svelte';
import Item from './attachment-item.svelte';
import List from './attachment-list.svelte';
import Trigger from './attachment-trigger.svelte';

export type AttachmentRejectionCode =
    | 'duplicate-file'
    | 'file-invalid-type'
    | 'file-too-large'
    | 'too-many-files';

export type AttachmentRejection = {
    file: File;
    code: AttachmentRejectionCode;
    reason: string;
};

export type AttachmentStatus = 'ready' | 'uploading' | 'complete' | 'error';

export type AttachmentLabels = {
    dropzone?: string;
    add?: string;
    list?: string;
    ready?: string;
    complete?: string;
    failed?: string;
    uploadProgress?: (name: string) => string;
    remove?: (name: string) => string;
};

export type AttachmentProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: AttachmentLabels;
    /** Attached files. Bindable. */
    files?: File[];
    /** Accepted file types, written as for a file input. */
    accept?: string;
    /** Allows choosing more than one file. */
    multiple?: boolean;
    /** Largest number of files. */
    maxFiles?: number;
    /** Largest file size in bytes. */
    maxSize?: number;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Called with the files that were refused and the reason for each. */
    onReject?: (rejections: AttachmentRejection[]) => void;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type AttachmentTriggerProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | HTMLAnchorElement;
    /** Called when it is clicked or activated. */
    onclick?: (event: MouseEvent) => void;
    /** Button style of the attach button. */
    variant?: ButtonProps['variant'];
    /**
     * Control height of the attach button. It defaults to an icon button when there is no label.
     */
    size?: ButtonProps['size'];
} & Omit<HTMLButtonAttributes, 'children' | 'class' | 'type' | 'onclick'>;

export type AttachmentListProps = {
    /** Accessible name of the list. */
    label?: string;
    /** `card` shows a thumbnail and details. `chip` is a compact pill. */
    variant?: 'card' | 'chip';
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'class'>;

export type AttachmentItemProps = {
    /** The file this item shows. */
    file: File;
    /** `card` shows a thumbnail and details. `chip` is a compact pill. */
    variant?: 'card' | 'chip';
    /** Upload state shown on the item. */
    status?: AttachmentStatus;
    /** Upload progress from 0 to 100. */
    progress?: number;
    /** Message shown when the upload failed. */
    error?: string;
    /** Called when the remove button is pressed. */
    onRemove?: (file: File) => void;
    /** Shows the remove button. */
    removable?: boolean;
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export { Item, List, Root, Trigger };
