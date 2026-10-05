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
    labels?: AttachmentLabels;
    files?: File[];
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number;
    disabled?: boolean;
    onReject?: (rejections: AttachmentRejection[]) => void;
    class?: string;
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type AttachmentTriggerProps = {
    class?: string;
    children?: Snippet;
    element?: HTMLButtonElement | HTMLAnchorElement;
    onclick?: (event: MouseEvent) => void;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
} & Omit<HTMLButtonAttributes, 'children' | 'class' | 'type' | 'onclick'>;

export type AttachmentListProps = {
    label?: string;
    variant?: 'card' | 'chip';
    class?: string;
} & Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'class'>;

export type AttachmentItemProps = {
    file: File;
    variant?: 'card' | 'chip';
    status?: AttachmentStatus;
    progress?: number;
    error?: string;
    onRemove?: (file: File) => void;
    removable?: boolean;
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export { Item, List, Root, Trigger };
