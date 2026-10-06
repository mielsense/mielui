import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import Root from './tooltip.svelte';
import Content from './tooltip-content.svelte';
import Provider from './tooltip-provider.svelte';
import Trigger from './tooltip-trigger.svelte';

export type TooltipPlacement = 'top' | 'left' | 'bottom' | 'right';

export type TooltipProps = {
    /** Milliseconds the pointer rests on the trigger before the tooltip opens. */
    delay?: number;
    /** Milliseconds after the pointer leaves before it closes. */
    closeDelay?: number;
    /** Side of the trigger the tooltip opens on. */
    placement?: TooltipPlacement;
    /** Content rendered inside. */
    children?: Snippet;
};

export type TooltipTriggerProps = {
    /** Also shows the tooltip when the trigger is clicked, for touch screens. */
    showOnClick?: boolean;
} & DefaultProps;

export type TooltipContentProps = DefaultProps & { surface?: 'solid' | 'glass'; rich?: boolean };

export type TooltipProviderProps = { children?: Snippet };

export type TooltipState = {
    text: string;
    placement: TooltipPlacement;
    delay: number;
    closeDelay: number;
    className: string;
};

export { Content, Provider, Root, Trigger };
