import { resolve } from '$app/paths';
import type { SearchIndex } from './types';

/** The section and prop index, fetched once on first use and retried after a failure. */
export function createSearchIndex() {
    let index = $state<SearchIndex>();
    let requested = false;

    async function load() {
        if (requested) {
            return;
        }
        requested = true;
        try {
            const response = await fetch(resolve('/api/search-index.json'));
            if (response.ok) {
                index = await response.json();
            }
        } catch {
            requested = false;
        }
    }

    return {
        get current() {
            return index;
        },
        load
    };
}
