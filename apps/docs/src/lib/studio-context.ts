import { getContext, setContext } from 'svelte';

type StudioState = {
    mode: string;
    width: string;
    glassBackdrop: boolean;
};

const studioKey = Symbol('studio');

export function setStudioContext(state: StudioState): void {
    setContext(studioKey, state);
}

export function getStudioContext(): StudioState {
    return getContext<StudioState>(studioKey);
}
