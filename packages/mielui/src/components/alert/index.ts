import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Root from './alert.svelte';
import Description from './alert-description.svelte';
import Title from './alert-title.svelte';

export type AlertVariant = 'info' | 'error' | 'success' | 'warning';

export type AlertProps = {
    variant?: AlertVariant;
    icon?: Snippet | false;
    /** Announcement urgency, independent of appearance. Defaults to off. */
    announcement?: 'off' | 'polite' | 'assertive';
} & DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'aria-live' | 'aria-atomic'>;

export type AlertTitleProps = DefaultProps;
export type AlertDescriptionProps = DefaultProps;

export { Description, Root, Title };
