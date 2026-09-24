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
        variant = 'default',
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
    data-variant={variant}
    aria-busy={loading || undefined}
    class={cn(className, 'flex min-w-0 flex-col', variant === 'inset' ? '[--mielui-modal-inset:var(--spacing)] mielui-inset-frame [&>[data-ui=data-table-toolbar]]:[--size-control-md:var(--size-control-sm)] [&>[data-ui=data-table-toolbar]]:px-3 [&>[data-ui=data-table-toolbar]]:py-1.5 [&>[data-ui=data-table-footer]]:[--size-icon-md:var(--size-control-sm)] [&>[data-ui=data-table-footer]]:px-3 [&>[data-ui=data-table-footer]]:py-1 [&_[data-ui=table]]:[--table-inner-radius:calc(var(--radius-xl)-var(--border-size)-var(--spacing))] [&_[data-ui=table]]:border-0 [&_[data-ui=table]]:p-0 [&_[data-ui=table]]:bg-card [&_[data-ui=table]>thead>tr>th]:bg-secondary/50' : 'gap-4')}
>
    {#if children}
        {@render children(state)}
    {:else}
        <View {table} {loading} {selectable} {caption} {rowLabel} {header} {cell} {empty} />
        <div data-ui="data-table-footer" class="flex flex-wrap items-center justify-between gap-3">
            <Summary {table} />
            <Pagination {table} {loading} />
        </div>
    {/if}
</div>
