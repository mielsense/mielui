import { createContext } from '@mielui/svelte/utils';
import type { RadioGroupContext } from '.';

const { set: setRadioGroupContext, get: getRadioGroupContext } =
    createContext<RadioGroupContext>('radio-group');

export { getRadioGroupContext, setRadioGroupContext };
