<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { cn } from '@mielui/svelte/utils';
    import * as Table from '../../components/table';
    import type { DataTableViewProps } from '.';
    import Body from './data-table-body.svelte';
    import Header from './data-table-header.svelte';

    let {
        class: className,
        table,
        loading = false,
        selectable = false,
        caption,
        rowLabel,
        header,
        cell,
        empty,
        ...rest
    }: DataTableViewProps<TFeatures, TData> = $props();
</script>
<Table.ScrollArea tabindex="0" role="region" aria-label={caption ?? 'Data table'}>
    <Table.Root
        {...rest}
        aria-busy={loading || undefined}
        class={cn(className, '[&_th]:whitespace-nowrap [&_td]:whitespace-nowrap')}
    >
        {#if caption}
            <Table.Caption class="sr-only">{caption}</Table.Caption>
        {/if}
        <Header {table} {selectable} {header} />
        <Body {table} {loading} {selectable} {rowLabel} {cell} {empty} />
    </Table.Root>
</Table.ScrollArea>
