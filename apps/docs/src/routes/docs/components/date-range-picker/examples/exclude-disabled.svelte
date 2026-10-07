<script lang="ts">
    import { CalendarDate, isWeekend } from '@internationalized/date';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';
</script>

<div class="w-full max-w-lg">
    <DateRangePicker.Root
        calendarLabel="Time off"
        placeholder={new CalendarDate(2026, 9, 1)}
        isDateDisabled={(date) => isWeekend(date, 'en-US')}
        excludeDisabled
    >
        <div class="grid gap-2">
            <DateRangePicker.Label>Time off</DateRangePicker.Label>
            <div class="flex flex-wrap items-center gap-2">
                <DateRangePicker.Input type="start" name="first" aria-label="First day" />
                <DateRangePicker.Input type="end" name="last" aria-label="Last day" />
                <DateRangePicker.Trigger />
            </div>
        </div>
        <DateRangePicker.Content align="end">
            <DateRangePicker.Calendar />
        </DateRangePicker.Content>
    </DateRangePicker.Root>
</div>
