<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapGridProps } from '.';
    import { weekColumns } from './calendar';
    import { getHeatmapContext } from './context';
    import HeatmapCell from './heatmap-cell.svelte';
    import { liveCalendar } from './live';

    let { children, class: className, ...rest }: HeatmapGridProps = $props();
    const context = getHeatmapContext();
</script>

<div
    use:liveCalendar={context.ready && context.animation === 'live'}
    role="group"
    aria-label={context.loading
        ? (context.labels?.gridLoading ?? 'Loading contributions')
        : context.empty
          ? (context.labels?.gridEmpty ?? 'No contributions available')
          : (context.labels?.grid ?? 'Daily contributions. Use arrow keys to explore dates.')}
    {...rest}
    data-ui="heatmap-grid"
    class={cn(className, 'col-start-2 row-start-2 grid grid-rows-7 gap-1')}
    style:grid-template-columns={weekColumns(context.model.weeks)}
>
    {#if children}
        {@render children(context.model.cells)}
    {:else}
        {#each context.model.cells as day (day.date)}
            <HeatmapCell {day} />
        {/each}
    {/if}
</div>
