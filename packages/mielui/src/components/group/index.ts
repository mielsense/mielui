import type { HTMLAttributes } from 'svelte/elements';
import Root from './group.svelte';
import Separator from './group-separator.svelte';
import Text from './group-text.svelte';

export type GroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
    /** Direction the controls are joined in. */
    orientation?: 'horizontal' | 'vertical';
};

export type GroupSeparatorProps = Omit<
    HTMLAttributes<HTMLDivElement>,
    'children' | 'role' | 'aria-hidden'
> & {
    /** Direction of the line. Use `vertical` between controls in a horizontal group. */
    orientation?: 'horizontal' | 'vertical';
};

export type GroupTextProps = HTMLAttributes<HTMLElement> & {
    /** Element to render, such as `label` or `span`. Defaults to `div`. */
    as?: keyof HTMLElementTagNameMap;
    /** Id of the control a `label` element describes. */
    for?: string;
};

export { Root, Separator, Text };
