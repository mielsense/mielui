<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Chart, Svg } from 'layerchart';
    import { getContext, type Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { ChartLabels } from '.';
    import { getChart } from './context.svelte';
    import Interaction from './interaction.svelte';
    import Placeholder from './placeholder.svelte';

    let {
        children,
        empty,
        loading,
        class: className,
        ...rest
    }: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        children?: Snippet;
        empty?: Snippet;
        loading?: Snippet;
    } = $props();
    const labels = getContext<(() => ChartLabels | undefined) | undefined>('chart-labels');
    const chart = getChart();
    const categories = $derived(chart.categoryDomain);
</script>
<div {...rest} data-ui="chart-plot" class={cn(className, 'relative h-72 min-w-0')}>
    {#if chart.loading}
        <Placeholder loading>
            {#if loading}
                {@render loading()}
            {:else}
                {labels?.()?.loading ?? 'Loading chart…'}
            {/if}
        </Placeholder>
    {:else if chart.data.length === 0}
        <Placeholder loading={false}>
            {#if empty}
                {@render empty()}
            {:else}
                <div class="font-medium text-foreground">
                    {labels?.()?.empty ?? 'No data to display'}
                </div>
                <div class="mt-1 text-xs">
                    {labels?.()?.emptyDescription ??
                        'Try another period or add your first record.'}
                </div>
            {/if}
        </Placeholder>
    {:else}
        <Chart
            data={chart.data}
            xDomain={chart.orientation === 'horizontal' ? chart.domain : categories}
            yDomain={chart.orientation === 'horizontal' ? categories : chart.domain}
            yReverse={chart.orientation !== 'horizontal'}
            padding={{ left: chart.orientation === 'horizontal' ? 88 : 48, right: 16, top: 12, bottom: 32 }}
        >
            <Svg aria-hidden="true" class="overflow-visible">
                {@render children?.()}
                <Interaction />
            </Svg>
        </Chart>
    {/if}
</div>
