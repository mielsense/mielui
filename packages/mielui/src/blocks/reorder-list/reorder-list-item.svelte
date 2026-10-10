<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ReorderListItemProps } from '.';
    import { getReorderList, setReorderItem } from './context.svelte';

    let { id, label, children, class: className, ...rest }: ReorderListItemProps = $props();
    const root = getReorderList();
    setReorderItem({
        get id() {
            return id;
        },
        get label() {
            return label;
        }
    });
</script>
<div
    {...rest}
    data-ui="reorder-list-item"
    data-reorder-item={id}
    data-lifted={root.lifted(id)}
    data-disabled={root.disabled || undefined}
    class={cn(
        className,
        'relative flex w-full items-center gap-2.5 rounded-[var(--radius-md)] border-[length:var(--border-size)] border-border bg-card py-2 ps-1.5 pe-3 text-start text-sm text-foreground transition-[background-color,border-color,box-shadow,translate] [transition-duration:var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none',
        root.lifted(id) ? 'z-10 shadow-[var(--elevation-float)]' : 'shadow-[var(--elevation-1)]',
        root.disabled && 'opacity-[var(--opacity-disabled)]'
    )}
>
    {@render children?.()}
</div>
