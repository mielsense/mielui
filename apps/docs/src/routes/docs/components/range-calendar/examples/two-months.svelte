<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';
</script>

<RangeCalendar.Root
    calendarLabel="Booking dates"
    placeholder={new CalendarDate(2026, 9, 17)}
    numberOfMonths={2}
    pagedNavigation
    minDays={3}
    maxDays={14}
/>
