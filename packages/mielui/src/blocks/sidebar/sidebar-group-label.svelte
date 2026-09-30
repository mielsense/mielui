<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { getSidebarPanel } from './context.svelte';
    import type { SidebarGroupLabelProps } from './types';

    let { children, class: className, ...rest }: SidebarGroupLabelProps = $props();
    const panel = getSidebarPanel();
</script>

<div
    {...rest}
    data-ui="sidebar-group-label"
    class={cn(className, 'px-2 py-1 text-sm font-medium text-foreground-muted', panel.collapsed ? 'hidden' : undefined)}
>
    {@render children?.()}
</div>
