import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import Root from './hover-card.svelte';
import Content from './hover-card-content.svelte';
import Description from './hover-card-description.svelte';
import Title from './hover-card-title.svelte';
import Trigger from './hover-card-trigger.svelte';

/** A side of the trigger, optionally aligned to its start or end. */
export type HoverCardPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

export type HoverCardProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Milliseconds the pointer rests on the trigger before the card opens. */
    delay?: number;
    /** Milliseconds after the pointer leaves before the card closes. */
    closeDelay?: number;
    /**
     * Preferred side and alignment relative to the trigger, such as `bottom-start`. It flips when
     * there is no room.
     */
    placement?: HoverCardPlacement;
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
    /** Gap between the trigger and the card, in pixels. */
    sideOffset?: number;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type HoverCardTitleProps = DefaultProps;
export type HoverCardDescriptionProps = DefaultProps;

export { Content, Description, Root, Title, Trigger };
