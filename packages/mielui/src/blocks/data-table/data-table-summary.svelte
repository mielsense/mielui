<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import type { DataTableLabels, DataTableSummaryProps } from '.';
    import { summary } from './features';

    let {
        table,
        children,
        class: className,
        ...rest
    }: DataTableSummaryProps<TFeatures, TData> = $props();
    const labels = getContext<(() => DataTableLabels | undefined) | undefined>('data-table-labels');
    const state = $derived(summary(table));
</script>
<p
    {...rest}
    data-ui="data-table-summary"
    class={cn(className, 'text-sm text-foreground-muted tabular-nums')}
>
    {#if children}
        {@render children(state)}
    {:else}
        <span use:numberShuffle={{ value: state.total }}>{state.total}</span>
        {labels?.()?.rows?.(state.total) ?? (state.total === 1 ? 'row' : 'rows')}
        {#if state.selected > 0}
            {' · '}
            <span use:numberShuffle={{ value: state.selected }}>{state.selected}</span>
            {labels?.()?.selected?.(state.selected) ?? 'selected'}
        {/if}
    {/if}
</p>
