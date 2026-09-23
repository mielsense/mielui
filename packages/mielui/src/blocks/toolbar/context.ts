import { getContext, setContext } from 'svelte';

const key = Symbol('toolbar');
export function setToolbarOrientation(value: () => 'horizontal' | 'vertical') {
    setContext(key, value);
}
export function getToolbarOrientation() {
    return getContext<() => 'horizontal' | 'vertical'>(key);
}
