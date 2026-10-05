<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import { Button } from '../../components/button';
    import Pagination from '../../components/pagination';
    import type { DataTableLabels, DataTablePaginationProps } from '.';
    import { pagination } from './features';

    let {
        table,
        loading = false,
        class: className,
        ...rest
    }: DataTablePaginationProps<TFeatures, TData> = $props();
    const labels = getContext<(() => DataTableLabels | undefined) | undefined>('data-table-labels');
    const api = $derived(pagination(table));
    const pageCount = $derived(api.getPageCount?.() ?? 0);
    const state = $derived(table.store.get() as { pagination?: { pageIndex: number } });
    const page = $derived(pageCount === 0 ? 0 : (state.pagination?.pageIndex ?? 0) + 1);
</script>
{#if api.nextPage}
    <div
        {...rest}
        role="group"
        aria-label={rest['aria-label'] ?? labels?.()?.pages ?? 'Table pages'}
        data-ui="data-table-pagination"
        class={cn(className, 'flex flex-wrap items-center gap-3')}
    >
        <span class="text-sm text-foreground-muted tabular-nums">
            {#if pageCount === 0}
                {labels?.()?.noPages ?? 'No pages'}
            {:else if labels?.()?.page}
                {labels?.()?.page?.(page, pageCount >= 0 ? pageCount : undefined)}
            {:else}
                {'Page '}
                <span use:numberShuffle={{ value: page }}>{page}</span>
                {#if pageCount >= 0}
                    {' of '}
                    <span use:numberShuffle={{ value: pageCount }}>{pageCount}</span>
                {/if}
            {/if}
        </span>
        {#if pageCount >= 0}
            <fieldset disabled={loading || pageCount === 0} class="m-0 min-w-0 border-0 p-0">
                <Pagination
                    {page}
                    total={Math.max(1, pageCount)}
                    onPageChange={(next) => {
                        api.setPageIndex?.(next - 1);
                    }}
                />
            </fieldset>
        {:else}
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
        {/if}
    </div>
{/if}
