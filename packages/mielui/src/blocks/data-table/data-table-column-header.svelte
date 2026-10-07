<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { ArrowDown02Icon, ArrowUp02Icon, ArrowUpDownIcon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import { FlexRender } from '@tanstack/svelte-table';
    import { getContext } from 'svelte';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { DataTableColumnHeaderProps, DataTableLabels } from '.';
    import { sortableColumn } from './features';

    let { header, class: className }: DataTableColumnHeaderProps<TFeatures, TData> = $props();
    const labels = getContext<(() => DataTableLabels | undefined) | undefined>('data-table-labels');
    const column = $derived(sortableColumn(header.column));
    const sorted = $derived(column.getIsSorted?.());
    const next = $derived(column.getNextSortingOrder?.());
    const hint = $derived(
        next === 'asc'
            ? (labels?.()?.sortAscending ?? 'Sort ascending')
            : next === 'desc'
              ? (labels?.()?.sortDescending ?? 'Sort descending')
              : (labels?.()?.clearSorting ?? 'Clear sorting')
    );
</script>

{#if column.getCanSort?.()}
    <button
        type="button"
        data-ui="data-table-column-header"
        data-sorted={sorted || undefined}
        title={hint}
        class={cn(
            className,
            'group/sort -mx-1.5 inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-[var(--radius-sm)] px-1.5 text-start font-medium text-foreground-muted outline-none transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-foreground/[0.06] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] data-sorted:text-foreground motion-reduce:transition-none'
        )}
        onclick={(event) => {
            column.toggleSorting?.(undefined, event.shiftKey);
        }}
    >
        <FlexRender {header} />
        <HugeiconsIcon
            icon={sorted === 'asc'
                ? ArrowUp02Icon
                : sorted === 'desc'
                  ? ArrowDown02Icon
                  : ArrowUpDownIcon}
            size={14}
            aria-hidden="true"
            class={cn(
                'shrink-0 transition-opacity [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none',
                !sorted &&
                    'opacity-0 group-hover/sort:opacity-60 group-focus-visible/sort:opacity-60'
            )}
        />
    </button>
{:else}
    <FlexRender {header} />
{/if}
