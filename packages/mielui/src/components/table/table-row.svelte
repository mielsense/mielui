<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr
    {...rest}
    data-ui="table-row"
    class={cn(
        className,
        'transition-colors [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none [tbody>&]:hover:bg-[var(--table-row-wash,var(--color-wash))] data-[state=selected]:bg-[var(--table-row-wash,var(--color-wash))]'
    )}
>
    {@render children?.()}
</tr>
