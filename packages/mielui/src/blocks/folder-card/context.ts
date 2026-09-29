import { createContext } from '@mielui/svelte/utils';
import type { FolderCardProps } from '.';

type FolderCardContext = {
    readonly tone: NonNullable<FolderCardProps['tone']>;
};

const folderCard = createContext<FolderCardContext>('folder-card');

export const getFolderCard = folderCard.get;
export const setFolderCard = folderCard.set;
