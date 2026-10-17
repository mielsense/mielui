import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';

type DrawerContext = {
    close: () => void;
    overlay: HTMLDivElement | null;
    footer: Snippet | undefined;
};

const { set: setDrawerContext, get: getDrawerContext } = createContext<DrawerContext>('drawer');

export { getDrawerContext, setDrawerContext };
