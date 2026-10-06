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
    /** Color and emphasis. Status variants pair their color with your text. */
    variant?: BadgeVariant;
    /** Icon component shown before the label. */
    icon?: Component<{ size?: number | string; class?: string }>;
    /** Icon size in pixels. */
    iconSize?: number | string;
    /** Shows a small status dot before the label. */
    dot?: boolean;
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

type BadgeLinkProps = BadgeSharedProps & {
    /** Renders the badge as a link to this address. */
    href: string;
} & Omit<HTMLAnchorAttributes, keyof BadgeSharedProps | 'href'>;

type BadgeStaticProps = BadgeSharedProps & {
    /** Renders the badge as a link to this address. */
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
