<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getChartContext } from 'layerchart';
    import { getChart } from './context.svelte';
    import { numericTicks } from './ticks';

    let {
        axis,
        class: className,
        format,
        ticks = 5
    }: {
        axis: 'x' | 'y';
        class?: string;
        ticks?: number;
        format?: (value: string | number) => string;
    } = $props();
    const numberFormatter = new Intl.NumberFormat(undefined, {
        notation: 'compact',
        maximumFractionDigits: 1
    });
    const layer = getChartContext();
    const chart = getChart();
    const categorical = $derived((axis === 'x') !== (chart.orientation === 'horizontal'));
    const count = $derived(
        Number.isFinite(ticks) ? Math.max(2, Math.min(12, Math.floor(ticks))) : 5
    );
    const values = $derived(
        categorical ? chart.data.map((_, i) => i) : numericTicks(chart.domain, count)
    );
    const stride = $derived(
        categorical
            ? Math.max(
                  1,
                  Math.ceil(
                      values.length /
                          Math.max(
                              1,
                              Math.floor(
                                  (axis === 'x' ? layer.width : layer.height) /
                                      (axis === 'x' ? 70 : 30)
                              )
                          )
                  )
              )
            : 1
    );
</script>
<g
    data-ui={`chart-${axis}-axis`}
    class={cn(className, 'fill-foreground-muted text-[length:var(--font-size-meta)] tabular-nums')}
>
    {#each values as value, index}
        {#if index % stride === 0}
            <text
                x={axis === 'x' ? layer.xScale(categorical ? chart.position(value) : value) : -10}
                y={axis === 'x' ? layer.height + 22 : layer.yScale(categorical ? chart.position(value) : value)}
                text-anchor={axis === 'x' ? 'middle' : 'end'}
                dominant-baseline={axis === 'y' ? 'middle' : 'auto'}
            >
                {format ? format(categorical ? chart.label(value) : value) : categorical ? chart.label(value) : numberFormatter.format(value)}
            </text>
        {/if}
    {/each}
</g>
