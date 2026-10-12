import { createContext } from '@mielui/svelte/utils';
import type { ToggleGroupContext } from '.';

const { set: setToggleGroupContext, get: getToggleGroupContext } =
    createContext<ToggleGroupContext>('toggle-group');

export { getToggleGroupContext, setToggleGroupContext };
