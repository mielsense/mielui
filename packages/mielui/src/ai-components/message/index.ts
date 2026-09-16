import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Root from './message.svelte';
import Actions from './message-actions.svelte';
import Avatar from './message-avatar.svelte';
import Body from './message-body.svelte';
import Content from './message-content.svelte';
import Metadata from './message-metadata.svelte';
import Name from './message-name.svelte';
import Status from './message-status.svelte';
import Time from './message-time.svelte';

export type MessageFrom = 'assistant' | 'user' | 'system';
export type MessageStatus = 'idle' | 'streaming' | 'error';

export type MessageRootProps = {
    from?: MessageFrom;
    status?: MessageStatus;
    name?: string;
    timestamp?: string;
    avatar?: Snippet;
    layout?: Snippet;
    children?: Snippet;
} & DefaultProps &
    Omit<HTMLAttributes<HTMLElement>, 'children' | 'aria-busy'>;

export type MessageContentProps = DefaultProps & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export type MessageActionsProps = DefaultProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'>;

export type MessageAvatarProps = DefaultProps & HTMLAttributes<HTMLDivElement>;
export type MessageBodyProps = DefaultProps & HTMLAttributes<HTMLDivElement>;
export type MessageMetadataProps = DefaultProps & HTMLAttributes<HTMLElement>;
export type MessageNameProps = DefaultProps & HTMLAttributes<HTMLSpanElement>;
export type MessageTimeProps = DefaultProps & import('svelte/elements').HTMLTimeAttributes;
export type MessageStatusProps = DefaultProps & HTMLAttributes<HTMLSpanElement>;
export { Actions, Avatar, Body, Content, Metadata, Name, Root, Status, Time };
