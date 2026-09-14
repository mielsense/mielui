import type { ButtonProps } from '@mielui/svelte/components/button';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import Root from './fullscreen-nav.svelte';
import Close from './fullscreen-nav-close.svelte';
import Content from './fullscreen-nav-content.svelte';
import Group from './fullscreen-nav-group.svelte';
import Link from './fullscreen-nav-link.svelte';
import Trigger from './fullscreen-nav-trigger.svelte';

export type FullscreenNavProps = {
    open?: boolean;
    children?: Snippet;
};

export type FullscreenNavTriggerProps = ButtonProps;
export type FullscreenNavContentProps = {
    label?: string;
} & DefaultProps;
export type FullscreenNavCloseProps = ButtonProps;
export type FullscreenNavGroupProps = {
    heading: string;
} & DefaultProps;
export type FullscreenNavLinkProps = Omit<HTMLAnchorAttributes, 'class' | 'children'> & {
    class?: string;
    children?: Snippet;
};

export type FullscreenNavState = {
    open: boolean;
    animationIndex: number;
    triggerRef?: HTMLElement | null;
};

export { Close, Content, Group, Link, Root, Trigger };
