import type { DefaultProps } from '@mielui/svelte/utils';
import type { Toolbar as Primitive } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';
import Toolbar from './toolbar.svelte';

export type ToolbarProps = DefaultProps & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'>;

export { default as Button } from './toolbar-button.svelte';
export { default as Group } from './toolbar-group.svelte';
export { default as Item } from './toolbar-item.svelte';
export { default as Link } from './toolbar-link.svelte';
export { default as Root } from './toolbar-root.svelte';
export { default as Separator } from './toolbar-separator.svelte';
export { Toolbar };
export type ToolbarRootProps = Omit<Primitive.RootProps, 'child' | 'ref'> & {
    /** `depth` gives the toolbar raised keys and a floating shell. */
    variant?: 'default' | 'depth';
    /** Bindable reference to the DOM element. */
    element?: HTMLDivElement | null;
};
export type ToolbarButtonProps = Omit<Primitive.ButtonProps, 'child' | 'ref'> & {
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | null;
};
export type ToolbarLinkProps = Omit<Primitive.LinkProps, 'child' | 'ref'> & {
    /** Bindable reference to the DOM element. */
    element?: HTMLAnchorElement | null;
};
export type ToolbarGroupProps = Omit<
    Primitive.GroupProps,
    'type' | 'value' | 'onValueChange' | 'child' | 'ref'
> &
    (
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type: 'single';
              /** Selected tool, or an array in multiple mode. Bindable. */
              value?: string;
              /** Called with the new value when it changes. */
              onValueChange?: (value: string) => void;
          }
        | {
              /** `single` keeps one value. `multiple` allows several and makes `value` an array. */
              type: 'multiple';
              /** Selected tool, or an array in multiple mode. Bindable. */
              value?: string[];
              /** Called with the new value when it changes. */
              onValueChange?: (value: string[]) => void;
          }
    ) & {
        /** Bindable reference to the DOM element. */
        element?: HTMLDivElement | null;
    };
export type ToolbarItemProps = Omit<Primitive.GroupItemProps, 'child' | 'ref'> & {
    /** Bindable reference to the DOM element. */
    element?: HTMLButtonElement | null;
};
