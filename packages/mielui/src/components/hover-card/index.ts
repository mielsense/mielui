import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import Root from './hover-card.svelte';
import Content from './hover-card-content.svelte';
import Description from './hover-card-description.svelte';
import Title from './hover-card-title.svelte';
import Trigger from './hover-card-trigger.svelte';

export type HoverCardProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Milliseconds the pointer rests on the trigger before the card opens. */
    openDelay?: number;
    /** Milliseconds after the pointer leaves before the card closes. */
    closeDelay?: number;
    /** Content rendered inside. */
    children?: Snippet;
};

export type HoverCardTriggerProps = {
    /** Destination of the trigger link. The card previews it. */
    href?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type HoverCardContentProps = {
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /** Preferred side of the trigger. The card flips to the opposite side when there is no room. */
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Alignment along that side. The card shifts to stay inside the viewport. */
    align?: 'start' | 'center' | 'end';
    /** Gap between the trigger and the card, in pixels. */
    sideOffset?: number;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export { Content, Description, Root, Title, Trigger };
