<script lang="ts">
    import { CalendarDate, isWeekend } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';
</script>

<Calendar.Root
    calendarLabel="Appointment date"
    placeholder={new CalendarDate(2026, 9, 17)}
    minValue={new CalendarDate(2026, 9, 17)}
    maxValue={new CalendarDate(2026, 9, 30)}
    isDateDisabled={(date) => isWeekend(date, 'en-US')}
/>
