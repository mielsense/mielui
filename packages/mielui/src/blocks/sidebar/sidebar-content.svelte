<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getSidebarPanel } from './context.svelte';
    import type { SidebarContentProps } from './types';

    let {
        children,
        class: className,
        element = $bindable(),
        ...rest
    }: SidebarContentProps = $props();
    const panel = getSidebarPanel();
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="sidebar-content"
    class={cn(className, 'flex min-h-0 flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto overscroll-contain p-2', panel.variant === 'floating' && !panel.collapsed ? 'mielui-inset-surface' : undefined)}
>
    {@render children?.()}
</div>
