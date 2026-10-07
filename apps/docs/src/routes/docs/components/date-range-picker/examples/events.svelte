<script lang="ts">
    import type { DateValue } from '@internationalized/date';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';

    let value = $state<{
        start: DateValue | undefined;
        end: DateValue | undefined;
    }>({
        start: undefined,
        end: undefined
    });
    let start = $state('not picked');
    let end = $state('not picked');
</script>

<div class="flex w-full max-w-lg flex-col gap-3">
    <DateRangePicker.Root
        bind:value
        calendarLabel="Report period"
        closeOnRangeSelect={false}
        onStartValueChange={(date) => {
            start = date?.toString() ?? 'not picked';
        }}
        onEndValueChange={(date) => {
            end = date?.toString() ?? 'not picked';
        }}
    >
        <div class="grid gap-2">
            <DateRangePicker.Label>Report period</DateRangePicker.Label>
            <div class="flex flex-wrap items-center gap-2">
                <DateRangePicker.Input type="start" name="from" aria-label="From" />
                <DateRangePicker.Input type="end" name="to" aria-label="To" />
                <DateRangePicker.Trigger />
            </div>
        </div>
        <DateRangePicker.Content align="end">
            <DateRangePicker.Calendar />
        </DateRangePicker.Content>
    </DateRangePicker.Root>
    <p class="text-sm text-foreground-muted">From {start}. To {end}.</p>
</div>
