import { createContext } from '@mielui/svelte/utils';

export type AttachmentContext = {
    files: File[];
    readonly disabled: boolean;
    open: () => void;
    remove: (file: File) => void;
};

const { set: setAttachmentContext, get: getAttachmentContext } =
    createContext<AttachmentContext>('attachment');

export { getAttachmentContext, setAttachmentContext };
