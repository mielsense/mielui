<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLTableAttributes } from 'svelte/elements';

    type Props = HTMLTableAttributes & { variant?: 'default' | 'inset' };
    let { children, class: className, variant = 'default', ...rest }: Props = $props();
</script>

<table
    {...rest}
    data-ui="table"
    data-variant={variant}
    class={cn(
        className,
        'w-full border-separate border-spacing-0 text-sm leading-6 [&>thead>tr:first-child>th:first-child]:rounded-ss-[var(--radius-md)] [&>thead>tr:first-child>th:last-child]:rounded-se-[var(--radius-md)]',
        variant === 'inset'
            ? 'mielui-inset-frame [&>thead>tr>th]:bg-card [&>tbody>tr>td]:bg-card [&>tbody>tr>th]:bg-card [&>tbody>tr:hover>*]:bg-secondary [&>tbody>tr[data-state=selected]>*]:bg-primary/10 [&>tbody>tr:last-child>*:first-child]:rounded-es-[var(--radius-md)] [&>tbody>tr:last-child>*:last-child]:rounded-ee-[var(--radius-md)] [&>tfoot>tr>*]:border-0'
            : 'rounded-[var(--radius-lg)] border border-border'
    )}
>
    {@render children?.()}
</table>
