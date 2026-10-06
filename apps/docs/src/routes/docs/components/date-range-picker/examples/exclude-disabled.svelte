<script lang="ts">
    import { CalendarDate, isWeekend } from '@internationalized/date';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';
    import * as Group from '@mielui/svelte/components/group';
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
            <Group.Root aria-label="Time off controls" class="w-full">
                <DateRangePicker.Input type="start" name="first" aria-label="First day" />
                <Group.Separator />
                <DateRangePicker.Input type="end" name="last" aria-label="Last day" />
                <Group.Separator />
                <DateRangePicker.Trigger />
            </Group.Root>
        </div>
        <DateRangePicker.Content align="end">
            <DateRangePicker.Calendar />
        </DateRangePicker.Content>
    </DateRangePicker.Root>
</div>
