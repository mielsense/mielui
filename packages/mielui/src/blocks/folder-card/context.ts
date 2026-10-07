import { createContext } from '@mielui/svelte/utils';
import type { FolderCardProps } from '.';

type FolderCardContext = {
    readonly tone: NonNullable<FolderCardProps['tone']>;
    /** Id of the title element, which names the card when it acts as a button. */
    titleId: string;
};

const folderCard = createContext<FolderCardContext>('folder-card');

export const getFolderCard = folderCard.get;
export const setFolderCard = folderCard.set;
