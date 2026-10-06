import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import Root from './command.svelte';
import Content from './command-content.svelte';
import Group from './command-group.svelte';
import Header from './command-header.svelte';
import Item from './command-item.svelte';
import Results from './command-results.svelte';
import Search from './command-search.svelte';
import Separator from './command-separator.svelte';
import Trigger from './command-trigger.svelte';

export type CommandItem = {
    id: string;
    name: string;
    callback: (() => void) | undefined;
    ref: HTMLButtonElement | HTMLAnchorElement | undefined;
    disabled: boolean;
};

export type CommandProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Content rendered inside. */
    children?: Snippet;
};

export type CommandItemProps = {
    /** Text the search matches. */
    name?: string;
    /** Identifier for the item when names repeat. */
    value?: string;
    /** Called when the item is chosen. */
    callback?: () => void;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Navigates to this address when the item is chosen. */
    href?: string;
    /** Called when it is clicked or activated. */
    onclick?: () => void;
} & DefaultProps;

export type CommandHeaderProps = DefaultProps;

export type CommandSearchProps = Omit<HTMLInputAttributes, 'children'> & {
    /** How loosely typed text may match, from 0 for exact to 1 for anything. */
    threshold?: number;
    /** Replaces the search icon. */
    icon?: Snippet;
    /** Renders the result count. */
    count?: Snippet<[count: number]>;
    /** Renders the screen reader announcement. */
    announcement?: Snippet<[message: string]>;
};

export type CommandResultsProps = DefaultProps & {
    /** Content shown when nothing matches. */
    empty?: Snippet;
};

export type CommandState = {
    id: string;
    items: CommandItem[];
    results: CommandItem[];
    searchContent: string;
    activeId: string | undefined;
    itemsVersion: number;
};

export { Content, Group, Header, Item, Results, Root, Search, Separator, Trigger };
