<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLTableAttributes } from 'svelte/elements';
    import { insetLayout } from '../_internal/inset-layout';

    type Props = HTMLTableAttributes & { variant?: 'default' | 'inset' };
    let { children, class: className, variant = 'default', ...rest }: Props = $props();

    const inset = [
        'mielui-inset-frame shadow-[var(--elevation-1)] [--table-row-wash:transparent]',
        '[--table-inner-radius:calc(var(--mielui-plate-radius)-var(--border-size)-var(--mielui-modal-inset))]',
        '[--table-ring:calc(var(--border-size)*var(--mielui-border-inset-scale,1))]',
        '[&>thead>tr>th]:border-b-0 [&>tfoot>tr>*]:border-0',
        '[&>tbody>tr>*]:border-border [&>tbody>tr>*]:bg-background [&>tbody>tr>*]:[corner-shape:squircle]',
        '[&>tbody>tr:hover>*]:[background-image:linear-gradient(var(--color-wash),var(--color-wash))] [&>tbody>tr[data-state=selected]>*]:[background-image:linear-gradient(var(--color-wash),var(--color-wash))]',
        '[&>tbody>tr:first-child>*]:border-t-[length:var(--table-ring)] [&>tbody>tr:last-child>*]:border-b-[length:var(--table-ring)]',
        '[&>tbody>tr>*:first-child]:border-s-[length:var(--table-ring)] [&>tbody>tr>*:last-child]:border-e-[length:var(--table-ring)]',
        '[&>tbody>tr:first-child>*:first-child]:rounded-ss-[var(--table-inner-radius)] [&>tbody>tr:first-child>*:last-child]:rounded-se-[var(--table-inner-radius)]',
        '[&>tbody>tr:last-child>*:first-child]:rounded-es-[var(--table-inner-radius)] [&>tbody>tr:last-child>*:last-child]:rounded-ee-[var(--table-inner-radius)]'
    ];
</script>

<table
    {...rest}
    use:insetLayout={variant === 'inset'}
    data-ui="table"
    data-variant={variant}
    class={cn(
        className,
        'w-full border-separate border-spacing-0 text-sm leading-6 tabular-nums',
        variant === 'inset' && inset
    )}
>
    {@render children?.()}
</table>
