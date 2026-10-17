import { createContext } from '@mielui/svelte/utils';
import type { AttachmentLabels } from '.';

export type AttachmentContext = {
    readonly files: File[];
    readonly disabled: boolean;
    open: () => void;
    remove: (file: File) => void;
};

const { set: setAttachmentContext, get: getAttachmentContext } =
    createContext<AttachmentContext>('attachment');

const { set: setAttachmentLabels, find: findAttachmentLabels } =
    createContext<() => AttachmentLabels | undefined>('attachment-labels');

export { findAttachmentLabels, getAttachmentContext, setAttachmentContext, setAttachmentLabels };
