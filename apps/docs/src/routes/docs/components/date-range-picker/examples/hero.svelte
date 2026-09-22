<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';
    import * as Group from '@mielui/svelte/components/group';

    let value = $state<{
        start: DateValue | undefined;
        end: DateValue | undefined;
    }>({
        start: new CalendarDate(2026, 9, 17),
        end: new CalendarDate(2026, 9, 23)
    });
</script>

<div class="w-full max-w-lg">
    <DateRangePicker.Root bind:value calendarLabel="Travel dates">
        <div class="grid gap-2">
            <DateRangePicker.Label>Travel dates</DateRangePicker.Label>
            <Group.Root aria-label="Travel date controls" class="w-full">
                <DateRangePicker.Input type="start" name="startDate" aria-label="Start date" />
                <Group.Separator />
                <DateRangePicker.Input type="end" name="endDate" aria-label="End date" />
                <Group.Separator />
                <DateRangePicker.Trigger />
            </Group.Root>
            <p class="text-sm text-foreground-muted">
                Choose a start and end date, or edit each field.
            </p>
        </div>
        <DateRangePicker.Content align="end">
            <DateRangePicker.Calendar />
        </DateRangePicker.Content>
    </DateRangePicker.Root>
</div>
