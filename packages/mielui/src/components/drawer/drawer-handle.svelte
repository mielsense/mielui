<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import type { DrawerHandleProps } from '.';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: DrawerHandleProps = $props();
</script>
<Primitive.Handle
    {...rest}
    bind:ref={element}
    preventCycle
    data-ui="drawer-handle"
    class={cn(
        className,
        'mx-auto mt-2.5 mb-1 h-1! w-10! shrink-0 rounded-full! bg-[var(--color-border-strong)]! opacity-100! transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-[var(--mielui-control-border)]! active:bg-[var(--mielui-control-border)]! motion-reduce:transition-none',
        'group-data-[vaul-drawer-direction=top]/drawer:order-last group-data-[vaul-drawer-direction=top]/drawer:mt-1 group-data-[vaul-drawer-direction=top]/drawer:mb-2.5',
        'group-data-[vaul-drawer-direction=left]/drawer:absolute! group-data-[vaul-drawer-direction=left]/drawer:top-1/2 group-data-[vaul-drawer-direction=left]/drawer:right-2 group-data-[vaul-drawer-direction=left]/drawer:m-0! group-data-[vaul-drawer-direction=left]/drawer:h-10! group-data-[vaul-drawer-direction=left]/drawer:w-1! group-data-[vaul-drawer-direction=left]/drawer:-translate-y-1/2',
        'group-data-[vaul-drawer-direction=right]/drawer:absolute! group-data-[vaul-drawer-direction=right]/drawer:top-1/2 group-data-[vaul-drawer-direction=right]/drawer:left-2 group-data-[vaul-drawer-direction=right]/drawer:m-0! group-data-[vaul-drawer-direction=right]/drawer:h-10! group-data-[vaul-drawer-direction=right]/drawer:w-1! group-data-[vaul-drawer-direction=right]/drawer:-translate-y-1/2'
    )}
>
    {@render children?.()}
</Primitive.Handle>
