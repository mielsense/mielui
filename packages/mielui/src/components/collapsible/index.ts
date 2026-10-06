import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import Root from './collapsible.svelte';
import Content from './collapsible-content.svelte';
import Trigger from './collapsible-trigger.svelte';

export type CollapsibleProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Prevents opening and closing. */
    disabled?: boolean;
    /** Content rendered inside. */
    children?: Snippet;
};

export type CollapsibleTriggerProps = {
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLButtonAttributes, 'onclick' | 'children'>;

export type CollapsibleContentProps = {
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type CollapsibleState = {
    open: boolean;
    disabled: boolean;
};

export { Content, Root, Trigger };
