<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { ArrowUpDownIcon } from '@hugeicons/core-free-icons';
    import type { SortingState, Table_RowSorting } from '@tanstack/svelte-table';
    import * as Menu from '../../components/dropdown-menu';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { DataTableSortProps } from '.';
    import { sortableColumn } from './features';

    let { table, columns, class: className }: DataTableSortProps<TFeatures, TData> = $props();
    const api = $derived(table as typeof table & Partial<Table_RowSorting<TFeatures, TData>>);
    const options = $derived(
        columns ??
            table
                .getAllLeafColumns()
                .filter((column) => sortableColumn(column).getCanSort?.())
                .map((column) => ({
                    id: column.id,
                    label:
                        typeof column.columnDef.header === 'string'
                            ? column.columnDef.header
                            : column.id
                }))
    );
    const sorting = $derived((table.store.get() as { sorting?: SortingState }).sorting ?? []);
    const current = $derived(sorting[0]);
    const label = $derived(options.find((option) => option.id === current?.id)?.label);
</script>
<Menu.Root>
    <Menu.Trigger
        variant="outline"
        size="sm"
        class={className}
        disabled={!api.setSorting || options.length === 0}
        aria-label="Sort results"
    >
        <HugeiconsIcon icon={ArrowUpDownIcon} size={14} />
        {label ? `Sort: ${label}` : 'Sort'}
    </Menu.Trigger>
    <Menu.Content class="min-w-52">
        <Menu.Label>Sort by</Menu.Label>
        <Menu.RadioGroup
            value={current?.id ?? ''}
            onValueChange={(id) => {
                api.setSorting?.([{ id, desc: current?.desc ?? false }]);
            }}
        >
            {#each options as option (option.id)}
                <Menu.RadioItem value={option.id}>{option.label}</Menu.RadioItem>
            {/each}
        </Menu.RadioGroup>
        <Menu.Separator />
        <Menu.RadioGroup
            value={current ? (current.desc ? 'desc' : 'asc') : ''}
            onValueChange={(direction) => {
                if (current) {
                    api.setSorting?.([{ id: current.id, desc: direction === 'desc' }]);
                }
            }}
        >
            <Menu.RadioItem value="asc" disabled={!current}>Ascending</Menu.RadioItem>
            <Menu.RadioItem value="desc" disabled={!current}>Descending</Menu.RadioItem>
        </Menu.RadioGroup>
        {#if current}
            <Menu.Separator />
            <Menu.Item
                onclick={() => {
                api.setSorting?.([]);
            }}
            >
                Clear sorting
            </Menu.Item>
        {/if}
    </Menu.Content>
</Menu.Root>
