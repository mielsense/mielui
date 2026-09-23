<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...rest }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<tbody
    {...rest}
    data-ui="table-body"
    class={cn(className, '[&>tr:not(:last-child)>*]:border-b [&>tr:not(:last-child)>*]:border-border')}
>
    {@render children?.()}
</tbody>
