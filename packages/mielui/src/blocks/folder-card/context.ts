import { createContext } from '@mielui/svelte/utils';
import type { FolderCardLabels, FolderCardProps } from '.';

type FolderCardContext = {
    readonly tone: NonNullable<FolderCardProps['tone']>;
    /** Id of the title element, which names the card when it acts as a button. */
    titleId: string;
};

const folderCard = createContext<FolderCardContext>('folder-card');
const folderCardLabels = createContext<() => FolderCardLabels | undefined>('folder-card-labels');

export const getFolderCard = folderCard.get;
export const setFolderCard = folderCard.set;
export const findFolderCardLabels = folderCardLabels.find;
export const setFolderCardLabels = folderCardLabels.set;
