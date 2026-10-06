import type { ButtonProps } from '@mielui/svelte/components/button';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import Root from './select.svelte';
import Content from './select-content.svelte';
import Item from './select-item.svelte';
import Label from './select-label.svelte';
import Trigger from './select-trigger.svelte';
import Value from './select-value.svelte';

export type SelectState<Value extends string | string[] = string> = {
    value: Value;
    selectedLabel: string;
};

type SelectRootProps = {
    /** Whether it is open. Bind it to control the state from outside. */
    open?: boolean;
    /** Called with the new state whenever it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    children?: Snippet;
};

export type SelectProps = SelectRootProps &
    (
        | {
              type?: 'single';
              value?: string;
              onValueChange?: (value: string) => void;
          }
        | {
              type: 'multiple';
              value?: string[];
              onValueChange?: (value: string[]) => void;
          }
    );

export type SelectItemProps = {
    value: string;
    label?: string;
    children?: Snippet;
} & ButtonProps;

export type SelectValueProps = {
    placeholder?: string;
} & DefaultProps;

export { Content, Item, Label, Root, Trigger, Value };
