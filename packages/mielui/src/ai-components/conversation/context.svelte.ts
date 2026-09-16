import { createContext } from '@mielui/svelte/utils';
import type { createConversationFollow } from './follow.svelte';

export type ConversationContext = ReturnType<typeof createConversationFollow>;

const { set: setConversationContext, get: getConversationContext } =
    createContext<ConversationContext>('conversation');

export { getConversationContext, setConversationContext };
