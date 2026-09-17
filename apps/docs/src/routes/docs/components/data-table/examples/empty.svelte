<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as DataTable from '@mielui/svelte/components/data-table';
    import { createTable } from '@tanstack/svelte-table';
    import { columns, features, members } from './data';

    let loading = $state(false);
    const table = createTable({
        features,
        columns,
        data: members,
        getRowId: (member) => member.id,
        initialState: { columnFilters: [{ id: 'name', value: 'No matching member' }] }
    });
</script>
<div class="flex w-full flex-col gap-4">
    <Button
        variant="secondary"
        size="sm"
        class="self-start"
        onclick={() => { loading = !loading; }}
    >
        {loading ? 'Show empty state' : 'Show loading state'}
    </Button>
    <DataTable.Root {table} {loading} caption="Filtered members" class="w-full">
        {#snippet empty({ loading })}
            <div class="flex flex-col items-center gap-3">
                <p>{loading ? 'Loading members…' : 'No members match this filter.'}</p>
                {#if !loading}
                    <Button
                        size="sm"
                        variant="secondary"
                        onclick={() => { table.resetColumnFilters(true); }}
                    >
                        Clear filter
                    </Button>
                {/if}
            </div>
        {/snippet}
    </DataTable.Root>
</div>
