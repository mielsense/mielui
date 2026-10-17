import type { ButtonVariant } from '@mielui/svelte/components/button';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import CopyButton from './copy-button.svelte';

export type CopyButtonLabels = {
    /** Tooltip and accessible name at rest. */
    copy?: string;
    /** Tooltip and accessible name shown right after copying. */
    copied?: string;
};

export type CopyButtonProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: CopyButtonLabels;
    /** The string written to the clipboard on click. */
    text: string;
    /** How long (ms) to hold the copied state before reverting. */
    duration?: number;
    /** Button variant (defaults to `ghost`). */
    variant?: ButtonVariant;
    /** Button size (defaults to `icon`). Pass a text size when rendering children. */
    size?: 'sm' | 'md' | 'lg' | 'icon';
    /** Classes added to the element. */
    class?: string;
    /** Optional visible label rendered after the icon. */
    children?: Snippet;
    /** Fired after the text is successfully written to the clipboard. */
    oncopy?: (text: string) => void;
} & Omit<HTMLButtonAttributes, 'class' | 'type' | 'oncopy'>;

export { CopyButton };
export default CopyButton;
