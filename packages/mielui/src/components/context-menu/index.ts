import type { VirtualElement } from '@floating-ui/dom';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { ButtonProps } from '../button';
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
    children?: Snippet;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};
export type ContextMenuContentProps = DefaultProps & { surface?: 'solid' | 'glass' };

export type ContextMenuItemProps = {
    callback?: () => void;
    inset?: boolean;
} & ButtonProps;

export type ContextMenuCheckboxItemProps = {
    callback?: () => void;
    value: string;
    inset?: boolean;
    checked?: boolean;
} & ButtonProps;

export type ContextMenuSeparatorProps = DefaultProps;
export type ContextMenuSubContentProps = DefaultProps & { surface?: 'solid' | 'glass' };

export type ContextMenuSubTriggerProps = {
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
