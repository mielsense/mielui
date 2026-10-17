import { createContext } from '@mielui/svelte/utils';
import type { FileUploadEntry, FileUploadLabels, FileUploadSummary } from '.';

export type FileUploadContext = {
    readonly labels: FileUploadLabels | undefined;
    readonly summary: FileUploadSummary;
    readonly disabled: boolean;
    readonly dragging: boolean;
    readonly duration: number;
    open: () => void;
    remove: (id: string) => void;
    retry: (id: string) => void;
};

const { set: setFileUploadContext, get: getFileUploadContext } =
    createContext<FileUploadContext>('file-upload');
const { set: setFileUploadItem, get: getFileUploadItem } =
    createContext<() => FileUploadEntry>('file-upload-item');

export { getFileUploadContext, getFileUploadItem, setFileUploadContext, setFileUploadItem };
