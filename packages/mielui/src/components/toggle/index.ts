import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import Toggle from './toggle.svelte';

export type ToggleProps = {
    /** Whether it is on. Bindable. */
    pressed?: boolean;
    /** Prevents interaction and dims the control. */
    disabled?: boolean;
    /** Control height. */
    size?: 'sm' | 'md' | 'lg';
    /** `outline` adds a border. */
    variant?: 'default' | 'outline';
    /** Content rendered inside. */
    children?: Snippet;
    /** Called with the new state. */
    onPressedChange?: (pressed: boolean) => void;
} & DefaultProps &
    Omit<HTMLButtonAttributes, 'onclick' | 'children'>;

export { Toggle };
export default Toggle;
