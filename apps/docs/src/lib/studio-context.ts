import { createContext } from 'svelte';

type StudioState = {
    mode: string;
    width: string;
    glassBackdrop: boolean;
};

export const [getStudioContext, setStudioContext] = createContext<StudioState>();
