import type { HTMLButtonAttributes } from 'svelte/elements';
import Switch from './switch.svelte';

export type SwitchProps = {
    checked?: boolean;
    label?: string;
    description?: string;
    element?: HTMLButtonElement | undefined;
} & Partial<HTMLButtonAttributes>;

export default Switch;
export { Switch };
