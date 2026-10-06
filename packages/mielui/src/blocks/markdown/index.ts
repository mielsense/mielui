import type { HTMLAttributes } from 'svelte/elements';
import Markdown from './markdown.svelte';

export type MarkdownLabels = {
    completedTask?: string;
    incompleteTask?: string;
    table?: string;
};

export type MarkdownProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: MarkdownLabels;
    /** Markdown source parsed with marked's GFM tokenizer. Raw HTML is rendered as text. */
    content: string;
    /** Marks an in-progress response as busy and shows a restrained visual caret. */
    streaming?: boolean;
    /** Classes added to the element. */
    class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export { Markdown };
