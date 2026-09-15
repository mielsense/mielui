<script lang="ts">
    import X from '@lucide/svelte/icons/x';
    import { useOverlay } from '@mielui/svelte/components/_internal/overlay';
    import { dialogIn, dialogOut, overlayIn, overlayOut } from '@mielui/svelte/transition';
    import { cn, visualViewportBounds } from '@mielui/svelte/utils';
    import type { DialogContentProps } from '.';
    import { getDialogContext } from './context.svelte';

    let {
        class: className,
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
    let element = $state<HTMLElement>();
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

    /** Shared overlay behavior: focus trap, click-outside, Escape, body lock. */
    useOverlay({
        isOpen: () => dialog.state.open,
        panelEl: () => element,
        onClose: () => {
            dialog.state.open = false;
        },
        allowClickOutside: () => allowClickOutside,
        allowEscape: () => allowEscape,
        returnFocus: () => dialog.returnFocusEl
    });
</script>

<!-- Keep the host in body before opening so Safari does not reparent active transitions. -->
<div bind:this={portalEl} use:visualViewportBounds data-overlay-root>
    {#if dialog.state.open}
        <div
            class="fixed inset-x-0 top-[var(--mielui-viewport-top)] z-[115] h-[var(--mielui-viewport-height)]"
        >
            <div
                in:overlayIn
                out:overlayOut
                data-ui="dialog-overlay"
                class={cn(
                    overlayClass,
                    'mielui-overlay-scrim absolute inset-0'
                )}
            ></div>
            <div
                in:dialogIn
                out:dialogOut
                bind:this={element}
                data-motion="dialog"
                class={cn(
                    contentClass,
                    className,
                    'mielui-modal-frame origin-center text-foreground shadow-[var(--elevation-modal)]',
                    // token-lint-disable-next-line no-literal-length
                    'fixed top-[var(--mielui-viewport-center)] left-1/2 z-[120] m-auto flex min-h-20 w-[calc(100%-var(--overlay-gutter))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden md:top-[calc(var(--mielui-viewport-center)-3rem)] md:w-full max-h-[calc(var(--mielui-viewport-height)-var(--overlay-gutter))]',
                    sizeClass
                )}
                {role}
                data-ui="dialog-panel"
                data-orientation={dialog.state.orientation}
                data-destructive={isDestructiveAlert || undefined}
                aria-modal="true"
                id={contentId}
                aria-labelledby={`${dialog.id}-title`}
                aria-describedby={`${dialog.id}-desc`}
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
                            <X size={16} />
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
</div>
