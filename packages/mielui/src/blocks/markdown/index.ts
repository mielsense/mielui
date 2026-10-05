import type { HTMLAttributes } from 'svelte/elements';
import Markdown from './markdown.svelte';

export type MarkdownLabels = {
    completedTask?: string;
    incompleteTask?: string;
    table?: string;
};

export type MarkdownProps = {
    labels?: MarkdownLabels;
    /** Markdown source parsed with marked's GFM tokenizer. Raw HTML is rendered as text. */
    content: string;
    /** Marks an in-progress response as busy and shows a restrained visual caret. */
    streaming?: boolean;
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export { Markdown };
