<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getPieContext } from './context';
    import type { PieChartLabelProps } from './index';

    let { children, class: className, ...rest }: PieChartLabelProps = $props();
    const context = getPieContext();
    const active = $derived(context.data.find((item) => item.key === context.active));
</script>

<text
    data-ui="pie-chart-label"
    x={0}
    y={0}
    text-anchor="middle"
    dominant-baseline="middle"
    class={cn(className, 'fill-current text-3xl font-semibold tabular-nums')}
    {...rest}
>
    {#if children}
        {@render children({ total: context.total, active })}
    {:else}
        {new Intl.NumberFormat().format(context.total)}
    {/if}
</text>
