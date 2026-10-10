import { attributes, type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'inset'], 'default'),
    toolbar: toggle('Toolbar', 'Content', true),
    summary: toggle('Summary', 'Content', true),
    pagination: toggle('Pagination', 'Content', true),
    loading: toggle('Loading', 'State'),
    selectable: toggle('Selectable', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        variant: values.variant !== 'default' && values.variant,
        loading: values.loading,
        class: 'w-full'
    });
    const view = [
        '{table}',
        values.loading ? 'loading' : '',
        values.selectable ? 'selectable' : '',
        'caption="Workspace members"',
        'rowLabel={(row) => row.original.name}'
    ]
        .filter(Boolean)
        .join('\n            ');
    const pagination = attributes({
        loading: values.loading,
        class: 'ms-auto'
    });
    const data = values.toolbar
        ? 'columns, features, filters, members'
        : 'columns, features, members';
    const toolbar = values.toolbar
        ? `
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
            <DataTable.Sort {table} class="ms-auto" />
        </DataTable.Toolbar>`
        : '';
    const footerParts = [
        values.summary ? '            <DataTable.Summary {table} />' : '',
        values.pagination ? `            <DataTable.Pagination {table}${pagination} />` : ''
    ].filter(Boolean);
    const footer = footerParts.length
        ? `
        <div data-ui="data-table-footer" class="flex flex-wrap items-center justify-between gap-3">
${footerParts.join('\n')}
        </div>`
        : '';

    return `<script lang="ts">
    import { Badge } from '@mielui/svelte/components/badge';
    import * as DataTable from '@mielui/svelte/components/data-table';
    import { createTable, FlexRender } from '@tanstack/svelte-table';
    import { ${data} } from './data';

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

<DataTable.Root {table}${root}>
    {#snippet children()}${toolbar}
        <DataTable.View
            ${view}
        >
            {#snippet cell(cell)}
                {#if cell.column.id === 'role'}
                    <Badge variant="secondary">{String(cell.getValue())}</Badge>
                {:else}
                    <FlexRender {cell} />
                {/if}
            {/snippet}
        </DataTable.View>${footer}
    {/snippet}
</DataTable.Root>`;
}
