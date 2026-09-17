<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as DataTable from '@mielui/svelte/components/data-table';
    import { createTable, createTableState, type SortingState } from '@tanstack/svelte-table';
    import { columns, features, members } from './data';

    const [sorting, setSorting] = createTableState<SortingState>([{ id: 'name', desc: false }]);
    let data = $state(members.slice(0, 3));
    const table = createTable({
        features,
        columns,
        get data() {
            return data;
        },
        getRowId: (member) => member.id,
        state: {
            get sorting() {
                return sorting();
            }
        },
        onSortingChange: setSorting
    });
</script>
<DataTable.Root {table} class="w-full">
    {#snippet children({ total })}
        <DataTable.Toolbar>
            <p class="text-sm font-medium">{total} team members</p>
            <Button variant="secondary" size="sm" onclick={() => { data = members; }}>
                Show all members
            </Button>
        </DataTable.Toolbar>
        <DataTable.View {table} caption="Team members" />
        <DataTable.Summary {table}>
            {#snippet children({ selected })}
                {selected} selected · Pagination omitted in this composition
            {/snippet}
        </DataTable.Summary>
    {/snippet}
</DataTable.Root>
