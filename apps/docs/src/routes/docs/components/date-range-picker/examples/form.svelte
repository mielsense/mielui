<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import { Button } from '@mielui/svelte/components/button';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';

    let value = $state<{ start: DateValue | undefined; end: DateValue | undefined }>({
        start: undefined,
        end: undefined
    });
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
    <DateRangePicker.Root
        bind:value
        required
        {readonly}
        placeholder={new CalendarDate(2026, 9, 17)}
        minValue={new CalendarDate(2026, 9, 1)}
        maxValue={new CalendarDate(2026, 12, 31)}
    >
        <div class="grid gap-2">
            <DateRangePicker.Label>Travel dates</DateRangePicker.Label>
            <div class="flex flex-wrap items-center gap-2">
                <DateRangePicker.Input type="start" name="arrival" aria-label="Arrival" />
                <DateRangePicker.Input type="end" name="departure" aria-label="Departure" />
                <DateRangePicker.Trigger />
            </div>
        </div>
        <DateRangePicker.Content align="end"><DateRangePicker.Calendar /></DateRangePicker.Content>
    </DateRangePicker.Root>
    <p class="text-sm text-foreground-muted">
        Choose both dates between September and December 2026. Saving makes the field read-only.
    </p>
    <div class="flex gap-2">
        <Button type="submit" size="sm">Save dates</Button>
        <Button type="reset" variant="outline" size="sm">Reset</Button>
    </div>
    <p role="status" class="min-h-5 text-sm text-foreground-muted">
        {submitted || 'No date submitted.'}
    </p>
</form>
