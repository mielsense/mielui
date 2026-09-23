<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLThAttributes } from 'svelte/elements';

    let { children, class: className, scope = 'col', ...rest }: HTMLThAttributes = $props();
</script>

<th
    {...rest}
    {scope}
    data-ui="table-head"
    class={cn(className, 'px-4 py-3 text-start align-middle font-medium text-foreground-muted border-b border-border')}
>
    {@render children?.()}
</th>
