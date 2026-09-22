<script lang="ts">
    import { Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import { dialogIn, dialogOut, overlayIn, overlayOut } from '@mielui/svelte/transition';
    import { cn, visualViewportBounds } from '@mielui/svelte/utils';
    import { Dialog as DialogPrimitive } from 'bits-ui';
    import type { TransitionConfig } from 'svelte/transition';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { DialogContentProps } from '.';
    import { getDialogContext } from './context.svelte';

    let {
        class: className,
        surface,
        allowClickOutside = true,
        allowEscape = true,
        role = 'dialog',
        contentClass = '',
        overlayClass = '',
        surfaceClass = '',
        panelIdPrefix = 'dialog',
        showClose = true,
        size,
        children,
        ...rest
    }: DialogContentProps = $props();

    const dialog = getDialogContext();

    function dialogMotion(node: Element, transition: (node: Element) => TransitionConfig) {
        return dialog.motion === 'none' ? { duration: 0 } : transition(node);
    }

    const resolvedSize = $derived(
        size ?? (dialog.state.orientation === 'horizontal' ? 'lg' : 'md')
    );
    const sizeClass = $derived(
        (dialog.state.orientation === 'horizontal'
            ? {
                  sm: 'max-w-sm',
                  md: 'max-w-md',
                  lg: 'max-w-xl',
                  xl: 'max-w-2xl'
              }
            : {
                  sm: 'max-w-xs',
                  md: 'max-w-sm',
                  lg: 'max-w-md',
                  xl: 'max-w-xl'
              })[resolvedSize]
    );
    const isDestructiveAlert = $derived(role === 'alertdialog' && dialog.state.error);
    const contentId = $derived(`${panelIdPrefix}-${dialog.id}`);
    let element = $state<HTMLDivElement>();
    let portalEl = $state<HTMLDivElement>();

    $effect(() => {
        dialog.contentId = contentId;
    });

    /**
     * Portal the dialog to `<body>` so its z-index escapes ancestor stacking
     * contexts such as flex items with a z-index or transformed parents.
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
        id={contentId}
        forceMount
        onInteractOutside={(event) => {
            if (!allowClickOutside) {
                event.preventDefault();
            }
        }}
        onEscapeKeydown={(event) => {
            if (!allowEscape) {
                event.preventDefault();
            }
        }}
        onOpenAutoFocus={(event) => {
            const cancel = element?.querySelector<HTMLButtonElement>('[data-dialog-cancel]');
            if (role === 'alertdialog' && cancel) {
                event.preventDefault();
                cancel.focus({ preventScroll: true });
            }
        }}
        onCloseAutoFocus={(event) => {
            if (dialog.returnFocusEl?.isConnected) {
                event.preventDefault();
                dialog.returnFocusEl?.focus({ preventScroll: true });
            }
        }}
    >
        {#snippet child({ props, open })}
            {#if open}
                <div
                    class="fixed inset-x-0 top-[var(--mielui-viewport-top)] z-[115] h-[var(--mielui-viewport-height)]"
                >
                    <div
                        in:dialogMotion={overlayIn}
                        out:dialogMotion={overlayOut}
                        data-ui="dialog-overlay"
                        class={cn(
                    overlayClass,
                    'mielui-overlay-scrim absolute inset-0'
                )}
                    ></div>
                    <div
                        in:dialogMotion={dialogIn}
                        out:dialogMotion={dialogOut}
                        {...props}
                        bind:this={element}
                        data-motion={dialog.motion === 'none' ? 'none' : 'dialog'}
                        class={cn(
                    contentClass,
                    className,
                    overlaySurface(surface),
                    'mielui-modal-frame origin-center text-foreground shadow-[var(--elevation-modal)]',
                    // token-lint-disable-next-line no-literal-length
                    'fixed top-[var(--mielui-viewport-center)] left-1/2 z-[120] m-auto flex min-h-20 w-[calc(100%-var(--overlay-gutter))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden md:top-[calc(var(--mielui-viewport-center)-3rem)] md:w-full max-h-[calc(var(--mielui-viewport-height)-var(--overlay-gutter))]',
                    sizeClass
                )}
                        {role}
                        data-ui="dialog-panel"
                        data-surface={surface}
                        data-orientation={dialog.state.orientation}
                        data-destructive={isDestructiveAlert || undefined}
                        aria-labelledby={dialog.titleId}
                        aria-describedby={dialog.descriptionId}
                        aria-modal="true"
                        id={contentId}
                        tabindex="-1"
                        {...rest}
                    >
                        {#if dialog.headerSlot}
                            <div
                                {...dialog.headerSlot.rest}
                                data-ui="dialog-frame-header"
                                data-orientation={dialog.state.orientation}
                                class={cn(
                            dialog.headerSlot.className,
                            'flex w-full flex-row items-center gap-2'
                        )}
                            >
                                {@render dialog.headerSlot.children?.()}
                            </div>
                        {/if}
                        <div
                            class={cn(
                        surfaceClass,
                        'relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-5',
                        showClose && '[&_[data-ui=dialog-header]]:pr-8'
                    )}
                            data-ui="dialog-surface"
                        >
                            {#if showClose}
                                <button
                                    type="button"
                                    onclick={() => {
                                        dialog.state.open = false;
                                    }}
                                    aria-label="Close"
                                    class="absolute top-3 right-3 z-[2] inline-flex size-8 items-center justify-center rounded-[var(--radius-md)] text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                                >
                                    <HugeiconsIcon icon={X} size={16} />
                                </button>
                            {/if}
                            {@render children?.()}
                        </div>
                        {#if dialog.footerSlot}
                            <div
                                {...dialog.footerSlot.rest}
                                data-ui="dialog-footer"
                                data-orientation={dialog.state.orientation}
                                class={cn(
                            dialog.footerSlot.className,
                            'flex w-full flex-row items-center px-1 py-1.5'
                        )}
                            >
                                {@render dialog.footerSlot.children?.()}
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}
        {/snippet}
    </DialogPrimitive.Content>
</div>
