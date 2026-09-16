<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr
    {...rest}
    data-ui="table-row"
    class={cn(className, 'transition-colors motion-reduce:transition-none hover:bg-secondary/40 data-[state=selected]:bg-primary/10')}
>
    {@render children?.()}
</tr>
