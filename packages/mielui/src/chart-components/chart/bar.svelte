<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getChartContext } from 'layerchart';
    import { getChart } from './context.svelte';
    import { reveal, sweep } from './motion';

    let {
        key,
        class: className,
        radius = 4
    }: { key: string; class?: string; radius?: number } = $props();
    const chart = getChart();
    const layer = getChartContext();
    const token = Symbol('bar');
    const id = $props.id();
    $effect.pre(() => chart.register(token, key, 'bar'));
    const horizontal = $derived(chart.orientation === 'horizontal');
    const index = $derived(Math.max(0, chart.barKeys.indexOf(key)));
    const size = $derived.by(() => {
        const extent = horizontal ? layer.height : layer.width;
        const positions = chart.data
            .map((_, row) =>
                Number((horizontal ? layer.yScale : layer.xScale)(chart.position(row)))
            )
            .sort((a, b) => a - b);
        const gaps = positions
            .slice(1)
            .map((value, i) => value - positions[i])
            .filter((value) => value > 0);
        return gaps.length ? Math.min(...gaps) : extent;
    });
    const count = $derived(chart.stacked ? 1 : Math.max(1, chart.barKeys.length));
    const width = $derived((size * 0.72) / count);
    function geometry(row: number, value: number) {
        const start = chart.stacked
            ? chart.barKeys.slice(0, index).reduce((sum, name) => {
                  const prior = chart.value(row, name) ?? 0;
                  return sum + (Math.sign(prior) === Math.sign(value) ? prior : 0);
              }, 0)
            : 0;
        const scale = horizontal ? layer.xScale : layer.yScale;
        const a = Number(scale(start));
        const b = Number(scale(start + value));
        const center = Number((horizontal ? layer.yScale : layer.xScale)(chart.position(row)));
        const category = center - size * 0.36 + (chart.stacked ? 0 : index * width);
        return {
            x: horizontal ? Math.min(a, b) : category,
            y: horizontal ? category : Math.min(a, b),
            width: horizontal ? Math.abs(b - a) : Math.max(1, width - 2),
            height: horizontal ? Math.max(1, width - 2) : Math.abs(b - a)
        };
    }
</script>
<g data-ui="chart-bar" class={cn(className)} fill={chart.color(key)}>
    {#each chart.data as row, i (String(row[chart.x]) + i)}
        {@const value = chart.value(i, key)}
        {#if value !== null}
            {@const box = geometry(i, value)}
            <rect
                {...box}
                rx={chart.stacked ? 0 : Math.min(radius, box.width / 2, box.height / 2)}
                opacity={chart.active === null || chart.active === i ? 1 : 0.45}
                style:transform-origin={horizontal ? `${layer.xScale(0)}px ${box.y}px` : `${box.x}px ${layer.yScale(0)}px`}
                {@attach (element: SVGElement) => reveal(element, chart, 'bar')}
            />
            {#if chart.animation === 'live' && chart.motion}
                <defs>
                    <clipPath id={`${id}-clip-${i}`}><rect {...box} rx={radius} /></clipPath>
                    <linearGradient id={`${id}-light-${i}`}>
                        <stop offset="0%" stop-color="white" stop-opacity="0" />
                        <stop offset="48%" stop-color="white" stop-opacity="0.05" />
                        <stop offset="65%" stop-color="white" stop-opacity="0.32" />
                        <stop offset="100%" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                </defs>
                <g clip-path={`url(#${id}-clip-${i})`}>
                    <rect
                        {...box}
                        fill={`url(#${id}-light-${i})`}
                        class="[transform-box:fill-box]"
                        {@attach (element: SVGElement) => sweep(element, chart)}
                    />
                </g>
            {/if}
        {/if}
    {/each}
</g>
