<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { cn } from '@mielui/svelte/utils';
    import { setContext } from 'svelte';
    import type { DataTableLabels, DataTableProps } from '.';
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
    const state = $derived(summary(table));

    const insetClasses = [
        '[--mielui-modal-inset:calc(var(--spacing)*var(--mielui-border-inset-scale,1))] mielui-inset-frame',
        '[--data-table-radius:calc(var(--radius-xl)-var(--border-size)-var(--mielui-modal-inset))]',
        '[&_[data-ui=table]]:[--table-inner-radius:var(--data-table-radius)] [&_[data-ui=table]]:rounded-[var(--data-table-radius)] [&_[data-ui=table]]:border-0 [&_[data-ui=table]]:bg-card [&_[data-ui=table]]:p-0',
        '[&>[data-ui=table-scroll-area]]:rounded-[var(--data-table-radius)]',
        '[&>[data-ui=data-table-toolbar]]:[--size-control-md:var(--size-control-sm)] [&>[data-ui=data-table-toolbar]]:px-3',
        '[&>[data-ui=table-scroll-area]~*]:[--size-icon-md:var(--size-control-sm)] [&>[data-ui=table-scroll-area]~*]:px-3',
        '[&>[data-ui=data-table-toolbar]]:-mb-[var(--mielui-modal-inset)] [&>[data-ui=data-table-toolbar]]:rounded-t-[var(--data-table-radius)] [&>[data-ui=data-table-toolbar]]:border-b-[length:var(--border-size)] [&>[data-ui=data-table-toolbar]]:border-border [&>[data-ui=data-table-toolbar]]:bg-card [&>[data-ui=data-table-toolbar]]:py-2',
        '[&>[data-ui=data-table-toolbar]+[data-ui=table-scroll-area]]:rounded-t-none [&>[data-ui=data-table-toolbar]+[data-ui=table-scroll-area]_[data-ui=table]]:rounded-t-none [&>[data-ui=data-table-toolbar]+[data-ui=table-scroll-area]_thead_th]:rounded-t-none!',
        '[&>[data-ui=table-scroll-area]~*]:py-1',
        '[@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]]:mb-0 [@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]]:rounded-none [@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]]:border-b-0 [@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]]:bg-transparent [@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]]:py-1.5',
        '[@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]+[data-ui=table-scroll-area]]:rounded-t-[var(--data-table-radius)] [@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]+[data-ui=table-scroll-area]_[data-ui=table]]:rounded-t-[var(--data-table-radius)] [@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]+[data-ui=table-scroll-area]_thead_th:first-child]:rounded-ss-[var(--data-table-radius)]! [@container_style(--mielui-inset-position:top)]:[&>[data-ui=data-table-toolbar]+[data-ui=table-scroll-area]_thead_th:last-child]:rounded-se-[var(--data-table-radius)]!',
        '[@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]:has(+*)]:rounded-b-none [@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]:has(+*)_[data-ui=table]]:rounded-b-none',
        '[@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]~*]:-mt-[var(--mielui-modal-inset)] [@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]~*]:rounded-b-[var(--data-table-radius)] [@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]~*]:border-t-[length:var(--border-size)] [@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]~*]:border-border [@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]~*]:bg-card [@container_style(--mielui-inset-position:top)]:[&>[data-ui=table-scroll-area]~*]:py-2'
    ];
</script>
<div
    {...rest}
    data-ui="data-table"
    data-variant={variant}
    aria-busy={loading || undefined}
    class={cn(
        className,
        'flex min-w-0 flex-col',
        variant === 'inset' ? insetClasses : 'gap-4'
    )}
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
