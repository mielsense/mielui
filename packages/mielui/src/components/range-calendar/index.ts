import type { DateValue } from '@internationalized/date';
import type { DefaultProps } from '@mielui/svelte/utils';
import type { RangeCalendar as CalendarPrimitive, CalendarRootSnippetProps } from 'bits-ui';
import type { Snippet } from 'svelte';

export type RangeCalendarProps = Omit<CalendarPrimitive.RootProps, 'child'>;
export type RangeCalendarMonthProps = Omit<DefaultProps, 'children'> & {
    month: CalendarRootSnippetProps['months'][number];
    weekdays: string[];
    locale?: string;
    showHeading?: boolean;
    day?: Snippet<[date: DateValue]>;
};

export { default as Grid } from '../calendar/calendar-grid.svelte';
export { default as GridBody } from '../calendar/calendar-grid-body.svelte';
export { default as GridHead } from '../calendar/calendar-grid-head.svelte';
export { default as GridRow } from '../calendar/calendar-grid-row.svelte';
export { default as HeadCell } from '../calendar/calendar-head-cell.svelte';
export { default as Header } from '../calendar/calendar-header.svelte';
export { default as Heading } from '../calendar/calendar-heading.svelte';
export { default as MonthSelect } from '../calendar/calendar-month-select.svelte';
export { default as NextButton } from '../calendar/calendar-next-button.svelte';
export { default as PrevButton } from '../calendar/calendar-prev-button.svelte';
export { default as YearSelect } from '../calendar/calendar-year-select.svelte';
export { default as Root } from './range-calendar.svelte';
export { default as Cell } from './range-calendar-cell.svelte';
export { default as Day } from './range-calendar-day.svelte';
export { default as Month } from './range-calendar-month.svelte';
