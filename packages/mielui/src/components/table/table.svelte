<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLTableAttributes } from 'svelte/elements';
    import { insetLayout } from '../_internal/inset-layout';

    type Props = HTMLTableAttributes & { variant?: 'default' | 'inset' };
    let { children, class: className, variant = 'default', ...rest }: Props = $props();
</script>

<table
    {...rest}
    use:insetLayout={variant === 'inset'}
    data-ui="table"
    data-variant={variant}
    class={cn(
        className,
        'w-full border-separate border-spacing-0 text-sm leading-6 [&>thead>tr:first-child>th:first-child]:rounded-ss-[var(--table-inner-radius)] [&>thead>tr:first-child>th:last-child]:rounded-se-[var(--table-inner-radius)]',
        variant === 'inset'
            ? '[--table-inner-radius:calc(var(--radius-xl)-var(--border-size)-var(--mielui-modal-inset))] mielui-inset-frame [&>thead>tr>th]:bg-card [&>tbody>tr>td]:bg-card [&>tbody>tr>th]:bg-card [&>tbody>tr:hover>*]:bg-secondary [&>tbody>tr[data-state=selected]>*]:bg-primary/10 [&>tbody>tr:last-child>*:first-child]:rounded-es-[var(--table-inner-radius)] [&>tbody>tr:last-child>*:last-child]:rounded-ee-[var(--table-inner-radius)] [&>tfoot>tr>*]:border-0'
            : '[--table-inner-radius:calc(var(--radius-lg)-var(--border-size))] rounded-[var(--radius-lg)] border border-border'
    )}
>
    {@render children?.()}
</table>
