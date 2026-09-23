import type { DateRangePicker as DatePickerPrimitive } from 'bits-ui';

export type DateRangePickerProps = Omit<DatePickerPrimitive.RootProps, 'child'>;

export { default as Content } from '../date-picker/date-picker-content.svelte';
export { default as Segment } from '../date-picker/date-picker-segment.svelte';
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
} from '../range-calendar';
export { default as Root } from './date-range-picker.svelte';
export { default as Calendar } from './date-range-picker-calendar.svelte';
export { default as Input } from './date-range-picker-input.svelte';
export { default as Label } from './date-range-picker-label.svelte';
export { default as Trigger } from './date-range-picker-trigger.svelte';
