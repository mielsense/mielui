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
    class={cn(className, 'relative flex w-full items-center gap-3 rounded-[var(--radius-md)] border-[length:var(--border-size)] px-3 py-2.5 text-left text-sm text-foreground transition-[background-color,border-color,box-shadow,translate] [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] motion-reduce:transition-none', root.lifted(id) ? 'z-10 border-primary bg-secondary shadow-[var(--elevation-float)]' : 'border-border bg-card', root.disabled && 'opacity-[var(--opacity-disabled)]')}
>
    {@render children?.()}
</div>
