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
    data-ui="drawer-footer"
    class={cn(className, 'flex flex-wrap items-center justify-end gap-2 px-5 pb-[max(calc(var(--spacing)*5),env(safe-area-inset-bottom))] pt-3')}
>
    {@render children?.()}
</div>
