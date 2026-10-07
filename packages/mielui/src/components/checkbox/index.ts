import type { DefaultProps } from '@mielui/svelte/utils';
import type { HTMLInputAttributes } from 'svelte/elements';
import Checkbox from './checkbox.svelte';

export type CheckboxProps = {
    /** Whether it is checked. Bind it to control the state from outside. */
    checked?: boolean;
    /** Visible label linked to the control. */
    label?: string;
    /** Supporting text under the label, announced with the control. */
    description?: string;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** `primary` fills the checked box with the primary color. */
    variant?: 'default' | 'primary';
    /** Size of the box. */
    size?: 'sm' | 'md' | 'lg';
    /** Called with the new state when it changes. */
    onCheckedChange?: (checked: boolean) => void;
} & DefaultProps &
    Omit<HTMLInputAttributes, 'children' | 'type' | 'checked' | 'size'>;

export { Checkbox };
export default Checkbox;
