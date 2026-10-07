<script lang="ts">
    import { CalendarDate, isWeekend } from '@internationalized/date';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';
</script>

<RangeCalendar.Root
    calendarLabel="Workdays only"
    placeholder={new CalendarDate(2026, 9, 1)}
    isDateDisabled={(date) => isWeekend(date, 'en-US')}
    excludeDisabled
/>
