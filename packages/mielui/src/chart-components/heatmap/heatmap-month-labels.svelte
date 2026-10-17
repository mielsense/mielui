<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapMonthLabelsProps } from '.';
    import { weekColumns } from './calendar';
    import { getHeatmapContext } from './context';

    let { children, class: className, ...rest }: HeatmapMonthLabelsProps = $props();
    const context = getHeatmapContext();
</script>

<div
    {...rest}
    aria-hidden="true"
    data-ui="heatmap-month-labels"
    class={cn(className, 'col-start-2 row-start-1 grid gap-1 text-xs text-foreground-muted')}
    style:grid-template-columns={weekColumns(context.model.weeks)}
>
    {#if children}
        {@render children()}
    {:else}
        {#each context.model.months as month (month.column)}
            <span class="overflow-visible whitespace-nowrap" style:grid-column={month.column}>
                {month.label}
            </span>
        {/each}
    {/if}
</div>
