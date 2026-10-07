<script lang="ts">
    import { CalendarDate, type DateValue, isWeekend } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as Group from '@mielui/svelte/components/group';

    let value = $state<DateValue | undefined>();
</script>

<div class="w-full max-w-sm">
    <DatePicker.Root
        bind:value
        calendarLabel="Delivery date"
        placeholder={new CalendarDate(2026, 9, 17)}
        isDateDisabled={(date) => isWeekend(date, 'en-US')}
        numberOfMonths={2}
        pagedNavigation
        weekdayFormat="narrow"
        preventDeselect
    >
        <div class="grid gap-2">
            <DatePicker.Label>Delivery date</DatePicker.Label>
            <Group.Root aria-label="Delivery date controls" class="w-full">
                <DatePicker.Input name="delivery" />
                <Group.Separator />
                <DatePicker.Trigger />
            </Group.Root>
        </div>
        <DatePicker.Content align="end">
            <DatePicker.Calendar />
        </DatePicker.Content>
    </DatePicker.Root>
</div>
