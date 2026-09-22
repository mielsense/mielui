<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { Cancel01Icon, FilterIcon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { tick } from 'svelte';
    import { Button } from '../../components/button';
    import * as Menu from '../../components/dropdown-menu';
    import * as Group from '../../components/group';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { DataTableFiltersProps } from '.';
    import Facet from './data-table-facet.svelte';
    import { filterableColumn } from './features';

    let {
        table,
        filters,
        children,
        class: className
    }: DataTableFiltersProps<TFeatures, TData> = $props();
    let shown = $state<string[]>([]);
    let opened = $state<string>();
    let pickerOpen = $state(false);
    let container = $state<HTMLDivElement>();
    async function restorePicker() {
        await tick();
        container?.querySelector<HTMLButtonElement>('[data-dropdown-menu-trigger]')?.focus();
    }
    const available = $derived(
        filters.filter((filter) => {
            const column = table.getColumn(filter.column);
            return column && filterableColumn(column).getCanFilter?.();
        })
    );
    const active = $derived(
        available
            .filter((filter) => {
                const column = table.getColumn(filter.column);
                return column && filterableColumn(column).getFilterValue?.() !== undefined;
            })
            .map((filter) => filter.column)
    );
    const visible = $derived(
        available.filter(
            (filter) => shown.includes(filter.column) || active.includes(filter.column)
        )
    );
    const hidden = $derived(available.filter((filter) => !visible.includes(filter)));
    async function reveal(id: string) {
        shown = [...new Set([...shown, id])];
        pickerOpen = false;
        await tick();
        opened = id;
    }
    function reset() {
        for (const filter of filters) {
            const column = table.getColumn(filter.column);
            if (column) {
                filterableColumn(column).setFilterValue?.(undefined);
            }
        }
        shown = [];
        opened = undefined;
        void restorePicker();
    }
</script>
<div
    bind:this={container}
    data-ui="data-table-filters"
    class={cn(className, 'flex min-w-0 flex-wrap items-center gap-2')}
>
    <Group.Root aria-label="Table filters" class={children ? 'w-full max-w-sm' : undefined}>
        {@render children?.()}
        {#if children}
            <Group.Separator />
        {/if}
        <Menu.Root bind:open={pickerOpen}>
            <Menu.Trigger variant="outline" size="md" disabled={hidden.length === 0}>
                <HugeiconsIcon icon={FilterIcon} size={14} />
                Filter
            </Menu.Trigger>
            <Menu.Content>
                <Menu.Label>Filter by</Menu.Label>
                {#each hidden as filter (filter.column)}
                    <Menu.Item
                        onclick={() => {
                            void reveal(filter.column);
                        }}
                    >
                        {filter.label}
                    </Menu.Item>
                {/each}
            </Menu.Content>
        </Menu.Root>
    </Group.Root>
    {#each visible as filter (filter.column)}
        <Facet
            {table}
            {filter}
            open={opened === filter.column}
            onOpenChange={(open) => {
                opened = open ? filter.column : undefined;
            }}
            onRemove={() => {
                shown = shown.filter((id) => id !== filter.column);
                void restorePicker();
            }}
        />
    {/each}
    {#if visible.length > 0}
        <Button variant="ghost" size="md" onclick={reset}>
            Reset<HugeiconsIcon icon={Cancel01Icon} size={14} />
        </Button>
    {/if}
</div>
