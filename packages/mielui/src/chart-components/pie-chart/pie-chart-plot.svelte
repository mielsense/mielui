<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Chart, Svg } from 'layerchart';
    import { Skeleton } from '../../components/skeleton';
    import { getPieContext } from './context';
    import type { PieChartPlotProps } from './index';

    let { children, class: className, ...rest }: PieChartPlotProps = $props();
    const context = getPieContext();
</script>

<div data-ui="pie-chart-plot" class={cn(className, 'relative h-64 min-w-0')} {...rest}>
    <Chart data={[...context.data]} x="key" y="value" padding={12}>
        <Svg center aria-hidden="true">
            {#if !context.loading && context.total > 0}
                {@render children?.()}
            {/if}
        </Svg>
    </Chart>
    {#if context.loading || context.total === 0}
        <div
            class="pointer-events-none absolute inset-0 grid place-items-center text-sm text-foreground-muted"
            role="status"
        >
            <div aria-hidden="true" class="absolute inset-0 grid place-items-center">
                <Skeleton
                    variant={context.loading && context.motion && context.visible ? 'shimmer' : 'default'}
                    class={cn('size-48 max-h-[85%] max-w-[85%] rounded-full [mask-image:radial-gradient(transparent_50%,#000_51%)]', !context.loading && 'opacity-50')}
                />
            </div>
            <span class="relative max-w-28 text-center text-xs leading-relaxed">
                {context.loading ? 'Loading chart…' : 'No data available'}
            </span>
        </div>
    {/if}
</div>
