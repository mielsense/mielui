import { createContext } from '@mielui/svelte/utils';
import type { SelectState } from '.';

export type SelectContext = {
    id: string;
    onTriggerOpen?: () => void;
    readonly open: boolean;
    setOpen: (open: boolean) => void;
    state: SelectState;
    labels: Map<string, string>;
    values: Set<string>;
};

const { set: setSelectContext, get: getSelectContext } = createContext<SelectContext>('select');

export { getSelectContext, setSelectContext };
