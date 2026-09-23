<script lang="ts">
    import { getChartContext } from 'layerchart';
    import { cubicOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
    import { getChart } from './context.svelte';

    const layer = getChartContext();
    const chart = getChart();
    let group: SVGGElement;
    const selected = Tween.of(
        () =>
            chart.active === null
                ? 0
                : Number(
                      (chart.orientation === 'horizontal' ? layer.yScale : layer.xScale)(
                          chart.position(chart.active)
                      )
                  ),
        {
            duration: () =>
                chart.motion && chart.animation !== 'none' ? 120 * chart.motionScale : 0,
            easing: cubicOut
        }
    );
    $effect(() => {
        const index = chart.active;
        const element = chart.element;
        if (index === null || !group || !element) {
            return;
        }
        const value =
            chart.keys.map((key) => chart.value(index, key)).find((value) => value !== null) ?? 0;
        const point = new DOMPoint(
            Number(
                layer.xScale(chart.orientation === 'horizontal' ? value : chart.position(index))
            ),
            Number(layer.yScale(chart.orientation === 'horizontal' ? chart.position(index) : value))
        );
        const matrix = group.getScreenCTM();
        if (!matrix) {
            return;
        }
        const screen = point.matrixTransform(matrix);
        const bounds = element.getBoundingClientRect();
        chart.anchor = { x: screen.x - bounds.left, y: screen.y - bounds.top };
    });
    const horizontal = $derived(chart.orientation === 'horizontal');
    const extent = $derived(horizontal ? layer.height : layer.width);
    const positions = $derived(
        chart.data.map((_, i) =>
            Number((horizontal ? layer.yScale : layer.xScale)(chart.position(i)))
        )
    );
    function region(index: number) {
        const center = positions[index];
        const previous = positions.filter((value) => value < center);
        const next = positions.filter((value) => value > center);
        const start = previous.length ? (Math.max(...previous) + center) / 2 : 0;
        const end = next.length ? (Math.min(...next) + center) / 2 : extent;
        return { start, size: Math.max(0, end - start) };
    }
</script>
<g bind:this={group}>
    {#if chart.active !== null}
        <line
            x1={horizontal ? 0 : selected.current}
            x2={horizontal ? layer.width : selected.current}
            y1={horizontal ? selected.current : 0}
            y2={horizontal ? selected.current : layer.height}
            class="stroke-foreground/15"
            stroke-dasharray="3 4"
        />
    {/if}
    {#each chart.data as _, index}
        {const hit = $derived(region(index))}
        <rect
            x={horizontal ? 0 : hit.start}
            y={horizontal ? hit.start : 0}
            width={horizontal ? layer.width : hit.size}
            height={horizontal ? hit.size : layer.height}
            fill="transparent"
            {@attach (element: SVGRectElement) => {
            const enter = (event: PointerEvent) => {
                chart.active = index;
                const bounds = chart.element?.getBoundingClientRect();
                if (bounds) { chart.pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }; }
            };
            const leave = (event: PointerEvent) => {
                if (event.relatedTarget instanceof Node && group.contains(event.relatedTarget)) { return; }
                chart.pointer = null;
                chart.active = chart.focused;
            };
            element.addEventListener('pointerenter', enter);
            element.addEventListener('pointermove', enter);
            element.addEventListener('pointerleave', leave);
            return () => {
                element.removeEventListener('pointerenter', enter);
                element.removeEventListener('pointermove', enter);
                element.removeEventListener('pointerleave', leave);
            };
        }}
        />
    {/each}
</g>
