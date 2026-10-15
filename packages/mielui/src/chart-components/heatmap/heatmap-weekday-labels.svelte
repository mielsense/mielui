<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapWeekdayLabelsProps } from '.';
    import { getHeatmapContext } from './context.svelte';

    let { children, class: className, ...props }: HeatmapWeekdayLabelsProps = $props();
    const context = getHeatmapContext();
</script>

<div
    {...props}
    aria-hidden="true"
    data-ui="heatmap-weekday-labels"
    class={cn(
        className,
        'col-start-1 row-start-2 grid grid-rows-7 gap-1 text-xs text-foreground-muted'
    )}
>
    {#if children}
        {@render children()}
    {:else}
        {#each context.model.weekdays as label, row}
            <span class="flex items-center leading-none" style:grid-row={row + 1}>
                {row % 2 === 1 ? label : ''}
            </span>
        {/each}
    {/if}
</div>
