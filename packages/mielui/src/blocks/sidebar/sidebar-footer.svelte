<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    import type { SidebarFooterProps } from './types';

    let {
        children,
        class: className,
        element = $bindable(),
        ...rest
    }: SidebarFooterProps = $props();
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="sidebar-footer"
    class={cn(className, 'flex shrink-0 flex-col gap-2 p-3 group-data-[collapsed=true]/sidebar:px-2')}
>
    {@render children?.()}
</div>
