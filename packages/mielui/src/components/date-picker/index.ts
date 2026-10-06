import type { DatePicker as DatePickerPrimitive } from 'bits-ui';

import type { DatePickerLabels } from './context.svelte';

export type { DatePickerLabels };

export type DatePickerProps = Omit<DatePickerPrimitive.RootProps, 'child'> & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: DatePickerLabels;
};

export type DatePickerContentProps = Omit<
    DatePickerPrimitive.ContentProps,
    'child' | 'forceMount'
> & {
    /** Surface treatment. Omit it to inherit `--mielui-surface` from the theme. */
    surface?: 'solid' | 'glass';
    /**
     * Moves the panel to the end of the document so ancestors cannot clip it. Set false to render
     * it in place.
     */
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
