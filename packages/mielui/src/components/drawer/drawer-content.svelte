<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Drawer as Primitive } from 'vaul-svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { DrawerContentProps } from '.';
    import { getDrawerContext } from './context';

    let {
        element = $bindable(null),
        children,
        onOpenAutoFocus,
        onpointercancel,
        onpointerup,
        surface,
        class: className,
        ...rest
    }: DrawerContentProps = $props();
    const drawer = getDrawerContext();
    let canceling = false;
    let focusFrame = 0;

    function focusPanel(event: Event) {
        onOpenAutoFocus?.(event);
        if (event.defaultPrevented) {
            return;
        }
        event.preventDefault();
        cancelAnimationFrame(focusFrame);
        focusFrame = requestAnimationFrame(() => {
            element?.focus({ preventScroll: true });
        });
    }

    $effect(() => {
        return () => {
            cancelAnimationFrame(focusFrame);
        };
    });

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
    onOpenAutoFocus={focusPanel}
    onpointercancel={cancelPointer}
    onpointerup={(event) => {
        if (!canceling) {
            onpointerup?.(event);
        }
    }}
    data-ui="drawer-content"
    class={cn(
        'group/drawer pointer-events-none! fixed z-[120] flex outline-none [--drawer-gap:calc(var(--spacing)*2)] after:hidden!',
        'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=bottom]:w-fit data-[vaul-drawer-direction=bottom]:max-w-full data-[vaul-drawer-direction=bottom]:px-[var(--drawer-gap)] data-[vaul-drawer-direction=bottom]:pb-[max(var(--drawer-gap),env(safe-area-inset-bottom))]',
        'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mx-auto data-[vaul-drawer-direction=top]:w-fit data-[vaul-drawer-direction=top]:max-w-full data-[vaul-drawer-direction=top]:px-[var(--drawer-gap)] data-[vaul-drawer-direction=top]:pt-[max(var(--drawer-gap),env(safe-area-inset-top))]',
        'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:max-w-full data-[vaul-drawer-direction=left]:py-[var(--drawer-gap)] data-[vaul-drawer-direction=left]:pl-[max(var(--drawer-gap),env(safe-area-inset-left))]',
        'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:max-w-full data-[vaul-drawer-direction=right]:py-[var(--drawer-gap)] data-[vaul-drawer-direction=right]:pr-[max(var(--drawer-gap),env(safe-area-inset-right))]',
        '[animation-duration:var(--motion-duration-sheet)]! [animation-timing-function:var(--ease-out)]! [transition-duration:var(--motion-duration-sheet)]! [&.vaul-dragging]:[transition-duration:0ms]! [transition-timing-function:var(--ease-out)]! data-[state=closed]:[animation-duration:var(--motion-duration-sheet-out)]! data-[state=closed]:[animation-fill-mode:forwards]! motion-reduce:[animation-duration:0ms]! motion-reduce:[transition-duration:0ms]!'
    )}
>
    <div
        data-ui="drawer-panel"
        data-surface={surface}
        class={cn(
            className,
            overlaySurface(surface),
            'mielui-modal-frame pointer-events-auto flex min-h-0 flex-col overflow-hidden text-foreground shadow-[var(--elevation-modal)]',
            'group-data-[vaul-drawer-direction=bottom]/drawer:max-h-[calc(100dvh-var(--drawer-gap)*2-var(--spacing)*8)] group-data-[vaul-drawer-direction=bottom]/drawer:w-xl group-data-[vaul-drawer-direction=bottom]/drawer:max-w-[calc(100vw-var(--drawer-gap)*2)]',
            'group-data-[vaul-drawer-direction=top]/drawer:max-h-[calc(100dvh-var(--drawer-gap)*2-var(--spacing)*8)] group-data-[vaul-drawer-direction=top]/drawer:w-xl group-data-[vaul-drawer-direction=top]/drawer:max-w-[calc(100vw-var(--drawer-gap)*2)]',
            'group-data-[vaul-drawer-direction=left]/drawer:w-96 group-data-[vaul-drawer-direction=left]/drawer:max-w-[calc(100vw-var(--drawer-gap)*2-var(--spacing)*8)]',
            'group-data-[vaul-drawer-direction=right]/drawer:w-96 group-data-[vaul-drawer-direction=right]/drawer:max-w-[calc(100vw-var(--drawer-gap)*2-var(--spacing)*8)]'
        )}
    >
        <div
            data-ui="drawer-surface"
            class="mielui-inset-surface relative flex min-h-0 flex-1 flex-col overflow-hidden"
        >
            {@render children?.()}
        </div>
        {@render drawer.footer?.()}
    </div>
</Primitive.Content>
