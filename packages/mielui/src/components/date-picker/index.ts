import type { DatePicker as DatePickerPrimitive } from 'bits-ui';

export type DatePickerProps = Omit<DatePickerPrimitive.RootProps, 'child'>;

export type DatePickerContentProps = Omit<
    DatePickerPrimitive.ContentProps,
    'child' | 'forceMount'
> & {
    surface?: 'solid' | 'glass';
    portal?: boolean;
};

export {
    Cell,
    Day,
    Grid,
    GridBody,
    GridHead,
    GridRow,
    HeadCell,
    Header,
    Heading,
    Month,
    MonthSelect,
    NextButton,
    PrevButton,
    YearSelect
} from '../calendar';
export { default as Content } from '../date-picker/date-picker-content.svelte';
export { default as Label } from '../date-picker/date-picker-label.svelte';
export { default as Segment } from '../date-picker/date-picker-segment.svelte';
export { default as Root } from './date-picker.svelte';
export { default as Calendar } from './date-picker-calendar.svelte';
export { default as Input } from './date-picker-input.svelte';
export { default as Trigger } from './date-picker-trigger.svelte';
