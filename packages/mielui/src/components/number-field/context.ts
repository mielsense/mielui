import { createContext } from '@mielui/svelte/utils';
import type { NumberFieldLabels } from '.';

export type NumberFieldContext = {
    readonly id: string;
    readonly labels: NumberFieldLabels | undefined;
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
const { set: setNumberFieldContext, get: getNumberFieldContext } =
    createContext<NumberFieldContext>('number-field');

export { getNumberFieldContext, setNumberFieldContext };
