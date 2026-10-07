<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';
</script>

<DateRangePicker.Root minDays={3} maxDays={14} placeholder={new CalendarDate(2026, 9, 17)}>
    <div class="grid w-full max-w-lg gap-2">
        <DateRangePicker.Label>Stay</DateRangePicker.Label>
        <div class="flex flex-wrap items-center gap-2">
            <DateRangePicker.Input type="start" name="checkIn" aria-label="Check in" />
            <DateRangePicker.Input type="end" name="checkOut" aria-label="Check out" />
            <DateRangePicker.Trigger />
        </div>
        <p class="text-sm text-foreground-muted">Stays run from 3 to 14 days.</p>
    </div>
    <DateRangePicker.Content align="end"><DateRangePicker.Calendar /></DateRangePicker.Content>
</DateRangePicker.Root>
