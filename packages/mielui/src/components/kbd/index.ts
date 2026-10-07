import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Kbd from './kbd.svelte';

export type KbdProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    /** Content rendered inside. */
    children?: Snippet;
    /** Keys to show, such as `cmd+K`. With `ontrigger` it also listens for them. */
    shortcut: string;
    /** Called when the shortcut is pressed. */
    ontrigger?: (event: KeyboardEvent) => void;
};

export { Kbd };
export default Kbd;
