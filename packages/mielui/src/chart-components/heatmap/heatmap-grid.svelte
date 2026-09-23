<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    import type { Cell } from './calendar';
    import { useHeatmap } from './context.svelte';
    import HeatmapCell from './heatmap-cell.svelte';
    import { liveCalendar } from './live';

    let {
        children,
        class: className,
        ...props
    }: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        children?: Snippet<[readonly Cell[]]>;
    } = $props();
    const context = useHeatmap();
</script>
<div
    use:liveCalendar={context.ready && context.animation === 'live'}
    role="group"
    aria-label={context.loading ? 'Loading contributions' : context.empty ? 'No contributions available' : 'Daily contributions. Use arrow keys to explore dates.'}
    {...props}
    data-ui="heatmap-grid"
    class={cn(className, 'col-start-2 row-start-2 grid grid-rows-7 gap-1')}
    style:grid-template-columns={`repeat(${context.model.weeks}, minmax(10px, 1fr))`}
>
    {#if children}
        {@render children(context.model.cells)}
    {:else}
        {#each context.model.cells as day (day.date)}
            <HeatmapCell {day} />
        {/each}
    {/if}
</div>
