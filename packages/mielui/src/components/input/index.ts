import type { Snippet } from 'svelte';
import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import Input from './input.svelte';

type KnownInputType<Type> = Type extends string ? (string extends Type ? never : Type) : never;

export type InputProps = {
    placeholder?: string;
    label?: string;
    description?: string;
    variant?: 'outline' | 'secondary';
    class?: string;
    leading?: Snippet;
    trailing?: Snippet;
    element?: HTMLInputElement | undefined;
} & Omit<HTMLInputAttributes, 'type' | 'value' | 'checked' | 'files'> &
    (
        | { type: 'file'; files?: FileList; value?: never; checked?: never }
        | { type: 'checkbox' | 'radio'; value?: string | number; checked?: boolean; files?: never }
        | {
              type?: Exclude<KnownInputType<HTMLInputTypeAttribute>, 'file' | 'checkbox' | 'radio'>;
              value?: string | number;
              checked?: never;
              files?: never;
          }
    );

export { Input };
export default Input;
