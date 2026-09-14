import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Root from './message.svelte';
import Actions from './message-actions.svelte';
import Content from './message-content.svelte';

export type MessageFrom = 'assistant' | 'user' | 'system';
export type MessageStatus = 'idle' | 'streaming' | 'error';

export type MessageRootProps = {
    from?: MessageFrom;
    status?: MessageStatus;
    name?: string;
    timestamp?: string;
    avatar?: Snippet;
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLElement>, 'children' | 'aria-busy'>;

export type MessageContentProps = DefaultProps & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type MessageActionsProps = DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'>;

export { Actions, Content, Root };
