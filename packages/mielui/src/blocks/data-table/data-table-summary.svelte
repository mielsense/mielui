<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { cn } from '@mielui/svelte/utils';
    import type { DataTableSummaryProps } from '.';
    import { findDataTableLabels } from './context';
    import { summary } from './features';

    let {
        table,
        children,
        class: className,
        ...rest
    }: DataTableSummaryProps<TFeatures, TData> = $props();
    const labels = findDataTableLabels();
    const state = $derived(summary(table));
    const text = $derived(labels?.());
</script>
<p
    {...rest}
    data-ui="data-table-summary"
    class={cn(className, 'text-sm text-foreground-muted tabular-nums')}
>
    {#if children}
        {@render children(state)}
    {:else}
        {#if text?.rows}
            {text.rows(state.total)}
        {:else}
            <span use:numberShuffle={{ value: state.total }}>{state.total}</span>
            {state.total === 1 ? 'row' : 'rows'}
        {/if}
        {#if state.selected > 0}
            {' · '}
            {#if text?.selected}
                {text.selected(state.selected, state.total)}
            {:else}
                <span use:numberShuffle={{ value: state.selected }}>{state.selected}</span>
                selected
            {/if}
        {/if}
    {/if}
</p>
