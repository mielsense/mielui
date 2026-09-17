<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { cn } from '@mielui/svelte/utils';
    import type { DataTableProps } from '.';
    import Pagination from './data-table-pagination.svelte';
    import Summary from './data-table-summary.svelte';
    import View from './data-table-view.svelte';
    import { summary } from './features';

    let {
        table,
        children,
        loading = false,
        selectable = false,
        caption,
        rowLabel,
        header,
        cell,
        empty,
        class: className,
        ...rest
    }: DataTableProps<TFeatures, TData> = $props();
    const state = $derived(summary(table));
</script>
<div
    {...rest}
    data-ui="data-table"
    aria-busy={loading || undefined}
    class={cn(className, 'flex min-w-0 flex-col gap-4')}
>
    {#if children}
        {@render children(state)}
    {:else}
        <View {table} {loading} {selectable} {caption} {rowLabel} {header} {cell} {empty} />
        <div class="flex flex-wrap items-center justify-between gap-3">
            <Summary {table} />
            <Pagination {table} {loading} />
        </div>
    {/if}
</div>
