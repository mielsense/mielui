import type { Snippet } from 'svelte';
import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import Input from './input.svelte';

type KnownInputType<Type> = Type extends string ? (string extends Type ? never : Type) : never;

export type InputProps = {
    /** Text shown while there is no value. */
    placeholder?: string;
    /** Visible label linked to the control. */
    label?: string;
    /** Supporting text under the label, announced with the control. */
    description?: string;
    /** `outline` has a border. `secondary` has a filled background. */
    variant?: 'outline' | 'secondary';
    /** Classes added to the element. */
    class?: string;
    /** Decorative content inside the field, before the text. */
    leading?: Snippet;
    /** Decorative content inside the field, after the text. */
    trailing?: Snippet;
    /** Bindable reference to the DOM element. */
    element?: HTMLInputElement | undefined;
} & Omit<HTMLInputAttributes, 'type' | 'value' | 'checked' | 'files'> &
    (
        | { type: 'file'; files?: FileList; value?: never; checked?: never }
        | { type: 'checkbox' | 'radio'; value?: string | number; checked?: boolean; files?: never }
        | {
              /** Native input type. */
              type?: Exclude<KnownInputType<HTMLInputTypeAttribute>, 'file' | 'checkbox' | 'radio'>;
              /** Field value. Bindable. */
              value?: string | number;
              /** Checked state for the checkbox and radio types. Bindable. */
              checked?: never;
              /** Selected files for a file input. Bindable. */
              files?: never;
          }
    );

export { Input };
export default Input;
