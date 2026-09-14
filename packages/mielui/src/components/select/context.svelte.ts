import { createContext } from '@mielui/svelte/utils';
import type { SelectState } from '.';

export type SelectContext = {
    id: string;
    state: SelectState;
    /** Plain registries — never put these inside $state. */
    labels: Map<string, string>;
    values: Set<string>;
};

const { set: setSelectContext, get: getSelectContext } = createContext<SelectContext>('select');

export { getSelectContext, setSelectContext };
