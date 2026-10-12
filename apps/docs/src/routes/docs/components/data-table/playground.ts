import {
    attributes,
    changed,
    compact,
    expression,
    type PlaygroundValues,
    select,
    tag,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'inset'], 'default'),
    toolbar: toggle('Toolbar', 'Content', true),
    summary: toggle('Summary', 'Content', true),
    pagination: toggle('Pagination', 'Content', true),
    loading: toggle('Loading', 'State'),
    selectable: toggle('Selectable', 'Behavior', true)
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const root = attributes({
        variant: changed(values.variant, 'default'),
        loading: values.loading,
        class: 'w-full'
    });
    const view = tag(
        'DataTable.View',
        {
            loading: values.loading,
            selectable: values.selectable,
            caption: 'Workspace members',
            rowLabel: expression('(row) => row.original.name')
        },
        '>',
        '        ',
        ['{table}']
    );
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
    const footerParts = compact([
        values.summary && '            <DataTable.Summary {table} />',
        values.pagination && `            <DataTable.Pagination {table}${pagination} />`
    ]);
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
        ${view}
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
