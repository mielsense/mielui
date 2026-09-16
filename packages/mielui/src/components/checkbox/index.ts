import type { DefaultProps } from '@mielui/svelte/utils';
import type { HTMLInputAttributes } from 'svelte/elements';
import Checkbox from './checkbox.svelte';

export type CheckboxProps = {
    checked?: boolean;
    label?: string;
    description?: string;
    disabled?: boolean;
    variant?: 'default' | 'primary';
    onCheckedChange?: (checked: boolean) => void;
} & DefaultProps &
    Omit<HTMLInputAttributes, 'children' | 'type' | 'checked'>;

export { Checkbox };
export default Checkbox;
