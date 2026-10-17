import { createContext } from '@mielui/svelte/utils';
import type { ToggleGroupSize } from '.';

type ToggleGroupContext = {
    readonly disabled: boolean;
    readonly size: ToggleGroupSize;
    readonly type: 'single' | 'multiple';
    isActive: (value: string) => boolean;
    setValue: (value: string) => void;
};

const { set: setToggleGroupContext, get: getToggleGroupContext } =
    createContext<ToggleGroupContext>('toggle-group');

export { getToggleGroupContext, setToggleGroupContext };
