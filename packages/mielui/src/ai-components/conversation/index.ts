import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import Root from './conversation.svelte';
import Content from './conversation-content.svelte';
import Empty from './conversation-empty.svelte';
import ScrollButton from './conversation-scroll-button.svelte';

export type ConversationLabels = {
    /** Accessible name of the transcript when Content has no `aria-label`. */
    transcript?: string;
    /** Accessible name of the scroll-to-latest button. */
    scrollToBottom?: string;
    /** Heading of the empty state when Empty has no `title`. */
    emptyTitle?: string;
    /** Text of the empty state when Empty has no `description`. */
    emptyDescription?: string;
};

export type ConversationRootProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ConversationLabels;
    /** Whether new content should keep the transcript pinned to its latest message. */
    follow?: boolean;
    /** Distance from the bottom, in pixels, that still counts as following. */
    threshold?: number;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ConversationContentProps = {
    /** Classes applied to the inner transcript stack rather than the scroll viewport. */
    transcriptClass?: string;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role' | 'aria-live' | 'aria-relevant'>;

export type ConversationEmptyProps = {
    /** Icon shown above the title. */
    icon?: Snippet;
    /** Heading of the empty state. */
    title?: string;
    /** Text under the heading. */
    description?: string;
    /** Action shown under the text. */
    action?: Snippet;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ConversationScrollButtonProps = {
    /** Classes added to the element. */
    class?: string;
} & Omit<
    HTMLButtonAttributes,
    'children' | 'class' | 'aria-label' | 'disabled' | 'tabindex' | 'type'
>;

export { Content, Empty, Root, ScrollButton };
