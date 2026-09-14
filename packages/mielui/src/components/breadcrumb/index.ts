import type { DefaultProps } from '@mielui/svelte/utils';
import Root from './breadcrumb.svelte';
import Item from './breadcrumb-item.svelte';
import Separator from './breadcrumb-separator.svelte';

export type BreadcrumbProps = DefaultProps;
export type BreadcrumbItemProps = {
    href?: string;
} & DefaultProps;
export type BreadcrumbSeparatorProps = DefaultProps;

export { Item, Root, Separator };
