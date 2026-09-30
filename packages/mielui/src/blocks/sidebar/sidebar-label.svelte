<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getSidebarPanel } from './context.svelte';
    import type { SidebarLabelProps } from './types';

    let { children, class: className, ...rest }: SidebarLabelProps = $props();
    const panel = getSidebarPanel();
</script>

<span
    {...rest}
    data-ui="sidebar-label"
    class={cn(className, 'min-w-0 flex-1 truncate text-start', panel.collapsed ? 'hidden' : undefined)}
>
    {@render children?.()}
</span>
