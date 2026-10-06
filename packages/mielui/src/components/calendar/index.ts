import type { DateValue } from '@internationalized/date';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { Calendar as CalendarPrimitive, CalendarRootSnippetProps } from 'bits-ui';
import type { Snippet } from 'svelte';

export type CalendarProps = Omit<
    Extract<CalendarPrimitive.RootProps, { type: 'single' }>,
    'type' | 'child'
>;
export type CalendarMonthProps = Omit<DefaultProps, 'children'> & {
    /** Month data from the Root snippet. */
    month: CalendarRootSnippetProps['months'][number];
    /** Weekday names from the Root snippet. */
    weekdays: string[];
    /** BCP 47 locale used for names and number formats. */
    locale?: string;
    /** Shows the month name above the grid, for layouts with several months. */
    showHeading?: boolean;
    /** Custom content for each day cell. */
    day?: Snippet<[date: DateValue]>;
};

export { default as NextButton } from '../calendar/calendar-next-button.svelte';
export { default as PrevButton } from '../calendar/calendar-prev-button.svelte';
export { default as Root } from './calendar.svelte';
export { default as Cell } from './calendar-cell.svelte';
export { default as Day } from './calendar-day.svelte';
export { default as Grid } from './calendar-grid.svelte';
export { default as GridBody } from './calendar-grid-body.svelte';
export { default as GridHead } from './calendar-grid-head.svelte';
export { default as GridRow } from './calendar-grid-row.svelte';
export { default as HeadCell } from './calendar-head-cell.svelte';
export { default as Header } from './calendar-header.svelte';
export { default as Heading } from './calendar-heading.svelte';
export { default as Month } from './calendar-month.svelte';
export { default as MonthSelect } from './calendar-month-select.svelte';
export { default as YearSelect } from './calendar-year-select.svelte';
