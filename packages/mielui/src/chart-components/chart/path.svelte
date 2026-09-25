<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getChartContext } from 'layerchart';
    import { cubicOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
    import { getChart } from './context.svelte';
    import { live, reveal, sweep } from './motion';

    let {
        key,
        area = false,
        class: className,
        strokeWidth = 2.5
    }: { key: string; area?: boolean; class?: string; strokeWidth?: number } = $props();
    const chart = getChart();
    const layer = getChartContext();
    const token = Symbol('path');
    $effect.pre(() => chart.register(token, key, area ? 'area' : 'line'));
    const id = $props.id();
    const horizontal = $derived(chart.orientation === 'horizontal');
    const segments = $derived.by(() => {
        const result: { x: number; y: number }[][] = [];
        let points: { x: number; y: number }[] = [];
        chart.data.forEach((_, index) => {
            const value = chart.value(index, key);
            if (value === null) {
                if (points.length) {
                    result.push(points);
                    points = [];
                }
                return;
            }
            points.push({
                x: Number(layer.xScale(horizontal ? value : chart.position(index))),
                y: Number(layer.yScale(horizontal ? chart.position(index) : value))
            });
        });
        if (points.length) {
            result.push(points);
        }
        return result;
    });
    const line = $derived(
        segments
            .map((points) =>
                points.map((point, i) => `${i ? 'L' : 'M'}${point.x},${point.y}`).join(' ')
            )
            .join(' ')
    );
    const fill = $derived(
        segments
            .map((points) => {
                const first = points[0];
                const last = points[points.length - 1];
                const base = horizontal ? Number(layer.xScale(0)) : Number(layer.yScale(0));
                return (
                    points.map((point, i) => `${i ? 'L' : 'M'}${point.x},${point.y}`).join(' ') +
                    (horizontal
                        ? ` L${base},${last.y} L${base},${first.y}Z`
                        : ` L${last.x},${base} L${first.x},${base}Z`)
                );
            })
            .join(' ')
    );
    const marker = Tween.of(
        () => {
            const index = chart.active ?? 0;
            const value = chart.value(index, key) ?? 0;
            return {
                x: Number(layer.xScale(horizontal ? value : chart.position(index))),
                y: Number(layer.yScale(horizontal ? chart.position(index) : value))
            };
        },
        {
            duration: () =>
                chart.motion && chart.animation !== 'none' ? 120 * chart.motionScale : 0,
            easing: cubicOut
        }
    );
</script>
<g
    data-ui={area ? 'chart-area' : 'chart-line'}
    class={cn(className)}
    {@attach (element: SVGElement) => reveal(element, chart, 'line')}
>
    {#if area}
        <defs>
            <linearGradient
                {id}
                x1="0"
                x2={horizontal ? '1' : '0'}
                y1="0"
                y2={horizontal ? '0' : '1'}
            >
                <stop offset="0%" stop-color={chart.color(key)} stop-opacity="0.28" />
                <stop offset="100%" stop-color={chart.color(key)} stop-opacity="0.02" />
            </linearGradient>
        </defs>
        <path d={fill} fill={`url(#${id})`} />
        {#if chart.animation === 'live' && chart.motion}
            <defs>
                <clipPath id={`${id}-area`}><path d={fill} /></clipPath>
                <linearGradient
                    id={`${id}-sweep`}
                    x1="0"
                    y1="0"
                    x2={horizontal ? '0' : '1'}
                    y2={horizontal ? '1' : '0'}
                >
                    <stop offset="0%" stop-color={chart.color(key)} stop-opacity="0" />
                    <stop offset="50%" stop-color={chart.color(key)} stop-opacity="0.09" />
                    <stop offset="100%" stop-color={chart.color(key)} stop-opacity="0" />
                </linearGradient>
            </defs>
            <g clip-path={`url(#${id}-area)`} class="pointer-events-none">
                <rect
                    width={layer.width}
                    height={layer.height}
                    fill={`url(#${id}-sweep)`}
                    opacity="0"
                    class="[transform-box:fill-box]"
                    {@attach (element: SVGElement) => sweep(element, chart, 0, true)}
                />
            </g>
        {/if}
    {/if}
    {#each segments as points}
        {#if points.length === 1}
            <circle cx={points[0].x} cy={points[0].y} r="3" fill={chart.color(key)} />
        {/if}
    {/each}
    <path
        d={line}
        fill="none"
        stroke={chart.color(key)}
        stroke-width={strokeWidth}
        stroke-linejoin="round"
        stroke-linecap="round"
    />
    {#if chart.animation === 'live' && chart.motion && !area}
        <path
            d={line}
            fill="none"
            stroke="white"
            opacity="0"
            stroke-width={strokeWidth}
            stroke-linecap="round"
            stroke-linejoin="round"
            pathLength="100"
            stroke-dasharray="12 100"
            class="pointer-events-none"
            {@attach (element: SVGElement) => live(element, chart)}
        />
    {/if}
    {#if chart.active !== null && chart.value(chart.active, key) !== null}
        <circle
            cx={marker.current.x}
            cy={marker.current.y}
            r="4"
            fill={chart.color(key)}
            class="stroke-background"
            stroke-width="2"
        />
    {/if}
</g>
