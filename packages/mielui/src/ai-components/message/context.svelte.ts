import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { MessageFrom, MessageLabels, MessageStatus } from '.';

export type MessageContext = {
    readonly name?: string;
    readonly timestamp?: string;
    readonly avatar?: Snippet;
    get from(): MessageFrom;
    get status(): MessageStatus;
};

const { set: setMessageContext, get: getMessageContext } = createContext<MessageContext>('message');

const { set: setMessageLabels, find: findMessageLabels } =
    createContext<() => MessageLabels | undefined>('message-labels');

export { findMessageLabels, getMessageContext, setMessageContext, setMessageLabels };
