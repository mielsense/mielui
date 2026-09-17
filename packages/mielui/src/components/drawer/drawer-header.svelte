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
    data-ui="drawer-header"
    class={cn(className, 'flex flex-col gap-1.5 px-5 pt-5')}
>
    {@render children?.()}
</div>
