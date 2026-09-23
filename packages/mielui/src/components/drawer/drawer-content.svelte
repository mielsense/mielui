<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import type { DrawerContentProps } from '.';
    import { getDrawerContext } from './context';

    let {
        element = $bindable(null),
        children,
        onpointercancel,
        onpointerup,
        class: className,
        ...rest
    }: DrawerContentProps = $props();
    const drawer = getDrawerContext();
    let canceling = false;

    function cancelPointer(event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }) {
        onpointercancel?.(event);
        const panel = element;
        if (!panel?.classList.contains('vaul-dragging')) {
            return;
        }
        const transform = getComputedStyle(panel).transform;
        panel.style.transform = 'translate3d(0, 0, 0)';
        canceling = true;
        try {
            panel.dispatchEvent(
                new PointerEvent('pointerup', {
                    bubbles: true,
                    pointerId: event.pointerId,
                    pointerType: event.pointerType,
                    clientX: event.clientX,
                    clientY: event.clientY
                })
            );
        } finally {
            canceling = false;
        }
        panel.style.transform = transform;
        void panel.offsetHeight;
        panel.style.transition = 'transform var(--motion-duration-sheet) var(--ease-out)';
        panel.style.transform = 'translate3d(0, 0, 0)';
        if (drawer.overlay) {
            drawer.overlay.style.opacity = '1';
        }
    }
</script>
<Primitive.Content
    {...rest}
    bind:ref={element}
    onpointercancel={cancelPointer}
    onpointerup={(event) => {
        if (!canceling) {
            onpointerup?.(event);
        }
    }}
    data-ui="drawer-content"
    class={cn(className, 'fixed z-[120] flex max-h-[90dvh] flex-col bg-card text-foreground shadow-[var(--elevation-float)] outline-none data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:rounded-t-[var(--radius-xl)] data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:rounded-b-[var(--radius-xl)] data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-80 data-[vaul-drawer-direction=left]:max-w-[90vw] data-[vaul-drawer-direction=left]:max-h-none data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-80 data-[vaul-drawer-direction=right]:max-w-[90vw] data-[vaul-drawer-direction=right]:max-h-none [animation-duration:var(--motion-duration-sheet)]! [animation-timing-function:var(--ease-out)]! [transition-duration:var(--motion-duration-sheet)]! [&.vaul-dragging]:[transition-duration:0ms]! [transition-timing-function:var(--ease-out)]! data-[state=closed]:[animation-duration:var(--motion-duration-sheet-out)]! motion-reduce:[animation-duration:0ms]! motion-reduce:[transition-duration:0ms]!')}
>
    {@render children?.()}
</Primitive.Content>
