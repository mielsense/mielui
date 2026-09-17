<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { DateRangePicker as DatePickerPrimitive } from 'bits-ui';
    import Header from '../calendar/calendar-header.svelte';
    import Heading from '../calendar/calendar-heading.svelte';
    import NextButton from '../calendar/calendar-next-button.svelte';
    import PrevButton from '../calendar/calendar-prev-button.svelte';
    import { getDatePickerContext } from '../date-picker/context.svelte';
    import Month from '../range-calendar/range-calendar-month.svelte';

    let {
        class: className,
        children: content,
        ref = $bindable(null),
        ...rest
    }: Omit<DatePickerPrimitive.CalendarProps, 'child'> = $props();
    const context = getDatePickerContext();
</script>

<DatePickerPrimitive.Calendar
    {...rest}
    bind:ref
    data-ui="date-range-picker-calendar"
    class={cn(className, 'w-fit max-w-full space-y-3 p-3 text-foreground [--calendar-cell-size:calc(var(--spacing)*10)]')}
>
    {#snippet children(data)}
        {#if content}
            {@render content(data)}
        {:else}
            <Header>
                <PrevButton />
                <Heading />
                <NextButton />
            </Header>
            <div class="flex max-w-full flex-wrap justify-center gap-3">
                {#each data.months as month (month.value.toString())}
                    <Month
                        {month}
                        weekdays={data.weekdays}
                        locale={context.locale}
                        showHeading={data.months.length > 1}
                    />
                {/each}
            </div>
        {/if}
    {/snippet}
</DatePickerPrimitive.Calendar>
