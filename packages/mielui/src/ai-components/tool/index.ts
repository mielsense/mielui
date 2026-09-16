import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import Root from './tool.svelte';
import Content from './tool-content.svelte';
import Input from './tool-input.svelte';
import Item from './tool-item.svelte';
import Output from './tool-output.svelte';
import Trigger from './tool-trigger.svelte';

export type ToolState = 'running' | 'complete' | 'error';
export type ToolVariant = 'default' | 'quiet';

export type ToolProps = {
    /** A concise summary of the work completed by this task group. */
    name: string;
    state?: ToolState;
    /** A low-emphasis presentation for inline transcript details. */
    variant?: ToolVariant;
    /** A compact summary of how long the task took, such as 6s. */
    duration?: string;
    /** Whether the individual tool calls are visible. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
    /** Render explicit Trigger and Content parts through children. */
    composed?: boolean;
    trigger?: Snippet<[ToolTriggerState]>;
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLElement>, 'children'>;

export type ToolTriggerState = Readonly<{
    open: boolean;
    state: ToolState;
    name: string;
    duration?: string;
}>;

export type ToolItemProps = {
    name: string;
    detail?: string;
    kind?: 'command' | 'search' | 'read';
} & DefaultProps;

export type ToolInputProps = {
    label?: string;
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ToolOutputProps = {
    label?: string;
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ToolTriggerProps = {
    children?: Snippet<[ToolTriggerState]>;
} & Omit<HTMLButtonAttributes, 'children'>;

export type ToolContentProps = {
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export { Content, Input, Item, Output, Root, Trigger };
