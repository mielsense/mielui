import { getContext, setContext } from 'svelte';

type DrawerContext = {
    close: () => void;
    overlay: HTMLDivElement | null;
};

const key = Symbol('drawer');

export function setDrawerContext(context: DrawerContext) {
    setContext(key, context);
}

export function getDrawerContext() {
    return getContext<DrawerContext>(key);
}
