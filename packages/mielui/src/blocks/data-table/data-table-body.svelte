<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { FlexRender } from '@tanstack/svelte-table';
    import * as Table from '../../components/table';
    import type { DataTableBodyProps } from '.';
    import Empty from './data-table-empty.svelte';
    import Selection from './data-table-selection.svelte';
    import { selectedRow, selection, visibleCells, visibleColumnCount } from './features';

    let {
        table,
        loading = false,
        selectable = false,
        rowLabel,
        cell: content,
        empty,
        ...rest
    }: DataTableBodyProps<TFeatures, TData> = $props();
    const rows = $derived(table.getRowModel().rows);
    const canSelect = $derived(selectable && !!selection(table).toggleAllPageRowsSelected);
    const columns = $derived(visibleColumnCount(table) + (canSelect ? 1 : 0));
</script>
<Table.Body {...rest}>
    {#if rows.length === 0}
        <Empty columns={Math.max(1, columns)} {loading}>
            {#snippet children(state)}
                {#if empty}
                    {@render empty(state)}
                {:else}
                    {loading ? 'Loading rows…' : 'No results.'}
                {/if}
            {/snippet}
        </Empty>
    {:else}
        {#each rows as row (row.id)}
            {const selectionApi = $derived(selectedRow(row))}
            <Table.Row data-state={selectionApi.getIsSelected?.() ? 'selected' : undefined}>
                {#if canSelect}
                    <Table.Cell class="w-12">
                        <Selection
                            label={`Select ${rowLabel?.(row) ?? `row ${row.id}`}`}
                            checked={selectionApi.getIsSelected?.() ?? false}
                            disabled={!selectionApi.getCanSelect?.()}
                            onCheckedChange={(checked) => {
                selectionApi.toggleSelected?.(checked);
            }}
                        />
                    </Table.Cell>
                {/if}
                {#each visibleCells(table, row) as cell (cell.id)}
                    <Table.Cell>
                        {#if content}
                            {@render content(cell)}
                        {:else}
                            <FlexRender {cell} />
                        {/if}
                    </Table.Cell>
                {/each}
            </Table.Row>
        {/each}
    {/if}
</Table.Body>
