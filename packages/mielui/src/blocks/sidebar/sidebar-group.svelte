<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    import type { SidebarGroupProps } from './types';

    let {
        children,
        class: className,
        element = $bindable(),
        ...rest
    }: SidebarGroupProps = $props();
</script>

<div
    {...rest}
    bind:this={element}
    data-ui="sidebar-group"
    class={cn(className, 'flex min-w-0 flex-col gap-2')}
>
    {@render children?.()}
</div>
