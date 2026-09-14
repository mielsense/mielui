import { createContext } from '@mielui/svelte/utils';
import type { FullscreenNavState } from '.';

export type FullscreenNavContext = {
    id: string;
    state: FullscreenNavState;
};

const { set: setFullscreenNavContext, get: getFullscreenNavContext } =
    createContext<FullscreenNavContext>('fullscreen-nav');

export { getFullscreenNavContext, setFullscreenNavContext };
