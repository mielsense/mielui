import type { DefaultProps } from '@mielui/svelte/utils';
import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
import Root from './breadcrumb.svelte';
import Item from './breadcrumb-item.svelte';
import Separator from './breadcrumb-separator.svelte';

export type BreadcrumbProps = DefaultProps & HTMLAttributes<HTMLElement>;
export type BreadcrumbItemProps = {
    href?: string;
    /** Whether this item represents the current page. Router independent. */
    current?: boolean;
} & DefaultProps &
    Omit<HTMLAnchorAttributes, 'aria-current'>;
export type BreadcrumbSeparatorProps = DefaultProps;

export { Item, Root, Separator };
