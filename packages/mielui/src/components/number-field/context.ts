import { createContext } from '@mielui/svelte/utils';

type NumberFieldContext = {
    readonly id: string;
    readonly value: number | undefined;
    readonly initialValue: number | undefined;
    readonly min: number | undefined;
    readonly max: number | undefined;
    readonly step: number;
    readonly name: string | undefined;
    readonly form: string | undefined;
    readonly disabled: boolean;
    readonly readonly: boolean;
    readonly required: boolean;
    input: HTMLInputElement | undefined;
    inputDisabled: boolean;
    inputReadonly: boolean;
    setValue: (value: number | undefined) => void;
    change: (direction: 1 | -1) => void;
};
const context = createContext<NumberFieldContext>('number-field');
export const getNumberFieldContext = context.get;
export const setNumberFieldContext = context.set;
