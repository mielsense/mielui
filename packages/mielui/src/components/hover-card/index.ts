import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import Root from './hover-card.svelte';
import Content from './hover-card-content.svelte';
import Description from './hover-card-description.svelte';
import Title from './hover-card-title.svelte';
import Trigger from './hover-card-trigger.svelte';

export type HoverCardProps = {
    open?: boolean;
    openDelay?: number;
    closeDelay?: number;
    children?: Snippet;
};

export type HoverCardTriggerProps = {
    href?: string;
    children?: Snippet;
} & DefaultProps;

export type HoverCardContentProps = {
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    children?: Snippet;
} & DefaultProps;

export { Content, Description, Root, Title, Trigger };
