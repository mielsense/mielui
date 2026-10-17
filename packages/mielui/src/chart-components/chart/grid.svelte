<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getChartContext as getLayerChartContext } from 'layerchart';
    import type { ChartGridProps } from '.';
    import { getChartContext } from './context';
    import { numericTicks, tickCount } from './ticks';

    let { class: className, ticks = 5 }: ChartGridProps = $props();
    const layer = getLayerChartContext();
    const chart = getChartContext();
    const count = $derived(tickCount(ticks));
    const values = $derived(numericTicks(chart.domain, count));
</script>

<g data-ui="chart-grid" class={cn(className, 'stroke-border/65')}>
    {#each values as value}
        <line
            x1={chart.orientation === 'horizontal' ? layer.xScale(value) : 0}
            x2={chart.orientation === 'horizontal' ? layer.xScale(value) : layer.width}
            y1={chart.orientation === 'horizontal' ? 0 : layer.yScale(value)}
            y2={chart.orientation === 'horizontal' ? layer.height : layer.yScale(value)}
        />
    {/each}
</g>
