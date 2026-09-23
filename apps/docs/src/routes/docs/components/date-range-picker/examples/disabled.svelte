<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';
</script>

<DateRangePicker.Root disabled placeholder={new CalendarDate(2026, 9, 17)}>
    <div class="grid w-full max-w-lg gap-2">
        <DateRangePicker.Label>Dates are locked</DateRangePicker.Label>
        <div class="flex flex-wrap items-center gap-2">
            <DateRangePicker.Input name="lockedStart" type="start" aria-label="Start date" />
            <DateRangePicker.Input name="lockedEnd" type="end" aria-label="End date" />
            <DateRangePicker.Trigger />
        </div>
    </div>
    <DateRangePicker.Content align="end"><DateRangePicker.Calendar /></DateRangePicker.Content>
</DateRangePicker.Root>
