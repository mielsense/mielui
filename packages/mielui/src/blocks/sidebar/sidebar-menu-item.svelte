<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    import type { SidebarMenuItemProps } from './types';

    let { children, class: className, ...rest }: SidebarMenuItemProps = $props();
</script>

<li {...rest} data-ui="sidebar-menu-item" class={cn(className, 'relative min-w-0')}>
    {@render children?.()}
</li>
