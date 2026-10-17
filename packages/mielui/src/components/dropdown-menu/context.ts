import { createContext } from '@mielui/svelte/utils';

export type DropdownMenuContext = {
    beforeOpen?: () => void;
};

const { set: setDropdownMenuContext, get: getDropdownMenuContext } =
    createContext<DropdownMenuContext>('dropdown-menu');

export { getDropdownMenuContext, setDropdownMenuContext };
