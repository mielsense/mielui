import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { ButtonOnlyProps } from '../_internal/button-attributes';
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
    /** Field name submitted with the form. */
    name?: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Requires a value before the form can be submitted. */
    required?: boolean;
    /** Content rendered inside. */
    children?: Snippet;
};

export type SelectProps = SelectRootProps &
    (
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type?: 'single';
              /** Selected value, or an array in multiple mode. Bindable. */
              value?: string;
              /** Called with the new value when it changes. */
              onValueChange?: (value: string) => void;
          }
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type: 'multiple';
              /** Selected value, or an array in multiple mode. Bindable. */
              value?: string[];
              /** Called with the new value when it changes. */
              onValueChange?: (value: string[]) => void;
          }
    );

export type SelectItemProps = {
    /** Value this option selects. */
    value: string;
    /** Text shown in the trigger when it differs from the option's content. */
    label?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & ButtonOnlyProps;

export type SelectValueProps = {
    placeholder?: string;
} & DefaultProps;

export { Content, Item, Label, Root, Trigger, Value };
