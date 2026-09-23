import { untrack } from 'svelte';
import type { CommandItem, CommandState } from '.';
import { DEFAULT_COMMAND_SEARCH_THRESHOLD, searchCommandItems } from './search';

export function createCommandController(id: string) {
    const state = $state<CommandState>({
        id,
        items: [],
        results: [],
        searchContent: '',
        activeId: undefined,
        itemsVersion: 0
    });
    let threshold = $state(DEFAULT_COMMAND_SEARCH_THRESHOLD);
    let previousQuery = '';

    const registry = $derived(
        state.items.map((item) => ({
            item,
            name: item.name,
            disabled: item.disabled
        }))
    );

    function reconcile(items = state.items, search = state.searchContent, sensitivity = threshold) {
        const query = search.trim();
        const results = searchCommandItems(items, query, sensitivity);
        const enabled = results.filter((item) => !item.disabled);
        const queryChanged = query !== previousQuery;
        previousQuery = query;
        state.results = results;
        if (queryChanged || !enabled.some((item) => item.id === state.activeId)) {
            state.activeId = enabled[0]?.id;
        }
    }

    $effect(() => {
        const items = registry.map((entry) => entry.item);
        const query = state.searchContent;
        const sensitivity = threshold;
        untrack(() => {
            reconcile(items, query, sensitivity);
        });
    });

    const controller = {
        state,
        get threshold() {
            return threshold;
        },
        set threshold(value: number) {
            threshold = value;
        },
        reconcile,
        register(item: CommandItem) {
            state.items.push(item);
            state.itemsVersion += 1;
            return () => {
                state.items = state.items.filter((candidate) => candidate.id !== item.id);
                state.itemsVersion += 1;
            };
        }
    };
    return controller;
}
