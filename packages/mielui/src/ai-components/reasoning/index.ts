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
    labels?: ReasoningLabels;
    streaming?: boolean;
    /** Whether the reasoning content is visible. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
    children?: Snippet;
} & Omit<DefaultProps, 'children'> &
    Omit<HTMLAttributes<HTMLElement>, 'children'>;

export type ReasoningTriggerProps = {
    title?: string;
    /** A compact summary of the completed reasoning time, such as 2.4s. */
    duration?: string;
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
