<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { DrawerContentProps } from '.';
    import { getDrawerContext } from './context';

    let {
        element = $bindable(null),
        children,
        onpointercancel,
        onpointerup,
        surface,
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
    data-surface={surface}
    class={cn(
        className,
        overlaySurface(surface),
        'mielui-modal-frame fixed z-[120] flex max-h-[90dvh] flex-col text-foreground shadow-[var(--elevation-float)] outline-none',
        'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:rounded-b-none data-[vaul-drawer-direction=bottom]:border-b-0 data-[vaul-drawer-direction=bottom]:pb-[env(safe-area-inset-bottom)] data-[vaul-drawer-direction=bottom]:[&>[data-ui=drawer-surface]]:rounded-b-none',
        'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:rounded-t-none data-[vaul-drawer-direction=top]:border-t-0 data-[vaul-drawer-direction=top]:pt-[env(safe-area-inset-top)] data-[vaul-drawer-direction=top]:[&>[data-ui=drawer-surface]]:rounded-t-none',
        'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-80 data-[vaul-drawer-direction=left]:max-w-[90vw] data-[vaul-drawer-direction=left]:max-h-none data-[vaul-drawer-direction=left]:rounded-l-none data-[vaul-drawer-direction=left]:border-l-0 data-[vaul-drawer-direction=left]:pl-[env(safe-area-inset-left)] data-[vaul-drawer-direction=left]:[&>[data-ui=drawer-surface]]:rounded-l-none',
        'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-80 data-[vaul-drawer-direction=right]:max-w-[90vw] data-[vaul-drawer-direction=right]:max-h-none data-[vaul-drawer-direction=right]:rounded-r-none data-[vaul-drawer-direction=right]:border-r-0 data-[vaul-drawer-direction=right]:pr-[env(safe-area-inset-right)] data-[vaul-drawer-direction=right]:[&>[data-ui=drawer-surface]]:rounded-r-none',
        '[animation-duration:var(--motion-duration-sheet)]! [animation-timing-function:var(--ease-out)]! [transition-duration:var(--motion-duration-sheet)]! [&.vaul-dragging]:[transition-duration:0ms]! [transition-timing-function:var(--ease-out)]! data-[state=closed]:[animation-duration:var(--motion-duration-sheet-out)]! motion-reduce:[animation-duration:0ms]! motion-reduce:[transition-duration:0ms]!'
    )}
>
    <div
        data-ui="drawer-surface"
        class="mielui-inset-surface relative flex min-h-0 flex-1 flex-col overflow-hidden"
    >
        {@render children?.()}
    </div>
    {@render drawer.footer?.()}
</Primitive.Content>
