<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getChartContext } from 'layerchart';
    import { getChart } from './context.svelte';
    import { numericTicks, tickCount, tickFractionDigits } from './ticks';

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
    const layer = getChartContext();
    const chart = getChart();
    const categorical = $derived((axis === 'x') !== (chart.orientation === 'horizontal'));
    const count = $derived(tickCount(ticks));
    const values = $derived(
        categorical ? chart.data.map((_, i) => i) : numericTicks(chart.domain, count)
    );
    const numberFormatter = $derived(
        new Intl.NumberFormat(undefined, {
            notation: 'compact',
            maximumFractionDigits: categorical ? 1 : tickFractionDigits(values)
        })
    );
    const stride = $derived.by(() => {
        if (!categorical) {
            return 1;
        }
        const extent = axis === 'x' ? layer.width : layer.height;
        const fitting = Math.max(1, Math.floor(extent / (axis === 'x' ? 70 : 30)));

        return Math.max(1, Math.ceil(values.length / fitting));
    });

    function offset(value: number) {
        const position = categorical ? chart.position(value) : value;

        return axis === 'x' ? layer.xScale(position) : layer.yScale(position);
    }

    function text(value: number) {
        if (categorical) {
            const label = chart.label(value);

            return format ? format(label) : label;
        }

        return format ? format(value) : numberFormatter.format(value);
    }
</script>

<g
    data-ui={`chart-${axis}-axis`}
    class={cn(className, 'fill-foreground-muted text-xs tabular-nums')}
>
    {#each values as value, index}
        {#if index % stride === 0}
            <text
                x={axis === 'x' ? offset(value) : -10}
                y={axis === 'x' ? layer.height + 22 : offset(value)}
                text-anchor={axis === 'x' ? 'middle' : 'end'}
                dominant-baseline={axis === 'y' ? 'middle' : 'auto'}
            >
                {text(value)}
            </text>
        {/if}
    {/each}
</g>
