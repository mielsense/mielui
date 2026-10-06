<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as Group from '@mielui/svelte/components/group';

    let value = $state<DateValue | undefined>(new CalendarDate(2026, 9, 14));
    let error = $state('');
</script>

<div class="w-full max-w-sm">
    <DatePicker.Root
        bind:value
        calendarLabel="Launch date"
        validate={(date) => (date.day === 13 ? 'We never launch on the 13th.' : undefined)}
        onInvalid={(_reason, message) => {
            error = Array.isArray(message) ? message.join(' ') : (message ?? '');
        }}
        onValueChange={() => {
            error = '';
        }}
    >
        <div class="grid gap-2">
            <DatePicker.Label>Launch date</DatePicker.Label>
            <Group.Root aria-label="Launch date controls" class="w-full">
                <DatePicker.Input name="launch" />
                <Group.Separator />
                <DatePicker.Trigger />
            </Group.Root>
            <p class="min-h-5 text-sm text-[var(--mielui-error-text)]">{error}</p>
        </div>
        <DatePicker.Content align="end">
            <DatePicker.Calendar />
        </DatePicker.Content>
    </DatePicker.Root>
</div>
