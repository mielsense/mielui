<script lang="ts">
    import { CalendarDate, type DateValue } from '@internationalized/date';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';

    const start = new CalendarDate(2026, 9, 1);
    const end = new CalendarDate(2026, 9, 30);
    let value = $state<{ start: DateValue | undefined; end: DateValue | undefined }>({
        start: undefined,
        end: undefined
    });
</script>

<RangeCalendar.Root
    bind:value
    placeholder={start}
    minValue={start}
    maxValue={end}
    minDays={2}
    maxDays={7}
    calendarLabel="September booking, two to seven days"
>
    {#snippet children({ months, weekdays })}
        <RangeCalendar.Header>
            <RangeCalendar.Heading />
        </RangeCalendar.Header>
        {#each months as month (month.value.toString())}
            <RangeCalendar.Month {month} {weekdays} />
        {/each}
    {/snippet}
</RangeCalendar.Root>
