<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLTdAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLTdAttributes = $props();
</script>

<td
    {...rest}
    data-ui="table-cell"
    class={cn(className, 'px-4 py-3 text-start align-middle text-foreground')}
>
    {@render children?.()}
</td>
