<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import {
        cn,
        isPointInSubmenuTriangle,
        lockBodyScroll,
        positionFloatingPanel,
        submenuPanelOffset
    } from '@mielui/svelte/utils';
    import { Popover as PopoverPrimitive } from 'bits-ui';
    import { onDestroy, onMount } from 'svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { Placement, PopoverContentProps } from '.';
    import { getPopoverContext } from './context.svelte';
    import { inertOutsidePopover } from './inert';

    const {
        children,
        class: classProp,
        surface,
        surfaceClass,
        allowClickOutside = true,
        dismissLayer = true,
        portal = true,
        refElement,
        role = 'dialog',
        tabindex = -1,
        focusTrap = true,
        lockScroll = true,
        id,
        'aria-modal': ariaModalProp,
        ...rest
    }: PopoverContentProps = $props();

    const context = getPopoverContext();
    const { id: key, state: popoverState } = context;

    let popover = $state<HTMLElement | undefined>();
    let dismissEl = $state<HTMLElement | undefined>();
    let positionFrame: number | undefined;
    let mounted = false;

    function updatePosition() {
        if (!popover) {
            return;
        }
        const reference = refElement ?? popoverState.buttonRef;
        if (!reference) {
            return;
        }

        const triggerWidth = popoverState.buttonRef?.getBoundingClientRect().width;
        if (triggerWidth) {
            popover.style.setProperty('--popover-trigger-width', `${triggerWidth}px`);
        }

        const placement = refElement ? 'right-start' : popoverState.placement;

        positionFloatingPanel(
            reference,
            popover,
            placement,
            submenuPanelOffset(placement, popoverState.hoverable)
        );
    }

    function schedulePosition() {
        if (positionFrame !== undefined) {
            return;
        }
        positionFrame = requestAnimationFrame(() => {
            positionFrame = undefined;
            updatePosition();
        });
    }

    onMount(() => {
        mounted = true;
        window.addEventListener('resize', schedulePosition);
        window.addEventListener('scroll', schedulePosition, true);
        window.visualViewport?.addEventListener('resize', schedulePosition);
        window.visualViewport?.addEventListener('scroll', schedulePosition);

        popoverState.popoverRef = popover;

        if (portal && document && popover) {
            document.body.appendChild(popover);
        }

        const ro = new ResizeObserver(schedulePosition);
        if (popoverState.buttonRef) {
            ro.observe(popoverState.buttonRef);
        }
        if (popover) {
            ro.observe(popover);
        }

        /**
         * Focus tracking for the open panel.
         *
         * These fire on document focus changes, including the focusout the browser
         * dispatches synchronously while the content is being removed from the DOM.
         * The DOM is read synchronously but the state write is deferred to a
         * microtask, so reactive state is never mutated in the middle of the Svelte
         * flush that unmounts us -- that throws `state_unsafe_mutation`.
         */
        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            if (!target) {
                return;
            }

            const openPopovers = Array.from(
                document.querySelectorAll<HTMLElement>('[data-floating-content]')
            );
            const inside = openPopovers.some((el) => el.contains(target));
            queueMicrotask(() => {
                if (mounted) {
                    popoverState.focusedInside = inside;
                }
            });
        };

        const handleFocusOut = () => {
            queueMicrotask(() => {
                if (mounted) {
                    popoverState.focusedInside = false;
                }
            });
        };

        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);

        onDestroy(() => {
            mounted = false;
            window.removeEventListener('resize', schedulePosition);
            window.removeEventListener('scroll', schedulePosition, true);
            window.visualViewport?.removeEventListener('resize', schedulePosition);
            window.visualViewport?.removeEventListener('scroll', schedulePosition);
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
            ro.disconnect();
            if (positionFrame !== undefined) {
                cancelAnimationFrame(positionFrame);
            }
            popoverState.popoverRef?.remove();
            popover?.remove();
        });
    });

    $effect(() => {
        if (!dismissEl || typeof document === 'undefined') {
            return;
        }
        document.body.appendChild(dismissEl);
        return () => {
            dismissEl?.remove();
        };
    });

    function cancelClose() {
        if (popoverState.closeTimeout) {
            if (popoverState.hoverable) {
                clearTimeout(popoverState.closeTimeout);
                popoverState.closeTimeout = undefined;
            }
        }
    }

    function scheduleClose(event: MouseEvent) {
        if (!popoverState.hoverable) {
            return;
        }
        if (popoverState.closeTimeout) {
            clearTimeout(popoverState.closeTimeout);
        }
        const resolvedPlacement = (popover?.dataset.placement ??
            popoverState.placement) as Placement;

        const inContactTriangle =
            popoverState.buttonRef &&
            popover &&
            isPointInSubmenuTriangle(
                { x: event.clientX, y: event.clientY },
                popoverState.buttonRef.getBoundingClientRect(),
                popover.getBoundingClientRect(),
                resolvedPlacement
            );
        const delay = inContactTriangle ? (popoverState.closeDelay ?? 180) : 0;
        if (delay <= 0) {
            popoverState.open = false;
            popoverState.closeTimeout = undefined;
            return;
        }

        popoverState.closeTimeout = setTimeout(() => {
            popoverState.open = false;
            popoverState.closeTimeout = undefined;
        }, delay);
    }

    $effect(() => {
        if (
            typeof document === 'undefined' ||
            !popoverState.open ||
            popoverState.hoverable ||
            !popoverState.inert ||
            !popover
        ) {
            return;
        }

        return inertOutsidePopover(popover, popoverState.buttonRef);
    });

    /**
     * Positions the panel the moment it opens, before the browser paints.
     *
     * This sets left/top *and* `--popover-trigger-width` synchronously, so the
     * panel never flashes at its (0,0) origin -- the cause of the tooltip-swap
     * jitter -- nor at auto width before snapping to the trigger, which was the
     * combobox jump. Without it we would rely on the ResizeObserver firing a frame
     * later.
     */
    $effect(() => {
        if (popoverState.open && popover) {
            updatePosition();
        }
    });

    $effect(() => {
        if (popoverState.open && !popoverState.hoverable && lockScroll) {
            return lockBodyScroll();
        }
    });
</script>

{#if popoverState.open && !popoverState.hoverable && popoverState.inert && allowClickOutside && dismissLayer}
    <div
        bind:this={dismissEl}
        data-overlay-root
        data-ui="popover-dismiss"
        class="fixed inset-0 z-[129]"
        aria-hidden="true"
    ></div>
{/if}

<div
    role="presentation"
    data-floating-content
    class={cn(
        'fixed left-0 top-0 z-[130] flex max-w-[calc(100vw-2*var(--popover-viewport-margin))] max-h-[calc(100vh-2*var(--popover-viewport-margin))] items-center justify-center'
    )}
    bind:this={popover as HTMLElement}
    onmouseenter={cancelClose}
    onmouseleave={scheduleClose}
>
    <PopoverPrimitive.ContentStatic
        {...rest}
        dir={rest.dir === 'auto' ? undefined : rest.dir ?? undefined}
        forceMount
        id={id ?? `popover-${String(key)}-content`}
        trapFocus={!popoverState.hoverable && focusTrap}
        preventScroll={false}
        onInteractOutside={(event) => {
            if (!allowClickOutside || (event.target instanceof Node && popoverState.buttonRef?.contains(event.target))) {
                event.preventDefault();
            }
        }}
        onOpenAutoFocus={(event) => {
            if (popoverState.hoverable || !focusTrap) {
                event.preventDefault();
            }
        }}
        onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (!popoverState.hoverable && popoverState.buttonRef?.isConnected) {
                popoverState.buttonRef.focus({ preventScroll: true });
            }
        }}
    >
        {#snippet child({ props, open })}
            {#if open}
                <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
                <div
                    {...props}
                    in:panelIn
                    out:panelOut
                    id={id ?? `popover-${String(key)}-content`}
                    dir={rest.dir}
                    {role}
                    aria-modal={ariaModalProp ??
                ((role === 'dialog' || role === 'alertdialog') && !popoverState.hoverable && popoverState.inert && focusTrap ? 'true' : undefined)}
                    aria-labelledby={rest['aria-labelledby'] ?? (rest['aria-label']
                ? undefined
                : role === 'dialog' || role === 'alertdialog'
                  ? context.titleId
                  : undefined)}
                    {tabindex}
                    data-ui="popover-content"
                    data-surface={surface}
                    class={cn(
                classProp,
                    overlaySurface(surface),
                'm-auto flex origin-top-left flex-col overflow-hidden text-sm text-[var(--color-foreground)]',
                'mielui-modal-frame shadow-[var(--elevation-float)] [--mielui-modal-inset:calc(var(--spacing)*0.5*var(--mielui-border-inset-scale,1))]',
                'max-w-[min(var(--popover-available-width,calc(100vw-2*var(--popover-viewport-margin))),calc(100vw-2*var(--popover-viewport-margin)))] max-h-[min(var(--popover-available-height,calc(100vh-2*var(--popover-viewport-margin))),calc(100vh-2*var(--popover-viewport-margin)))]'
            )}
                >
                    <!-- The inset surface: children live here, on the card fill. -->
                    <div
                        class={cn(
                    surfaceClass,
                    'min-h-0 max-h-[inherit] flex-1 overflow-auto overscroll-contain mielui-inset-surface p-3'
                )}
                    >
                        {@render children?.()}
                    </div>
                </div>
            {/if}
        {/snippet}
    </PopoverPrimitive.ContentStatic>
</div>
