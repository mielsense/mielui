import type { DefaultProps } from '@mielui/svelte/utils';
import type { Component, Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
import Badge from './badge.svelte';

export type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'outline'
    | 'destructive'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

type BadgeSharedProps = {
    variant?: BadgeVariant;
    icon?: Component<{ size?: number | string; class?: string }>;
    iconSize?: number | string;
    dot?: boolean;
    children?: Snippet;
} & DefaultProps;

type BadgeLinkProps = BadgeSharedProps & {
    href: string;
} & Omit<HTMLAnchorAttributes, keyof BadgeSharedProps | 'href'>;

type BadgeStaticProps = BadgeSharedProps & {
    href?: undefined;
} & Omit<HTMLAttributes<HTMLDivElement>, keyof BadgeSharedProps> & {
        [Attribute in Exclude<
            keyof HTMLAnchorAttributes,
            keyof HTMLAttributes<HTMLDivElement>
        >]?: never;
    };

export type BadgeProps = BadgeLinkProps | BadgeStaticProps;

export { Badge };
export default Badge;
