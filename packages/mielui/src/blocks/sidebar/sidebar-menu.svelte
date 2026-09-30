<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    import type { SidebarMenuProps } from './types';

    let { children, class: className, ...rest }: SidebarMenuProps = $props();
</script>

<ul
    {...rest}
    data-ui="sidebar-menu"
    class={cn(className, 'm-0 flex min-w-0 list-none flex-col gap-1 p-0')}
>
    {@render children?.()}
</ul>
