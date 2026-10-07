<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';

    const booked = [8, 9, 15, 22];

    function isBooked(date: DateValue) {
        return date.month === 9 && booked.includes(date.day);
    }
</script>

<Calendar.Root
    calendarLabel="Room booking"
    placeholder={new CalendarDate(2026, 9, 1)}
    isDateUnavailable={isBooked}
    monthFormat="short"
    yearFormat="2-digit"
/>
