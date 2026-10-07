import type { VirtualElement } from '@floating-ui/dom';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { ButtonOnlyProps } from '../_internal/button-attributes';
import Root from './context-menu.svelte';
import CheckboxItem from './context-menu-checkbox-item.svelte';
import Content from './context-menu-content.svelte';
import Item from './context-menu-item.svelte';
import Separator from './context-menu-separator.svelte';
import Sub from './context-menu-sub.svelte';
import SubContent from './context-menu-sub-content.svelte';
import SubTrigger from './context-menu-sub-trigger.svelte';
import Trigger from './context-menu-trigger.svelte';

export type ContextMenuProps = {
    /** Content rendered inside. */
    children?: Snippet;
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
};
export type ContextMenuContentProps = DefaultProps & { surface?: 'solid' | 'glass' };

export type ContextMenuItemProps = {
    /** Called when the item is chosen. */
    callback?: () => void;
    /** Indents the item so it lines up with items that have an indicator. */
    inset?: boolean;
} & ButtonOnlyProps;

export type ContextMenuCheckboxItemProps = {
    /** Called when the item is chosen. */
    callback?: () => void;
    /** Value reported for the item. */
    value: string;
    /** Indents the item so it lines up with items that have an indicator. */
    inset?: boolean;
    /** Whether the item is checked. Bindable. */
    checked?: boolean;
} & ButtonOnlyProps;

export type ContextMenuSeparatorProps = DefaultProps;
export type ContextMenuSubContentProps = DefaultProps & { surface?: 'solid' | 'glass' };

export type ContextMenuSubTriggerProps = {
    /** Indents the item so it lines up with items that have an indicator. */
    inset?: boolean;
} & DefaultProps;

export type ContextMenuSubProps = { children?: Snippet };
export type ContextMenuTriggerProps = DefaultProps;

export type ContextMenuCheckboxItemState = {
    checked?: boolean;
    value: string;
};

export type ContextMenuState = {
    open: boolean;
    virtualElement?: VirtualElement;
    checkboxItems: Map<string, boolean>;
};

export { CheckboxItem, Content, Item, Root, Separator, Sub, SubContent, SubTrigger, Trigger };
