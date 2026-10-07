import type { HTMLButtonAttributes } from 'svelte/elements';
import Switch from './switch.svelte';

export type SwitchProps = {
    /** Whether it is on. Bindable. */
    checked?: boolean;
    /** Visible label linked to the control. */
    label?: string;
    /** Supporting text under the label, announced with the control. */
    description?: string;
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | undefined;
} & Partial<HTMLButtonAttributes>;

export default Switch;
export { Switch };
