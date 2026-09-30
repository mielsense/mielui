<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    import type { SidebarHeaderProps } from './types';

    let {
        children,
        class: className,
        element = $bindable(),
        ...rest
    }: SidebarHeaderProps = $props();
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="sidebar-header"
    class={cn(className, 'flex shrink-0 items-center gap-2 p-3 group-data-[collapsed=true]/sidebar:flex-col group-data-[collapsed=true]/sidebar:px-2')}
>
    {@render children?.()}
</div>
