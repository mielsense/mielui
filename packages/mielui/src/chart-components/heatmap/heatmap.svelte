<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    import { type Cell, calendar, type Day } from './calendar';
    import { provide } from './context.svelte';
    import Calendar from './heatmap-calendar.svelte';
    import Detail from './heatmap-detail.svelte';
    import Footer from './heatmap-footer.svelte';
    import Grid from './heatmap-grid.svelte';
    import Header from './heatmap-header.svelte';
    import Legend from './heatmap-legend.svelte';
    import MonthLabels from './heatmap-month-labels.svelte';
    import Summary from './heatmap-summary.svelte';
    import Tooltip from './heatmap-tooltip.svelte';
    import WeekdayLabels from './heatmap-weekday-labels.svelte';

    type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        days: readonly Day[];
        weeks?: number;
        loading?: boolean;
        animation?: 'rows' | 'columns' | 'live' | 'none';
        endDate?: string;
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        locale?: string;
        onDaySelect?: (day: Cell) => void;
        children?: Snippet<[{ days: readonly Cell[]; total: number }]>;
    };
    let {
        days,
        weeks = 26,
        loading = false,
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
    const empty = $derived(days.length === 0);
    const ready = $derived(!loading && !empty);
    let tooltipCount = $state(0);
    let hoveredElement = $state<HTMLButtonElement>();
    let focusedElement = $state<HTMLButtonElement>();
    let activeDate = $state('');
    let focusedDate = $state('');
    const active = $derived(
        model.cells.find((day) => day.date === activeDate) ?? model.cells.at(-1)
    );
    provide({
        get loading() {
            return loading;
        },
        get empty() {
            return empty;
        },
        get ready() {
            return ready;
        },
        get tooltipCount() {
            return tooltipCount;
        },
        set tooltipCount(value) {
            tooltipCount = value;
        },
        get hoveredElement() {
            return ready && hoveredElement?.isConnected ? hoveredElement : undefined;
        },
        set hoveredElement(value) {
            hoveredElement = value;
        },
        get focusedElement() {
            return ready && focusedElement?.isConnected ? focusedElement : undefined;
        },
        set focusedElement(value) {
            focusedElement = value;
        },
        get animation() {
            return animation;
        },
        get model() {
            return model;
        },
        get active() {
            return ready ? active : undefined;
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
            if (!ready) {
                return;
            }
            activeDate = date;
        },
        focus(date) {
            if (!ready) {
                return;
            }
            focusedDate = date;
            activeDate = date;
        },
        select(day) {
            if (!ready) {
                return;
            }
            activeDate = day.date;
            onDaySelect?.(day);
        }
    });
</script>

<div
    {...props}
    aria-busy={loading}
    data-state={loading ? 'loading' : empty ? 'empty' : 'ready'}
    data-ui="heatmap"
    class={cn(className, 'flex w-full min-w-0 flex-col gap-4')}
>
    {#if children}
        {@render children({ days: model.cells, total: model.total })}
    {:else}
        <Header><Summary /></Header>
        <Calendar>
            <MonthLabels />
            <WeekdayLabels />
            <Grid />
        </Calendar>
        <Tooltip />
        <Footer>
            <Detail />
            <Legend />
        </Footer>
    {/if}
</div>
