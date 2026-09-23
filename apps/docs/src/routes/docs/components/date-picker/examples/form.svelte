<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import { Button } from '@mielui/svelte/components/button';
    import * as DatePicker from '@mielui/svelte/components/date-picker';

    let value = $state<DateValue | undefined>();
    let submitted = $state('');
    let readonly = $state(false);
</script>

<form
    class="grid w-full max-w-lg gap-3"
    onsubmit={(event) => {
        event.preventDefault();
        submitted = Array.from(new FormData(event.currentTarget).entries()).map(([name, entry]) => `${name}=${entry}`).join(', ');
        readonly = true;
    }}
    onreset={() => {
        submitted = '';
        readonly = false;
    }}
>
    <DatePicker.Root
        bind:value
        required
        {readonly}
        placeholder={new CalendarDate(2026, 9, 17)}
        minValue={new CalendarDate(2026, 9, 1)}
        maxValue={new CalendarDate(2026, 12, 31)}
    >
        <div class="grid gap-2">
            <DatePicker.Label>Appointment date</DatePicker.Label>
            <div class="flex flex-wrap items-center gap-2">
                <DatePicker.Input name="appointment" />
                <DatePicker.Trigger />
            </div>
        </div>
        <DatePicker.Content align="end"><DatePicker.Calendar /></DatePicker.Content>
    </DatePicker.Root>
    <p class="text-sm text-foreground-muted">
        Choose a date between September and December 2026. Saving makes the field read-only.
    </p>
    <div class="flex gap-2">
        <Button type="submit" size="sm">Save date</Button>
        <Button type="reset" variant="outline" size="sm">Reset</Button>
    </div>
    <p role="status" class="min-h-5 text-sm text-foreground-muted">
        {submitted || 'No date submitted.'}
    </p>
</form>
