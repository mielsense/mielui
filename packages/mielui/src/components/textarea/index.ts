import type { Snippet } from 'svelte';
import type { HTMLTextareaAttributes } from 'svelte/elements';
import Textarea from './textarea.svelte';

export type TextareaProps = {
    /** Text shown while there is no value. */
    placeholder?: string;
    /** Visible label linked to the control. */
    label?: string;
    /** Supporting text under the label, announced with the control. */
    description?: string;
    /** `outline` has a border. `secondary` has a filled background. */
    variant?: 'outline' | 'secondary';
    /** Grows with its content instead of scrolling. */
    autoresize?: boolean;
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
    /** Bindable reference to the DOM element. */
    element?: HTMLTextAreaElement | undefined;
    /** Field value. Bindable. */
    value?: string | number | null | undefined;
} & HTMLTextareaAttributes;

export { Textarea };
export default Textarea;
