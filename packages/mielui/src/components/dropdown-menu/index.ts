import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ButtonOnlyProps } from '../_internal/button-attributes';
import Root from './dropdown-menu.svelte';
import CheckboxItem from './dropdown-menu-checkbox-item.svelte';
import Content from './dropdown-menu-content.svelte';
import Item from './dropdown-menu-item.svelte';
import Label from './dropdown-menu-label.svelte';
import RadioGroup from './dropdown-menu-radio-group.svelte';
import RadioItem from './dropdown-menu-radio-item.svelte';
import Separator from './dropdown-menu-separator.svelte';
import Sub from './dropdown-menu-sub.svelte';
import SubContent from './dropdown-menu-sub-content.svelte';
import SubTrigger from './dropdown-menu-sub-trigger.svelte';
import Trigger from './dropdown-menu-trigger.svelte';

export type DropdownMenuProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state when the person opens or closes it, not when you set `open`. */
    onOpenChange?: (open: boolean) => void;
    /** Content rendered inside. */
    children?: Snippet;
};

export type DropdownMenuItemProps = {
    /** Called when the item is chosen. */
    callback?: () => void;
} & ButtonOnlyProps;

export type DropdownMenuRadioGroupProps = {
    /** Value of the selected item. Bindable. */
    value?: string;
    /** Called with the new value when it changes. */
    onValueChange?: (value: string) => void;
    /** Content rendered inside. */
    children?: Snippet;
};

export type DropdownMenuRadioItemProps = {
    /** Value this item selects. */
    value: string;
    /** Content rendered inside. */
    children?: Snippet;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | HTMLAnchorElement;
} & DefaultProps &
    Omit<HTMLButtonAttributes, 'children' | 'role' | 'aria-checked'>;

export type DropdownMenuCheckboxItemProps = {
    /** Whether the item is checked. Bindable. */
    checked?: boolean;
    /** Called with the new state when it changes. */
    onCheckedChange?: (checked: boolean) => void;
    /** Content rendered inside. */
    children?: Snippet;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | HTMLAnchorElement;
} & DefaultProps &
    Omit<HTMLButtonAttributes, 'children' | 'role' | 'aria-checked'>;

export {
    CheckboxItem,
    Content,
    Item,
    Label,
    RadioGroup,
    RadioItem,
    Root,
    Separator,
    Sub,
    SubContent,
    SubTrigger,
    Trigger
};
