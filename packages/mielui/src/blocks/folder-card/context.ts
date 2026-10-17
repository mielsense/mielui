import { createContext } from '@mielui/svelte/utils';
import type { FolderCardLabels, FolderCardProps } from '.';

export type FolderCardContext = {
    readonly tone: NonNullable<FolderCardProps['tone']>;
    /** Id of the title element, which names the card when it acts as a button. */
    titleId: string;
};

const { set: setFolderCardContext, get: getFolderCardContext } =
    createContext<FolderCardContext>('folder-card');

const { set: setFolderCardLabels, find: findFolderCardLabels } =
    createContext<() => FolderCardLabels | undefined>('folder-card-labels');

export { findFolderCardLabels, getFolderCardContext, setFolderCardContext, setFolderCardLabels };
