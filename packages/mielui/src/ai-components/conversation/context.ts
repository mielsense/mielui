import { createContext } from '@mielui/svelte/utils';
import type { ConversationLabels } from '.';
import type { createConversationFollow } from './follow.svelte';

export type ConversationContext = ReturnType<typeof createConversationFollow>;

const { set: setConversationContext, get: getConversationContext } =
    createContext<ConversationContext>('conversation');

const { set: setConversationLabels, find: findConversationLabels } =
    createContext<() => ConversationLabels | undefined>('conversation-labels');

export {
    findConversationLabels,
    getConversationContext,
    setConversationContext,
    setConversationLabels
};
