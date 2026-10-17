<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { TableBodyProps } from '.';

    let { children, class: className, ...rest }: TableBodyProps = $props();
</script>

<tbody
    {...rest}
    data-ui="table-body"
    class={cn(
        className,
        '[&>tr:not(:last-child)>*]:border-b-[length:var(--border-size)] [&>tr:not(:last-child)>*]:border-border'
    )}
>
    {@render children?.()}
</tbody>
