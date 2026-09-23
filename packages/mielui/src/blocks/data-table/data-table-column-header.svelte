<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { ArrowDown02Icon, ArrowUp02Icon, ArrowUpDownIcon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { FlexRender } from '@tanstack/svelte-table';
    import * as Menu from '../../components/dropdown-menu';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { DataTableColumnHeaderProps } from '.';
    import { sortableColumn } from './features';

    let { header, class: className }: DataTableColumnHeaderProps<TFeatures, TData> = $props();
    const column = $derived(sortableColumn(header.column));
    const sorted = $derived(column.getIsSorted?.());
</script>
{#if column.getCanSort?.()}
    <Menu.Root>
        <Menu.Trigger
            unstyled
            class={cn(className, 'group/sort inline-flex min-h-8 items-center gap-1.5 rounded-sm text-start font-medium text-foreground-muted outline-none hover:text-foreground focus-visible:shadow-[var(--focus-ring)]')}
        >
            <FlexRender {header} />
            <HugeiconsIcon
                icon={sorted === 'asc' ? ArrowUp02Icon : sorted === 'desc' ? ArrowDown02Icon : ArrowUpDownIcon}
                size={14}
                class={cn('shrink-0 transition-opacity [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none', !sorted && 'opacity-0 group-hover/sort:opacity-60 group-focus-visible/sort:opacity-60')}
            />
        </Menu.Trigger>
        <Menu.Content>
            <Menu.RadioGroup
                value={sorted || ''}
                onValueChange={(value) => {
                column.toggleSorting?.(value === 'desc', false);
            }}
            >
                <Menu.RadioItem value="asc">
                    <HugeiconsIcon icon={ArrowUp02Icon} size={14} />
                    Ascending
                </Menu.RadioItem>
                <Menu.RadioItem value="desc">
                    <HugeiconsIcon icon={ArrowDown02Icon} size={14} />
                    Descending
                </Menu.RadioItem>
            </Menu.RadioGroup>
            {#if sorted}
                <Menu.Separator />
                <Menu.Item
                    onclick={() => {
                column.clearSorting?.();
            }}
                >
                    Clear sorting
                </Menu.Item>
            {/if}
        </Menu.Content>
    </Menu.Root>
{:else}
    <FlexRender {header} />
{/if}
