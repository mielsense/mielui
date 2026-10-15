import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Kbd from './kbd.svelte';

export type KbdLabels = {
    /** Spoken name of the Command key, written `cmd`, `command`, or `meta`. */
    command?: string;
    /** Spoken name of the Control key, written `ctrl` or `control`. */
    control?: string;
    /** Spoken name of the Shift key. */
    shift?: string;
    /** Spoken name of the Alt key, written `alt`. */
    alt?: string;
    /** Spoken name of the Option key, written `option` or `opt`. */
    option?: string;
    /** Spoken name of the Enter key, written `enter` or `return`. */
    enter?: string;
    /** Spoken name of the Escape key, written `esc` or `escape`. */
    escape?: string;
    /** Spoken name of the Tab key. */
    tab?: string;
    /** Spoken name of the Space key. */
    space?: string;
    /** Spoken name of the Backspace key. */
    backspace?: string;
    /** Spoken name of the Delete key. */
    delete?: string;
    /** Spoken name of the plus key, written `plus`. */
    plus?: string;
    /** Spoken name of the Up arrow key. */
    up?: string;
    /** Spoken name of the Down arrow key. */
    down?: string;
    /** Spoken name of the Left arrow key. */
    left?: string;
    /** Spoken name of the Right arrow key. */
    right?: string;
};

export type KbdProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    /** Content rendered inside. */
    children?: Snippet;
    /** Keys to show, such as `cmd+K`. With `ontrigger` it also listens for them. */
    shortcut: string;
    /** Called when the shortcut is pressed. */
    ontrigger?: (event: KeyboardEvent) => void;
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: KbdLabels;
};

export { Kbd };
export default Kbd;
