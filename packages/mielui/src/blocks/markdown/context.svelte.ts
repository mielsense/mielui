import { createContext } from '@mielui/svelte/utils';
import type { MarkdownLabels } from '.';

const { set: setMarkdownLabels, find: findMarkdownLabels } =
    createContext<() => MarkdownLabels | undefined>('markdown-labels');

export { findMarkdownLabels, setMarkdownLabels };
