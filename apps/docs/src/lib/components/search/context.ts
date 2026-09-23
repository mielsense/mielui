import { createContext } from 'svelte';

type SearchController = {
    open: boolean;
};

export const [getSearch, setSearch] = createContext<SearchController>();
