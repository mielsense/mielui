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
    variant?: 'default' | 'depth';
    element?: HTMLDivElement | null;
};
export type ToolbarButtonProps = Omit<Primitive.ButtonProps, 'child' | 'ref'> & {
    element?: HTMLButtonElement | null;
};
export type ToolbarLinkProps = Omit<Primitive.LinkProps, 'child' | 'ref'> & {
    element?: HTMLAnchorElement | null;
};
export type ToolbarGroupProps = Omit<
    Primitive.GroupProps,
    'type' | 'value' | 'onValueChange' | 'child' | 'ref'
> &
    (
        | {
              type: 'single';
              value?: string;
              onValueChange?: (value: string) => void;
          }
        | {
              type: 'multiple';
              value?: string[];
              onValueChange?: (value: string[]) => void;
          }
    ) & {
        element?: HTMLDivElement | null;
    };
export type ToolbarItemProps = Omit<Primitive.GroupItemProps, 'child' | 'ref'> & {
    element?: HTMLButtonElement | null;
};
