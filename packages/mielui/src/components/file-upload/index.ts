import type { ButtonProps } from '@mielui/svelte/components/button';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Root from './file-upload.svelte';
import Details from './file-upload-details.svelte';
import Dropzone from './file-upload-dropzone.svelte';
import Item from './file-upload-item.svelte';
import List from './file-upload-list.svelte';
import Preview from './file-upload-preview.svelte';
import Progress from './file-upload-progress.svelte';
import Remove from './file-upload-remove.svelte';
import Retry from './file-upload-retry.svelte';
import Status from './file-upload-status.svelte';
import Trigger from './file-upload-trigger.svelte';

export type FileUploadEntry = {
    readonly id: string;
    readonly file: File;
    readonly status: 'uploading' | 'complete' | 'error';
    readonly progress?: number;
    readonly error?: string;
    readonly retryable: boolean;
};
export type FileUploadSummary = {
    items: readonly FileUploadEntry[];
    total: number;
    uploading: number;
    complete: number;
};
export type FileUploadProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    onUpload: (
        file: File,
        options: {
            signal: AbortSignal;
            onProgress: (percent: number) => void;
        }
    ) => Promise<void>;
    children?: Snippet<[FileUploadSummary]>;
};
export type FileUploadPartProps = HTMLAttributes<HTMLDivElement>;
export type FileUploadItemProps = FileUploadPartProps & { item: FileUploadEntry };
export type FileUploadListProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
    children?: Snippet<[FileUploadEntry]>;
};
export type FileUploadButtonProps = Omit<
    Extract<ButtonProps, { href?: undefined }>,
    'href' | 'type'
>;
export { Details, Dropzone, Item, List, Preview, Progress, Remove, Retry, Root, Status, Trigger };
