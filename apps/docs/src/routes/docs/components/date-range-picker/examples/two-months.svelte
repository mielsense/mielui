<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';
</script>

<DateRangePicker.Root
    numberOfMonths={2}
    pagedNavigation
    minDays={3}
    maxDays={14}
    placeholder={new CalendarDate(2026, 9, 17)}
>
    <div class="grid w-full max-w-lg gap-2">
        <DateRangePicker.Label>Booking dates</DateRangePicker.Label>
        <div class="flex flex-wrap items-center gap-2">
            <DateRangePicker.Input type="start" name="arrival" aria-label="Arrival" />
            <DateRangePicker.Input type="end" name="departure" aria-label="Departure" />
            <DateRangePicker.Trigger />
        </div>
    </div>
    <DateRangePicker.Content align="end"><DateRangePicker.Calendar /></DateRangePicker.Content>
</DateRangePicker.Root>
