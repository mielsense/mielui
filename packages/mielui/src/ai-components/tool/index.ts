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

export type ToolLabels = {
    running?: string;
    complete?: string;
    failed?: string;
    input?: string;
    output?: string;
};

export type ToolProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ToolLabels;
    /** A concise summary of the work completed by this task group. */
    name: string;
    /** State of the run, which sets the indicator and summary. */
    state?: ToolState;
    /** A low-emphasis presentation for inline transcript details. */
    variant?: ToolVariant;
    /** A compact summary of how long the task took, such as 6s. */
    duration?: string;
    /** Whether the individual tool calls are visible. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Called after the open or close animation finishes. */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Render explicit Trigger and Content parts through children. */
    composed?: boolean;
    /** Replaces the default trigger. It receives the open state, the run state, and the name. */
    trigger?: Snippet<[ToolTriggerState]>;
    /** Content rendered inside. */
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
    /** Name of the step, such as the tool that ran. */
    name: string;
    /** What the step acted on, such as a path or query. */
    detail?: string;
    /** Kind of step, which sets its icon. */
    kind?: 'command' | 'search' | 'read';
} & DefaultProps;

export type ToolInputProps = {
    /** Heading of the section. */
    label?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ToolOutputProps = {
    /** Heading of the section. */
    label?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type ToolTriggerProps = {
    /** Content rendered inside. */
    children?: Snippet<[ToolTriggerState]>;
} & Omit<HTMLButtonAttributes, 'children'>;

export type ToolContentProps = {
    /** Content rendered inside. */
    children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export { Content, Input, Item, Output, Root, Trigger };
