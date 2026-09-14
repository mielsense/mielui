import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import Root from './collapsible.svelte';
import Content from './collapsible-content.svelte';
import Trigger from './collapsible-trigger.svelte';

export type CollapsibleProps = {
    open?: boolean;
    disabled?: boolean;
    children?: Snippet;
};

export type CollapsibleTriggerProps = {
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLButtonAttributes, 'onclick' | 'children'>;

export type CollapsibleContentProps = {
    children?: Snippet;
} & DefaultProps;

export type CollapsibleState = {
    open: boolean;
    disabled: boolean;
};

export { Content, Root, Trigger };
