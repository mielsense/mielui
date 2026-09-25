<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<tfoot
    {...rest}
    data-ui="table-footer"
    class={cn(className, 'data-[inset-position=top]:table-header-group font-medium [&>tr>*]:border-t [&>tr>*]:border-border')}
>
    {@render children?.()}
</tfoot>
