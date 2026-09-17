<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { DrawerRegionProps } from '.';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: DrawerRegionProps = $props();
</script>
<div
    {...rest}
    bind:this={element}
    data-ui="drawer-body"
    class={cn(className, 'min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4')}
>
    {@render children?.()}
</div>
