<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { DataTableToolbarProps } from '.';

    let { children, class: className, ...rest }: DataTableToolbarProps = $props();
</script>
<div
    {...rest}
    data-ui="data-table-toolbar"
    class={cn(className, 'flex flex-wrap items-center justify-between gap-3')}
>
    {@render children?.()}
</div>
