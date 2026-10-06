<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as Group from '@mielui/svelte/components/group';

    let value = $state<DateValue | undefined>(new CalendarDate(2026, 9, 17));
    let open = $state(false);
</script>

<div class="flex w-full max-w-sm flex-col gap-3">
    <DatePicker.Root bind:value bind:open closeOnDateSelect={false} calendarLabel="Review date">
        <div class="grid gap-2">
            <DatePicker.Label>Review date</DatePicker.Label>
            <Group.Root aria-label="Review date controls" class="w-full">
                <DatePicker.Input name="review" />
                <Group.Separator />
                <DatePicker.Trigger />
            </Group.Root>
        </div>
        <DatePicker.Content align="end">
            <DatePicker.Calendar />
        </DatePicker.Content>
    </DatePicker.Root>
    <p class="text-sm text-foreground-muted">
        The calendar is {open ? 'open' : 'closed'} and stays open after you pick a date.
    </p>
</div>
