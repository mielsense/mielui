<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';

    let value = $state<{
        start: DateValue | undefined;
        end: DateValue | undefined;
    }>({
        start: undefined,
        end: undefined
    });
</script>

<div class="flex max-w-full flex-col gap-3">
    <RangeCalendar.Root
        bind:value
        calendarLabel="Booking dates"
        placeholder={new CalendarDate(2026, 9, 17)}
        numberOfMonths={2}
        pagedNavigation
    />
    <p aria-live="polite" class="px-3 text-sm text-foreground-muted">
        {#if value.start && value.end}
            {value.start.toString()} —{value.end.toString()}
        {:else if value.start}
            Start:{value.start.toString()}
            . Choose an end date.
        {:else}
            Choose a start and end date, across any month.
        {/if}
    </p>
</div>
