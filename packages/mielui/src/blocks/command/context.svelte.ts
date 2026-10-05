import { createContext } from '@mielui/svelte/utils';
import type { CommandState } from '.';
import type { createCommandController } from './controller.svelte';

const { set: setCommandContext, get: getCommandContext } =
    createContext<ReturnType<typeof createCommandController>>('command');

export { getCommandContext, setCommandContext };

/** Items eligible for keyboard navigation, in rendered order: the active result set minus disabled rows. */
export function getCommandResults(state: CommandState) {
    if (state.searchContent.trim() === '') {
        return state.items.filter((item) => !item.disabled);
    }
    const matches = new Set(state.results.map((item) => item.id));
    return state.items.filter((item) => !item.disabled && matches.has(item.id));
}

export function resetCommand(state: CommandState) {
    state.searchContent = '';
    state.results = [...state.items];
    state.activeId = getCommandResults(state)[0]?.id;
}
