<script lang="ts">
    import { cn, type WithElement } from '@mielui/svelte/utils';
    import { DatePicker as DatePickerPrimitive } from 'bits-ui';
    import Header from '../calendar/calendar-header.svelte';
    import Heading from '../calendar/calendar-heading.svelte';
    import Month from '../calendar/calendar-month.svelte';
    import NextButton from '../calendar/calendar-next-button.svelte';
    import PrevButton from '../calendar/calendar-prev-button.svelte';
    import { getDatePickerContext } from './context';
    import { dateCalendarClasses } from './variants';

    let {
        class: className,
        children: content,
        element = $bindable(null),
        ...rest
    }: WithElement<Omit<DatePickerPrimitive.CalendarProps, 'child'>> = $props();
    const context = getDatePickerContext();
</script>

<DatePickerPrimitive.Calendar
    {...rest}
    bind:ref={element}
    data-ui="date-picker-calendar"
    class={cn(className, dateCalendarClasses)}
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
