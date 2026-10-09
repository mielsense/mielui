<script lang="ts">
    import { overlayIn, overlayOut, sheetIn, sheetOut } from '@mielui/svelte/transition';
    import { cn, inertOutside, lockBodyScroll, visualViewportBounds } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import { tick } from 'svelte';
    import { useOverlayPresentation } from '../_internal/overlay/overlay.svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { SheetContentProps } from '.';
    import { getSheetContext } from './context.svelte';

    let {
        class: className,
        surface,
        allowClickOutside = true,
        children,
        side = 'right',
        ...rest
    }: SheetContentProps = $props();

    const sheet = getSheetContext();
    const { id, state: sheetState } = sheet;
    let portalEl = $state<HTMLDivElement>();
    let element = $state<HTMLDivElement>();
    const layer = useOverlayPresentation({
        isOpen: () => sheetState.open,
        panelEl: () => element
    });

    /**
     * Portal to `<body>` so the sheet escapes ancestor stacking contexts, the same
     * pattern Dialog uses, and the slide always paints over the page.
     */
    $effect(() => {
        if (!portalEl || typeof document === 'undefined') {
            return;
        }
        document.body.appendChild(portalEl);
        return () => {
            portalEl?.remove();
        };
    });
    $effect(() => {
        if (!sheetState.open || !portalEl) {
            return;
        }
        const releaseScroll = lockBodyScroll();
        const releaseInert = inertOutside([portalEl]);
        return () => {
            releaseInert();
            releaseScroll();
        };
    });
</script>

<!-- Keep the host in body before opening so Safari does not reparent active transitions. -->
<div bind:this={portalEl} use:visualViewportBounds data-overlay-root>
    <DialogPrimitive.Content
        preventScroll={false}
        trapFocus={layer.top}
        escapeKeydownBehavior={layer.top ? 'close' : 'defer-otherwise-close'}
        interactOutsideBehavior={layer.top ? 'close' : 'defer-otherwise-close'}
        id={`sheet-${id}`}
        forceMount
        onEscapeKeydown={(event) => {
            if (!layer.claimEscape()) {
                event.preventDefault();
            }
        }}
        onInteractOutside={(event) => {
            if (!allowClickOutside) {
                event.preventDefault();
            }
        }}
        onCloseAutoFocus={(event) => {
            if (sheetState.triggerRef?.isConnected) {
                event.preventDefault();
                void tick().then(() => {
                    if (!sheetState.open && sheetState.triggerRef?.isConnected) {
                        sheetState.triggerRef.focus({ preventScroll: true });
                    }
                });
            }
        }}
    >
        {#snippet child({ props, open })}
            {#if open}
                <div
                    class="pointer-events-none fixed inset-x-0 top-[var(--mielui-viewport-top)] z-[115] h-[var(--mielui-viewport-height)] [&>*]:pointer-events-auto"
                >
                    <div
                        in:overlayIn
                        out:overlayOut
                        data-ui="sheet-overlay"
                        class={cn(
                    // token-lint-disable-next-line no-literal-length
                    'mielui-overlay-scrim absolute inset-0'
                )}
                        aria-hidden="true"
                    ></div>
                    <div
                        {...props}
                        bind:this={element}
                        data-ui="sheet-content"
                        data-surface={surface}
                        data-side={side}
                        data-motion="sheet"
                        data-orientation="vertical"
                        in:sheetIn={{ side }}
                        out:sheetOut={{ side }}
                        class={cn(
                    className,
                    overlaySurface(surface),
                    'fixed top-[var(--mielui-viewport-top)] bottom-auto z-[120] flex h-[var(--mielui-viewport-height)] w-[calc(100%-var(--spacing)*8)] max-w-sm flex-col overflow-hidden border-y-0 pt-[max(var(--mielui-modal-inset),env(safe-area-inset-top))] pb-[max(var(--mielui-modal-inset),env(safe-area-inset-bottom))] text-foreground shadow-[var(--elevation-modal)] will-change-transform [backface-visibility:hidden]',
                    side === 'left'
                        ? 'left-0 rounded-l-none border-l-0 pl-[max(var(--mielui-modal-inset),env(safe-area-inset-left))]'
                        : 'right-0 rounded-r-none border-r-0 pr-[max(var(--mielui-modal-inset),env(safe-area-inset-right))]',
                    'mielui-modal-frame'
                )}
                        role="dialog"
                        aria-labelledby={sheet.titleId}
                        aria-describedby={sheet.descriptionId}
                        aria-modal="true"
                        id={`sheet-${id}`}
                        tabindex="-1"
                        {...rest}
                    >
                        <div
                            data-ui="sheet-surface"
                            class={cn(
                        'mielui-inset-surface relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-5',
                        side === 'left'
                            ? 'rounded-l-[calc((var(--mielui-plate-radius)-var(--border-size)-var(--mielui-modal-inset))*var(--mielui-border-inset-scale,1))]'
                            : 'rounded-r-[calc((var(--mielui-plate-radius)-var(--border-size)-var(--mielui-modal-inset))*var(--mielui-border-inset-scale,1))]',
                        '[&_[data-ui=sheet-header]]:pr-8'
                    )}
                        >
                            {@render children?.()}
                        </div>
                        {@render sheet.footer?.()}
                    </div>
                </div>
            {/if}
        {/snippet}
    </DialogPrimitive.Content>
</div>
