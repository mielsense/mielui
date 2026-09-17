<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
</script>

<DatePicker.Root disabled placeholder={new CalendarDate(2026, 9, 17)}>
    <div class="grid w-full max-w-lg gap-2">
        <DatePicker.Label>Dates are locked</DatePicker.Label>
        <div class="flex flex-wrap items-center gap-2">
            <DatePicker.Input name="lockedDate" />
            <DatePicker.Trigger />
        </div>
    </div>
    <DatePicker.Content align="end"><DatePicker.Calendar /></DatePicker.Content>
</DatePicker.Root>
