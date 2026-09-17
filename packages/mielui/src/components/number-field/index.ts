import type { Snippet } from 'svelte';
import type {
    HTMLAttributes,
    HTMLButtonAttributes,
    HTMLInputAttributes,
    HTMLLabelAttributes
} from 'svelte/elements';
import Root from './number-field.svelte';
import Decrement from './number-field-decrement.svelte';
import Group from './number-field-group.svelte';
import Increment from './number-field-increment.svelte';
import Input from './number-field-input.svelte';
import Label from './number-field-label.svelte';

export type NumberFieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onchange'> & {
    value?: number;
    inputId?: string;
    min?: number;
    max?: number;
    step?: number;
    name?: string;
    form?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    onValueChange?: (value: number | undefined) => void;
    children?: Snippet<[{ value: number | undefined }]>;
    element?: HTMLDivElement | undefined;
};
export type NumberFieldInputProps = Omit<
    HTMLInputAttributes,
    'type' | 'value' | 'defaultValue' | 'min' | 'max' | 'step' | 'name' | 'form' | 'children'
> & {
    element?: HTMLInputElement | undefined;
};
export type NumberFieldLabelProps = HTMLLabelAttributes;
export type NumberFieldGroupProps = HTMLAttributes<HTMLDivElement>;
export type NumberFieldStepperProps = Omit<HTMLButtonAttributes, 'onclick'> & {
    onclick?: (event: MouseEvent) => void;
    element?: HTMLButtonElement | undefined;
};

export { Decrement, Group, Increment, Input, Label, Root };
