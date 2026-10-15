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

export type NumberFieldLabels = {
    /** Accessible name of the button that steps the value down. */
    decrease?: string;
    /** Accessible name of the button that steps the value up. */
    increase?: string;
};

export type NumberFieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onchange'> & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: NumberFieldLabels;
    /** Current number. Bindable. */
    value?: number;
    /** Id of the input, for a label outside the field. */
    inputId?: string;
    /** Smallest allowed value. */
    min?: number;
    /** Largest allowed value. */
    max?: number;
    /** Amount each step changes the value by. */
    step?: number;
    /** Field name submitted with the form. */
    name?: string;
    /** Id of the form this control belongs to when it sits outside that form. */
    form?: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Shows the value without allowing edits. The value is still submitted. */
    readonly?: boolean;
    /** Requires a value before the form can be submitted. */
    required?: boolean;
    /** Called with the new value when it changes. */
    onValueChange?: (value: number | undefined) => void;
    /** Content rendered inside. */
    children?: Snippet<[{ value: number | undefined }]>;
    /** Bindable reference to the DOM element. */
    element?: HTMLDivElement | undefined;
};
export type NumberFieldInputProps = Omit<
    HTMLInputAttributes,
    'type' | 'value' | 'defaultValue' | 'min' | 'max' | 'step' | 'name' | 'form' | 'children'
> & {
    /** Bindable reference to the DOM element. */
    element?: HTMLInputElement | undefined;
};
export type NumberFieldLabelProps = HTMLLabelAttributes;
export type NumberFieldGroupProps = HTMLAttributes<HTMLDivElement>;
export type NumberFieldStepperProps = Omit<HTMLButtonAttributes, 'onclick'> & {
    /** Called on click, before the value steps. Call `preventDefault()` to skip the step. */
    onclick?: (event: MouseEvent) => void;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | undefined;
};

export { Decrement, Group, Increment, Input, Label, Root };
