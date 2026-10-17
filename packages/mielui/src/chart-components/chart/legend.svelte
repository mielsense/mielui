<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ChartLegendProps } from '.';
    import { getChartContext } from './context';

    let { class: className, children }: ChartLegendProps = $props();
    const chart = getChartContext();
</script>

<div
    data-ui="chart-legend"
    class={cn(
        className,
        'flex flex-wrap items-center gap-x-5 gap-y-2 py-3 text-xs text-foreground-muted'
    )}
>
    {#each chart.keys as key (key)}
        {#if children}
            {@render children({
                key,
                label: chart.config[key].label,
                color: chart.color(key)
            })}
        {:else}
            <span class="inline-flex items-center gap-2">
                <span class="size-2 rounded-full" style:background={chart.color(key)}></span>
                {chart.config[key].label}
            </span>
        {/if}
    {/each}
</div>
