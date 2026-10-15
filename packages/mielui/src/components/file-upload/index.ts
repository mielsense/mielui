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
export type FileUploadLabels = {
    /** Heading in the empty dropzone. */
    dropzoneTitle?: string;
    /** Supporting line in the empty dropzone. */
    dropzoneDescription?: string;
    /** Trigger text while no file is selected. */
    choose?: string;
    /** Trigger text once files are selected. */
    addMore?: string;
    /** Accessible name of the file list. */
    list?: string;
    /** Status while a file uploads. */
    uploading?: string;
    /** Status once a file has uploaded. */
    uploaded?: string;
    /** Accessible name of a file's progress bar. */
    uploadingFile?: (name: string) => string;
    /** Name of the button that removes a file. */
    remove?: string;
    /** Name of the button that cancels an upload in progress. */
    cancel?: string;
    /** Name of the button that retries a failed upload. */
    retry?: string;
    /** Error for a file whose type `accept` rejects. */
    typeRejected?: string;
    /** Error for a file larger than `maxSize`. */
    tooLarge?: (megabytes: number) => string;
    /** Error for a file that is already selected. */
    duplicate?: string;
    /** Error for a file beyond `maxFiles`. */
    tooMany?: (maxFiles: number) => string;
    /** Shown on a file whose upload failed without an error message. */
    uploadFailed?: string;
};

export type FileUploadProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: FileUploadLabels;
    /** Accepted file types, written as for a file input. */
    accept?: string;
    /** Largest file size in bytes. */
    maxSize?: number;
    /** Largest number of files. */
    maxFiles?: number;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Uploads one file. Report progress with `onProgress` and stop when `signal` aborts. */
    onUpload: (
        file: File,
        options: {
            signal: AbortSignal;
            onProgress: (percent: number) => void;
        }
    ) => Promise<void>;
    /** Content rendered inside. */
    children?: Snippet<[FileUploadSummary]>;
};
export type FileUploadPartProps = HTMLAttributes<HTMLDivElement>;
export type FileUploadItemProps = FileUploadPartProps & { item: FileUploadEntry };
export type FileUploadListProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
    /** Content rendered inside. */
    children?: Snippet<[FileUploadEntry]>;
};
export type FileUploadButtonProps = Omit<
    Extract<ButtonProps, { href?: undefined }>,
    'href' | 'type'
>;
export { Details, Dropzone, Item, List, Preview, Progress, Remove, Retry, Root, Status, Trigger };
