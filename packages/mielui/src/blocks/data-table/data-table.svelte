<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { cn } from '@mielui/svelte/utils';
    import { setContext } from 'svelte';
    import type { DataTableLabels, DataTableProps } from '.';
    import { type DataTableToolbarSlot, setDataTableContext } from './context.svelte';
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
        labels,
        class: className,
        ...rest
    }: DataTableProps<TFeatures, TData> = $props();
    setContext<() => DataTableLabels | undefined>('data-table-labels', () => labels);
    const tableSummary = $derived(summary(table));
    const dataTable = $state({
        get variant() {
            return variant;
        },
        toolbarSlot: undefined as DataTableToolbarSlot | undefined
    });
    setDataTableContext(dataTable);

    const insetClasses = [
        'mielui-inset-frame shadow-[var(--elevation-1)]',
        '[--data-table-radius:calc(var(--mielui-plate-radius)-var(--border-size)-var(--mielui-modal-inset))]',
        '[&_[data-ui=table]]:rounded-none [&_[data-ui=table]]:border-0 [&_[data-ui=table]]:bg-transparent [&_[data-ui=table]]:p-0 [&_[data-ui=table]]:shadow-none',
        '[&>[data-ui=table-scroll-area]]:rounded-[var(--data-table-radius)]! [&>[data-ui=table-scroll-area]]:[corner-shape:squircle]',
        '[&>[data-ui=table-scroll-area]~*]:[--size-icon-md:var(--size-control-sm)] [&>[data-ui=table-scroll-area]~*]:px-3 [&>[data-ui=table-scroll-area]~*]:py-1'
    ];
</script>
{#snippet body()}
    {#if children}
        {@render children(tableSummary)}
    {:else}
        <View {table} {loading} {selectable} {caption} {rowLabel} {header} {cell} {empty} />
        <div data-ui="data-table-footer" class="flex flex-wrap items-center justify-between gap-3">
            <Summary {table} />
            <Pagination {table} {loading} />
        </div>
    {/if}
{/snippet}

<div
    {...rest}
    data-ui="data-table"
    data-variant={variant}
    aria-busy={loading || undefined}
    class={cn(className, 'flex min-w-0 flex-col', variant === 'inset' ? 'gap-3' : 'gap-4')}
>
    {#if variant === 'inset'}
        {#if dataTable.toolbarSlot}
            <div
                {...dataTable.toolbarSlot.rest}
                data-ui="data-table-toolbar"
                class={cn(
                    dataTable.toolbarSlot.className,
                    'flex flex-wrap items-center justify-between gap-3'
                )}
            >
                {@render dataTable.toolbarSlot.children?.()}
            </div>
        {/if}
        <div data-ui="data-table-frame" class={cn('flex min-w-0 flex-col', insetClasses)}>
            {@render body()}
        </div>
    {:else}
        {@render body()}
    {/if}
</div>
