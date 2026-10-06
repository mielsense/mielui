<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';
</script>

<Calendar.Root
    calendarLabel="Sprint start"
    placeholder={new CalendarDate(2026, 2, 10)}
    numberOfMonths={2}
    pagedNavigation
    weekStartsOn={1}
    weekdayFormat="narrow"
    fixedWeeks={false}
    disableDaysOutsideMonth
/>
