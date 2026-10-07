import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import Root from './reasoning.svelte';
import Content from './reasoning-content.svelte';
import Trigger from './reasoning-trigger.svelte';

export type ReasoningLabels = {
    thinking?: string;
    thought?: string;
    thoughtFor?: (duration: string) => string;
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
    /** Text of the trigger. */
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
