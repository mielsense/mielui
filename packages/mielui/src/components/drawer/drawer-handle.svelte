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
    class={cn(className, 'mx-auto my-3 h-1! w-10! shrink-0 rounded-full! bg-foreground/20!')}
>
    {@render children?.()}
</Primitive.Handle>
