import { getContext, setContext } from 'svelte';

const key = Symbol('toolbar');
export function setToolbarOrientation(value: () => 'horizontal' | 'vertical') {
    setContext(key, value);
}
export function getToolbarOrientation() {
    return getContext<() => 'horizontal' | 'vertical'>(key);
}

const variantKey = Symbol('toolbar-variant');

export function setToolbarVariant(value: () => 'default' | 'depth') {
    setContext(variantKey, value);
}

export function getToolbarVariant() {
    return getContext<(() => 'default' | 'depth') | undefined>(variantKey) ?? (() => 'default');
}
