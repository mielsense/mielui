import { createContext } from '@mielui/svelte/utils';

export type AvatarContext = {
    loadedImages: Record<string, boolean>;
};

const { get: getAvatarContext, set: setAvatarContext } = createContext<AvatarContext>('avatar');

export { getAvatarContext, setAvatarContext };
