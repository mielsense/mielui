<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as Group from '@mielui/svelte/components/group';

    let value = $state<DateValue | undefined>(new CalendarDate(2026, 9, 17));
</script>

<div class="w-full max-w-sm">
    <DatePicker.Root bind:value calendarLabel="Publish date">
        <div class="grid gap-2">
            <DatePicker.Label>Publish date</DatePicker.Label>
            <Group.Root aria-label="Publish date controls" class="w-full">
                <DatePicker.Input name="publishDate" />
                <Group.Separator />
                <DatePicker.Trigger />
            </Group.Root>
            <p class="text-sm text-foreground-muted">
                Type a date or choose one from the calendar.
            </p>
        </div>
        <DatePicker.Content align="end">
            <DatePicker.Calendar />
        </DatePicker.Content>
    </DatePicker.Root>
</div>
