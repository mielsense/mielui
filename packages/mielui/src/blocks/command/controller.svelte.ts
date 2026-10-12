import { untrack } from 'svelte';
import type { CommandItem, CommandState } from '.';
import { DEFAULT_COMMAND_SEARCH_THRESHOLD, searchCommandItems } from './search';

export function createCommandController(id: string) {
    const state: CommandState = $state({
        id,
        items: [],
        get results(): CommandItem[] {
            return results;
        },
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

    const results: CommandItem[] = $derived(
        searchCommandItems(
            registry.map((entry) => entry.item),
            state.searchContent.trim(),
            threshold
        )
    );

    function reconcile(matches = results) {
        const query = state.searchContent.trim();
        const enabled = matches.filter((item) => !item.disabled);
        const queryChanged = query !== previousQuery;
        previousQuery = query;
        if (queryChanged || !enabled.some((item) => item.id === state.activeId)) {
            state.activeId = enabled[0]?.id;
        }
    }

    $effect(() => {
        const matches = results;
        untrack(() => {
            reconcile(matches);
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
            return () => {
                state.items = state.items.filter((candidate) => candidate.id !== item.id);
            };
        }
    };
    return controller;
}
