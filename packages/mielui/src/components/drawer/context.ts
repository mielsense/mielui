import { getContext, type Snippet, setContext } from 'svelte';

type DrawerContext = {
    close: () => void;
    overlay: HTMLDivElement | null;
    footer: Snippet | undefined;
};

const key = Symbol('drawer');

export function setDrawerContext(context: DrawerContext) {
    setContext(key, context);
}

export function getDrawerContext() {
    return getContext<DrawerContext>(key);
}
