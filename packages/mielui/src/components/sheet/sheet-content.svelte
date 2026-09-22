<script lang="ts">
    import { overlayIn, overlayOut, sheetIn, sheetOut } from '@mielui/svelte/transition';
    import { cn, visualViewportBounds } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
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
</script>

<!-- Keep the host in body before opening so Safari does not reparent active transitions. -->
<div bind:this={portalEl} use:visualViewportBounds data-overlay-root>
    <DialogPrimitive.Content
        id={`sheet-${id}`}
        forceMount
        onInteractOutside={(event) => {
            if (!allowClickOutside) {
                event.preventDefault();
            }
        }}
        onCloseAutoFocus={(event) => {
            if (sheetState.triggerRef?.isConnected) {
                event.preventDefault();
                sheetState.triggerRef?.focus({ preventScroll: true });
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
                    // token-lint-disable-next-line no-literal-length
                    `fixed top-[calc(var(--mielui-viewport-top)+0.5rem)] bottom-auto z-[120] flex h-[calc(var(--mielui-viewport-height)-1rem)] w-[calc(100%-1rem)] max-w-sm flex-col overflow-hidden text-foreground shadow-[var(--elevation-float)] will-change-transform [backface-visibility:hidden] ${
                        side === 'left' ? 'left-2' : 'right-2'
                    }`,
                    'mielui-modal-frame [--mielui-modal-inset:calc(var(--spacing)*0.5)]'
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
                        '[&_[data-ui=sheet-header]]:pr-8'
                    )}
                        >
                            {@render children?.()}
                        </div>
                    </div>
                </div>
            {/if}
        {/snippet}
    </DialogPrimitive.Content>
</div>
