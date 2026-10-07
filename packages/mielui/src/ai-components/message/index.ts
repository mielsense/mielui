import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLTimeAttributes } from 'svelte/elements';
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

export type MessageLabels = {
    failed?: string;
    streaming?: string;
    complete?: string;
    actions?: string;
};

export type MessageRootProps = {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: MessageLabels;
    /** Who sent the message. It sets the alignment and style. */
    from?: MessageFrom;
    /** Current state of the message, such as streaming or failed. */
    status?: MessageStatus;
    /** Sender name. */
    name?: string;
    /** Time shown with the message. */
    timestamp?: string;
    /** Avatar shown beside the message. */
    avatar?: Snippet;
    /** Replaces the default arrangement of avatar, header, and content. */
    layout?: Snippet;
    /** Content rendered inside. */
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
export type MessageTimeProps = DefaultProps & HTMLTimeAttributes;
export type MessageStatusProps = DefaultProps & HTMLAttributes<HTMLSpanElement>;
export { Actions, Avatar, Body, Content, Metadata, Name, Root, Status, Time };
