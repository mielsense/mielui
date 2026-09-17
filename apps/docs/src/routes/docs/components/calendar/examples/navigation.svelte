<script lang="ts">
    import { CalendarDate } from '@internationalized/date';
    import * as Calendar from '@mielui/svelte/components/calendar';

    const years = Array.from({ length: 101 }, (_, index) => 1930 + index);
</script>

<Calendar.Root placeholder={new CalendarDate(1995, 6, 15)} calendarLabel="Date of birth">
    {#snippet children({ months, weekdays })}
        <Calendar.Header>
            <Calendar.MonthSelect />
            <Calendar.YearSelect {years} />
        </Calendar.Header>
        {#each months as month (month.value.toString())}
            <Calendar.Month {month} {weekdays} />
        {/each}
    {/snippet}
</Calendar.Root>
