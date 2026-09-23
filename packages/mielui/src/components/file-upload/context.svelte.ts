import { getContext, setContext } from 'svelte';
import type { FileUploadEntry, FileUploadSummary } from '.';

const rootKey = Symbol('file-upload');
const itemKey = Symbol('file-upload-item');
type RootContext = {
    readonly summary: FileUploadSummary;
    readonly disabled: boolean;
    readonly dragging: boolean;
    readonly duration: number;
    open: () => void;
    remove: (id: string) => void;
    retry: (id: string) => void;
};
export function setRoot(context: RootContext) {
    setContext(rootKey, context);
}
export function getRoot(): RootContext {
    const context = getContext<RootContext>(rootKey);
    if (!context) {
        throw new Error('FileUpload parts must be inside FileUpload.Root.');
    }
    return context;
}
export function setItem(item: () => FileUploadEntry) {
    setContext(itemKey, item);
}
export function getItem(): () => FileUploadEntry {
    const item = getContext<() => FileUploadEntry>(itemKey);
    if (!item) {
        throw new Error('This part must be inside FileUpload.Item.');
    }
    return item;
}
