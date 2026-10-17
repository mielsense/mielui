import type { ButtonVariant } from '@mielui/svelte/components/button';
import type { PopoverTriggerProps } from '@mielui/svelte/components/popover';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { MenuRowButtonProps } from '../_internal/button-attributes';
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

export type SelectTriggerProps = {
    /** Content rendered inside. Defaults to `Select.Value`. */
    children?: Snippet;
    /** Classes added to the element. */
    class?: string;
    /** Button style of the trigger. */
    variant?: ButtonVariant;
    /** Id of the element that labels the trigger. */
    'aria-labelledby'?: string;
    /** Marks the trigger as invalid for assistive technology and error styling. */
    'aria-invalid'?: HTMLButtonAttributes['aria-invalid'];
} & Omit<PopoverTriggerProps, 'children' | 'class' | 'variant' | 'icon'>;

export type SelectContentProps = {
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /** Sizes the list to its longest option, even when the trigger is narrower. */
    dynamic?: boolean;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
};

export type SelectLabelProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children: Snippet;
};

export type SelectItemProps = {
    /** Value this option selects. */
    value: string;
    /** Text shown in the trigger when it differs from the option's content. */
    label?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & MenuRowButtonProps;

export type SelectValueProps = {
    /** Text shown while nothing is selected. */
    placeholder?: string;
    /** Classes added to the element. */
    class?: string;
};

export { Content, Item, Label, Root, Trigger, Value };
