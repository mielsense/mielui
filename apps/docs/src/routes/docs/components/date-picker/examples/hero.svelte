<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';

    let value = $state<DateValue | undefined>(new CalendarDate(2026, 9, 17));
</script>

<div class="w-full max-w-sm">
    <DatePicker.Root bind:value calendarLabel="Publish date">
        <div class="grid gap-2">
            <DatePicker.Label>Publish date</DatePicker.Label>
            <div class="flex min-w-0 flex-wrap items-center gap-2">
                <DatePicker.Input name="publishDate" />
                <DatePicker.Trigger />
            </div>
            <p class="text-sm text-foreground-muted">
                Type a date or choose one from the calendar.
            </p>
        </div>
        <DatePicker.Content align="end">
            <DatePicker.Calendar />
        </DatePicker.Content>
    </DatePicker.Root>
</div>
