<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { cn } from '@mielui/svelte/utils';
    import type { DataTableSummaryProps } from '.';
    import { summary } from './features';

    let {
        table,
        children,
        class: className,
        ...rest
    }: DataTableSummaryProps<TFeatures, TData> = $props();
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
        {`${state.total} ${state.total === 1 ? 'row' : 'rows'}${state.selected > 0 ? ` · ${state.selected} selected` : ''}`}
    {/if}
</p>
