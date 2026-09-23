import { getContext, type Snippet, setContext } from 'svelte';

export type PageInfo = {
    title: string;
    description?: Snippet;
};

export type PageInfoContext = {
    current: PageInfo | null;
};

const pageInfoKey = Symbol('docs-page-info');

export function setPageInfoContext(context: PageInfoContext): void {
    setContext(pageInfoKey, context);
}

export function getPageInfoContext(): PageInfoContext | undefined {
    return getContext<PageInfoContext | undefined>(pageInfoKey);
}
