import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { HeadingLevel } from '../typography';
import Root from './empty-state.svelte';
import Actions from './empty-state-actions.svelte';
import Content from './empty-state-content.svelte';
import Description from './empty-state-description.svelte';
import Header from './empty-state-header.svelte';
import Media from './empty-state-media.svelte';
import Title from './empty-state-title.svelte';

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
};

export type EmptyStateHeaderProps = HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
};

export type EmptyStateMediaProps = HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
};

export type EmptyStateTitleProps = HTMLAttributes<HTMLHeadingElement> & {
    level?: HeadingLevel;
    children?: Snippet;
};

export type EmptyStateDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
    children?: Snippet;
};

export type EmptyStateContentProps = HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
};

export type EmptyStateActionsProps = HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
};

export { Actions, Content, Description, Header, Media, Root, Title };
