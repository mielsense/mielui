<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import * as Table from '../../components/table';
    import type { DataTableHeaderProps } from '.';
    import ColumnHeader from './data-table-column-header.svelte';
    import Selection from './data-table-selection.svelte';
    import { selectedRow, selection, sortableColumn } from './features';

    let {
        table,
        selectable = false,
        header: content,
        ...rest
    }: DataTableHeaderProps<TFeatures, TData> = $props();
    const selectionApi = $derived(selection(table));
    const canSelect = $derived(selectable && !!selectionApi.toggleAllPageRowsSelected);
</script>
<Table.Header {...rest}>
    {#each table.getHeaderGroups() as group, groupIndex (group.id)}
        <Table.Row>
            {#if canSelect && groupIndex === 0}
                <Table.Head rowspan={table.getHeaderGroups().length} class="w-12">
                    <Selection
                        label="Select rows on this page"
                        checked={selectionApi.getIsAllPageRowsSelected?.() ?? false}
                        indeterminate={selectionApi.getIsSomePageRowsSelected?.() ?? false}
                        disabled={!table.getRowModel().rows.some((row) => selectedRow(row).getCanSelect?.())}
                        onCheckedChange={(checked) => {
                selectionApi.toggleAllPageRowsSelected?.(checked);
            }}
                    />
                </Table.Head>
            {/if}
            {#each group.headers as header (header.id)}
                {@const column = sortableColumn(header.column)}
                {@const sorted = column.getIsSorted?.()}
                <Table.Head
                    colspan={header.colSpan}
                    aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
                >
                    {#if !header.isPlaceholder}
                        {#if content}
                            {@render content(header)}
                        {:else}
                            <ColumnHeader {header} />
                        {/if}
                    {/if}
                </Table.Head>
            {/each}
        </Table.Row>
    {/each}
</Table.Header>
