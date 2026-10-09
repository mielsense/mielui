<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLThAttributes } from 'svelte/elements';

    let { children, class: className, scope = 'col', ...rest }: HTMLThAttributes = $props();
</script>

<th
    {...rest}
    {scope}
    data-ui="table-head"
    class={cn(
        className,
        'h-10 px-3 py-1.5 text-start align-middle font-medium text-foreground-muted [thead_&]:h-9 [thead_&]:border-b-[length:var(--border-size)] [thead_&]:border-border [thead_&]:text-[length:var(--font-size-label)]'
    )}
>
    {@render children?.()}
</th>
