import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { MessageFrom, MessageStatus } from '.';

export type MessageContext = {
    readonly name?: string;
    readonly timestamp?: string;
    readonly avatar?: Snippet;
    get from(): MessageFrom;
    get status(): MessageStatus;
};

const { set: setMessageContext, get: getMessageContext } = createContext<MessageContext>('message');

export { getMessageContext, setMessageContext };
