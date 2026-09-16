<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    import { calendar, type Day, type Cell } from './calendar';
    import { provide } from './context.svelte';
    import Header from './heatmap-header.svelte';
    import Summary from './heatmap-summary.svelte';
    import Calendar from './heatmap-calendar.svelte';
    import MonthLabels from './heatmap-month-labels.svelte';
    import WeekdayLabels from './heatmap-weekday-labels.svelte';
    import Grid from './heatmap-grid.svelte';
    import Detail from './heatmap-detail.svelte';
    import Legend from './heatmap-legend.svelte';
    import Footer from './heatmap-footer.svelte';

    type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        days: readonly Day[];
        weeks?: number;
        animation?: 'rows' | 'columns' | 'none';
        endDate?: string;
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        locale?: string;
        onDaySelect?: (day: Cell) => void;
        children?: Snippet<[{ days: readonly Cell[]; total: number }]>;
    };
    let {
        days,
        weeks = 26,
        animation = 'rows',
        endDate,
        weekStartsOn = 0,
        locale = 'en-US',
        onDaySelect,
        children,
        class: className,
        ...props
    }: Props = $props();
    const model = $derived(calendar(days, weeks, endDate, weekStartsOn, locale));
    let activeDate = $state('');
    let focusedDate = $state('');
    const active = $derived(
        model.cells.find((day) => day.date === activeDate) ?? model.cells.at(-1)
    );
    provide({
        get animation() {
            return animation;
        },
        get model() {
            return model;
        },
        get active() {
            return active;
        },
        get focused() {
            return model.cells.some((day) => day.date === focusedDate)
                ? focusedDate
                : (model.cells.at(-1)?.date ?? '');
        },
        get locale() {
            return locale;
        },
        activate(date) {
            activeDate = date;
        },
        focus(date) {
            focusedDate = date;
            activeDate = date;
        },
        select(day) {
            activeDate = day.date;
            onDaySelect?.(day);
        }
    });
</script>

<div {...props} data-ui="heatmap" class={cn(className, 'flex w-full min-w-0 flex-col gap-4')}>
    {#if children}
        {@render children({ days: model.cells, total: model.total })}
    {:else}
        <Header><Summary /></Header>
        <Calendar>
            <MonthLabels />
            <WeekdayLabels />
            <Grid />
        </Calendar>
        <Footer>
            <Detail />
            <Legend />
        </Footer>
    {/if}
</div>
