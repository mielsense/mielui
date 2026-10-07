import type { PinInput } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Root from './otp-field.svelte';
import Cell from './otp-field-cell.svelte';
import Group from './otp-field-group.svelte';
import Separator from './otp-field-separator.svelte';

export type OTPFieldCellState = PinInput.CellProps['cell'];
export type OTPFieldProps = Omit<
    PinInput.RootProps,
    'children' | 'child' | 'ref' | 'inputRef' | 'inputId' | 'maxlength' | 'onComplete'
> & {
    /** Number of characters in the code. */
    length?: number;
    /** Bindable reference to the DOM element. */
    element?: HTMLInputElement | null;
    /** Called with the code once every cell is filled. */
    onComplete?: (value: string) => void;
    /** Content rendered inside. */
    children?: Snippet<[{ cells: OTPFieldCellState[]; isFocused: boolean }]>;
};
export type OTPFieldCellProps = Omit<PinInput.CellProps, 'child' | 'children'>;
export type OTPFieldGroupProps = HTMLAttributes<HTMLDivElement>;
export type OTPFieldSeparatorProps = HTMLAttributes<HTMLSpanElement>;

export { Cell, Group, Root, Separator };
