import type { DateValue } from '@internationalized/date';
import { createContext } from '@mielui/svelte/utils';

export type DatePickerLabels = {
    trigger?: string;
    content?: string;
    invalid?: string;
};

type DatePickerStyleContext = {
    readonly labels: Required<DatePickerLabels>;
    readonly locale: string;
    readonly disabled: boolean;
    readonly readonly: boolean;
    readonly required: boolean;
    getValue: (type?: 'start' | 'end') => DateValue | undefined;
    reset: () => void;
};

const { set: setDatePickerContext, get: getDatePickerContext } =
    createContext<DatePickerStyleContext>('date-picker-style');

export { getDatePickerContext, setDatePickerContext };
