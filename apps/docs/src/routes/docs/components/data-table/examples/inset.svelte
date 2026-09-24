<script lang="ts">
    import Badge from '@mielui/svelte/components/badge';
    import * as DataTable from '@mielui/svelte/components/data-table';
    import { createTable, FlexRender } from '@tanstack/svelte-table';
    import { columns, features, filters, members } from './data';

    const table = createTable({
        features,
        columns,
        data: members,
        getRowId: (member) => member.id,
        initialState: {
            columnVisibility: { joined: false },
            pagination: { pageIndex: 0, pageSize: 5 }
        }
    });
</script>
<DataTable.Root {table} variant="inset" class="w-full">
    {#snippet children()}
        <DataTable.Toolbar>
            <DataTable.Filters {table} {filters} class="min-w-0 flex-1">
                <DataTable.Filter
                    {table}
                    column="name"
                    label="Filter members by name"
                    placeholder="Filter members…"
                    class="min-w-0 flex-1"
                />
            </DataTable.Filters>
            <DataTable.Sort {table} class="ml-auto" />
        </DataTable.Toolbar>
        <DataTable.View
            {table}
            selectable
            caption="Workspace members"
            rowLabel={(row) => row.original.name}
        >
            {#snippet cell(cell)}
                {#if cell.column.id === 'role'}
                    <Badge variant="secondary">{String(cell.getValue())}</Badge>
                {:else if cell.column.id === 'projects'}
                    <span class="tabular-nums">{String(cell.getValue())}</span>
                {:else}
                    <FlexRender {cell} />
                {/if}
            {/snippet}
        </DataTable.View>
        <div data-ui="data-table-footer" class="flex flex-wrap items-center justify-between gap-3">
            <DataTable.Summary {table} />
            <DataTable.Pagination {table} />
        </div>
    {/snippet}
</DataTable.Root>
