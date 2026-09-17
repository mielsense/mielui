import type { DateValue } from '@internationalized/date';
import { createContext } from '@mielui/svelte/utils';

type DatePickerStyleContext = {
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
