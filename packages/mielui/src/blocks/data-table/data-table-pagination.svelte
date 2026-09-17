<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { cn } from '@mielui/svelte/utils';
    import { Button } from '../../components/button';
    import type { DataTablePaginationProps } from '.';
    import { pagination } from './features';

    let {
        table,
        loading = false,
        class: className,
        ...rest
    }: DataTablePaginationProps<TFeatures, TData> = $props();
    const api = $derived(pagination(table));
    const pageCount = $derived(api.getPageCount?.() ?? 0);
    const state = $derived(table.store.get() as { pagination?: { pageIndex: number } });
    const page = $derived(pageCount === 0 ? 0 : (state.pagination?.pageIndex ?? 0) + 1);
</script>
{#if api.nextPage}
    <nav
        {...rest}
        aria-label={rest['aria-label'] ?? 'Table pages'}
        data-ui="data-table-pagination"
        class={cn(className, 'flex flex-wrap items-center gap-3')}
    >
        <span class="text-sm text-foreground-muted tabular-nums">
            {pageCount === 0 ? 'No pages' : `Page ${page}${pageCount >= 0 ? ` of ${pageCount}` : ''}`}
        </span>
        <Button
            variant="outline"
            size="sm"
            disabled={loading || !api.getCanPreviousPage?.()}
            onclick={() => {
                api.previousPage?.();
            }}
        >
            Previous
        </Button>
        <Button
            variant="outline"
            size="sm"
            disabled={loading || !api.getCanNextPage?.()}
            onclick={() => {
                api.nextPage?.();
            }}
        >
            Next
        </Button>
    </nav>
{/if}
