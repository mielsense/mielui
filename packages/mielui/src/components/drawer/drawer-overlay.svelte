<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import type { DrawerOverlayProps } from '.';
    import { getDrawerContext } from './context';

    let {
        element = $bindable(null),
        children,
        class: className,
        ...rest
    }: DrawerOverlayProps = $props();
    const drawer = getDrawerContext();
    $effect(() => {
        const current = element;
        drawer.overlay = current;
        return () => {
            if (drawer.overlay === current) {
                drawer.overlay = null;
            }
        };
    });
</script>
<Primitive.Overlay
    {...rest}
    bind:ref={element}
    data-ui="drawer-overlay"
    class={cn(className, 'mielui-overlay-scrim fixed inset-0 z-[115] [animation-duration:var(--motion-duration-overlay)]! [transition-duration:var(--motion-duration-overlay)]! motion-reduce:[animation-duration:0ms]! motion-reduce:[transition-duration:0ms]!')}
>
    {@render children?.()}
</Primitive.Overlay>
