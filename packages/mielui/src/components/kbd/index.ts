import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Kbd from './kbd.svelte';

export type KbdProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    children?: Snippet;
    shortcut: string;
    ontrigger?: (event: KeyboardEvent) => void;
};

export { Kbd };
export default Kbd;
