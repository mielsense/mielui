<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getChartContext } from 'layerchart';
    import { getChart } from './context.svelte';
    import { numericTicks } from './ticks';

    let { class: className, ticks = 5 }: { class?: string; ticks?: number } = $props();
    const layer = getChartContext();
    const chart = getChart();
    const count = $derived(
        Number.isFinite(ticks) ? Math.max(2, Math.min(12, Math.floor(ticks))) : 5
    );
    const values = $derived(numericTicks(chart.domain, count));
</script>
<g data-ui="chart-grid" class={cn(className, 'stroke-border/65')}>
    {#each values as value}
        <line
            x1={chart.orientation === 'horizontal' ? layer.xScale(value) : 0}
            x2={chart.orientation === 'horizontal' ? layer.xScale(value) : layer.width}
            y1={chart.orientation === 'horizontal' ? 0 : layer.yScale(value)}
            y2={chart.orientation === 'horizontal' ? layer.height : layer.yScale(value)}
            stroke-dasharray="3 5"
        />
    {/each}
</g>
