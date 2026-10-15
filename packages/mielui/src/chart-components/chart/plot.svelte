<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Chart, Svg } from 'layerchart';
    import type { ChartPlotProps } from '.';
    import { getChart } from './context.svelte';
    import Interaction from './interaction.svelte';
    import Placeholder from './placeholder.svelte';

    let { children, empty, loading, class: className, ...rest }: ChartPlotProps = $props();
    const chart = getChart();
    const categories = $derived(chart.categoryDomain);
    const padding = $derived({
        left: chart.orientation === 'horizontal' ? 88 : 48,
        right: 16,
        top: 12,
        bottom: 32
    });
</script>

<div {...rest} data-ui="chart-plot" class={cn(className, 'relative h-72 min-w-0')}>
    {#if chart.loading}
        <Placeholder loading children={loading} />
    {:else if chart.data.length === 0}
        <Placeholder loading={false} children={empty} />
    {:else}
        <Chart
            data={chart.data}
            xDomain={chart.orientation === 'horizontal' ? chart.domain : categories}
            yDomain={chart.orientation === 'horizontal' ? categories : chart.domain}
            yReverse={chart.orientation !== 'horizontal'}
            {padding}
        >
            <Svg aria-hidden="true" class="overflow-visible">
                {@render children?.()}
                <Interaction />
            </Svg>
        </Chart>
    {/if}
</div>
