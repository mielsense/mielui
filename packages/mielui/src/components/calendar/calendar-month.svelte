<script lang="ts">
    import { DateFormatter } from '@internationalized/date';
    import { cn } from '@mielui/svelte/utils';
    import Grid from '../calendar/calendar-grid.svelte';
    import GridBody from '../calendar/calendar-grid-body.svelte';
    import GridHead from '../calendar/calendar-grid-head.svelte';
    import GridRow from '../calendar/calendar-grid-row.svelte';
    import HeadCell from '../calendar/calendar-head-cell.svelte';
    import type { CalendarMonthProps } from '.';
    import Cell from './calendar-cell.svelte';
    import Day from './calendar-day.svelte';

    let {
        month,
        weekdays,
        locale = 'en-US',
        showHeading = false,
        day,
        class: className,
        ...rest
    }: CalendarMonthProps = $props();
    const title = $derived(
        new DateFormatter(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
            month.value.toDate('UTC')
        )
    );
</script>

<div
    {...rest}
    data-ui="calendar-month"
    class={cn(className, 'w-[calc(var(--calendar-cell-size)*7)] max-w-full shrink-0 space-y-2')}
>
    {#if showHeading}
        <div class="text-center text-sm font-medium">{title}</div>
    {/if}
    <Grid aria-label={title}>
        <GridHead>
            <GridRow>
                {#each weekdays as weekday, index (index)}
                    <HeadCell>{weekday}</HeadCell>
                {/each}
            </GridRow>
        </GridHead>
        <GridBody>
            {#each month.weeks as dates, index (index)}
                <GridRow>
                    {#each dates as date (date.toString())}
                        <Cell {date} month={month.value}>
                            {#if day}
                                <Day>{@render day(date)}</Day>
                            {:else}
                                <Day />
                            {/if}
                        </Cell>
                    {/each}
                </GridRow>
            {/each}
        </GridBody>
    </Grid>
</div>
