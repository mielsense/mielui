<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { Input } from '../../components/input';
    import { cn } from '../../utils';
    import type { DataTableFilterProps } from '.';
    import { filterableColumn } from './features';

    let { table, column, label, ...rest }: DataTableFilterProps<TFeatures, TData> = $props();
    const target = $derived(table.getColumn(column));
    const filtering = $derived(target ? filterableColumn(target) : undefined);
    const value = $derived(filtering?.getFilterValue?.());
</script>
<Input
    {...rest}
    placeholder={rest.placeholder ?? undefined}
    class={cn(rest.class)}
    type="search"
    aria-label={label}
    value={typeof value === 'string' ? value : ''}
    disabled={rest.disabled || !filtering?.getCanFilter?.()}
    oninput={(event) => {
                filtering?.setFilterValue?.(event.currentTarget.value);
            }}
/>
