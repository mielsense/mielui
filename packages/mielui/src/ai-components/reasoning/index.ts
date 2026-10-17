import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import Root from './reasoning.svelte';
import Content from './reasoning-content.svelte';
import Trigger from './reasoning-trigger.svelte';

export type ReasoningLabels = {
    /** Status line while the reasoning is streaming. */
    thinking?: string;
    /** Status line once the reasoning finishes without a `duration`. */
    thought?: string;
    /** Status line once the reasoning finishes with a `duration`, such as "Thought for 2.4s". */
    thoughtFor?: (duration: string) => string;
    /** Summary under the status line while closed when the trigger has no `title`. */
    title?: string;
};

export type ReasoningRootProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ReasoningLabels;
    /** Marks the reasoning as still being written. */
    streaming?: boolean;
    /** Whether the reasoning content is visible. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Called after the open or close animation finishes. */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<DefaultProps, 'children'> &
    Omit<HTMLAttributes<HTMLElement>, 'children'>;

export type ReasoningTriggerProps = {
    /** Summary shown under the status line while the reasoning is closed. */
    title?: string;
    /** A compact summary of the completed reasoning time, such as 2.4s. */
    duration?: string;
    /** Content rendered inside. */
    children?: Snippet<[ReasoningTriggerState]>;
} & Omit<DefaultProps, 'children'> &
    Omit<HTMLButtonAttributes, 'children' | 'onclick' | 'title'>;

export type ReasoningTriggerState = Readonly<{
    open: boolean;
    streaming: boolean;
}>;

export type ReasoningContentProps = DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'id'>;

export { Content, Root, Trigger };
