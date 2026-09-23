<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Calendar as CalendarPrimitive } from 'bits-ui';
    import Header from '../calendar/calendar-header.svelte';
    import Heading from '../calendar/calendar-heading.svelte';
    import NextButton from '../calendar/calendar-next-button.svelte';
    import PrevButton from '../calendar/calendar-prev-button.svelte';
    import type { CalendarProps } from '.';
    import Month from './calendar-month.svelte';

    let {
        value = $bindable(),
        placeholder = $bindable(),
        ref = $bindable(null),
        class: className,
        children: content,
        fixedWeeks = true,
        weekdayFormat = 'short',
        locale = 'en-US',
        ...rest
    }: CalendarProps = $props();
</script>

<CalendarPrimitive.Root
    {...rest}
    type="single"
    bind:value
    bind:placeholder
    bind:ref
    {fixedWeeks}
    {weekdayFormat}
    {locale}
    data-ui="calendar"
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
                        {locale}
                        showHeading={data.months.length > 1}
                    />
                {/each}
            </div>
        {/if}
    {/snippet}
</CalendarPrimitive.Root>
