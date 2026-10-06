import type { DateRangePicker as DatePickerPrimitive } from 'bits-ui';
import type { DatePickerLabels } from '../date-picker/context.svelte';

export type DateRangePickerLabels = DatePickerLabels;

export type DateRangePickerProps = Omit<DatePickerPrimitive.RootProps, 'child'> & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: DateRangePickerLabels;
};

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
