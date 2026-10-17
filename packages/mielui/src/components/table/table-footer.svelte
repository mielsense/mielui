<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TableFooterProps } from '.';

    let { children, class: className, ...rest }: TableFooterProps = $props();
</script>

<tfoot
    {...rest}
    data-ui="table-footer"
    class={cn(
        className,
        'data-[inset-position=top]:table-header-group font-medium [&>tr>*]:border-t-[length:var(--border-size)] [&>tr>*]:border-border'
    )}
>
    {@render children?.()}
</tfoot>
