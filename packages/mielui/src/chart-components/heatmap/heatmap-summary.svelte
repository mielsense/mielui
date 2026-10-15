<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapSummaryProps } from '.';
    import { countUnit } from './calendar';
    import { getHeatmapContext } from './context.svelte';

    let { children, class: className, ...props }: HeatmapSummaryProps = $props();
    const context = getHeatmapContext();
    const formatter = $derived(new Intl.NumberFormat(context.locale));
    const unit = $derived(countUnit(context.model.total, context.labels?.unit));
</script>

<p {...props} data-ui="heatmap-summary" class={cn(className, 'text-sm font-medium tabular-nums')}>
    {#if children}
        {@render children(context.model.total)}
    {:else if !context.ready}
        {context.labels?.summaryPending ?? 'Activity'}
    {:else}
        <span
            use:numberShuffle={{
                value: context.model.total,
                format: (value) => formatter.format(value)
            }}
        >
            {formatter.format(context.model.total)}
        </span>
        {unit}
    {/if}
</p>
