<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { Popover as PopoverPrimitive } from 'bits-ui';
    import { overlaySurface } from '../_internal/surface';
    import type { PopoverContentProps } from '.';
    import { getPopoverContext } from './context.svelte';
    import { createPopoverPosition } from './position.svelte';

    let {
        children,
        class: className,
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

    const position = createPopoverPosition({
        state: popoverState,
        get popover() {
            return popover;
        },
        get dismissEl() {
            return dismissEl;
        },
        get refElement() {
            return refElement;
        },
        get portal() {
            return portal;
        },
        get lockScroll() {
            return lockScroll;
        }
    });

    const contentId = $derived(id ?? `popover-${key}-content`);
    const modal = $derived(
        (role === 'dialog' || role === 'alertdialog') &&
            !popoverState.hoverable &&
            popoverState.inert &&
            focusTrap
    );
    const labelledBy = $derived(
        rest['aria-labelledby'] ??
            (!rest['aria-label'] && (role === 'dialog' || role === 'alertdialog')
                ? context.titleId
                : undefined)
    );
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
    class="fixed left-0 top-0 z-[130] flex [--popover-viewport-margin:calc(var(--spacing)*2)] max-w-[calc(100vw-2*var(--popover-viewport-margin))] max-h-[calc(100vh-2*var(--popover-viewport-margin))] items-center justify-center"
    bind:this={popover}
    onmouseenter={position.cancelClose}
    onmouseleave={position.scheduleClose}
>
    <PopoverPrimitive.ContentStatic
        {...rest}
        dir={rest.dir === 'auto' ? undefined : (rest.dir ?? undefined)}
        forceMount
        id={contentId}
        trapFocus={!popoverState.hoverable && focusTrap}
        preventScroll={false}
        onInteractOutside={(event) => {
            const fromTrigger =
                event.target instanceof Node && popoverState.buttonRef?.contains(event.target);

            if (!allowClickOutside || fromTrigger) {
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
                    id={contentId}
                    dir={rest.dir}
                    {role}
                    aria-modal={ariaModalProp ?? (modal ? 'true' : undefined)}
                    aria-labelledby={labelledBy}
                    {tabindex}
                    data-ui="popover-content"
                    data-surface={surface}
                    data-placement={position.placement}
                    class={cn(
                        className,
                        overlaySurface(surface),
                        'm-auto flex origin-top-left flex-col overflow-hidden text-sm text-[var(--color-foreground)] [&[data-placement=bottom]]:origin-top [&[data-placement=bottom-end]]:origin-top-right [&[data-placement=top-start]]:origin-bottom-left [&[data-placement=top]]:origin-bottom [&[data-placement=top-end]]:origin-bottom-right [&[data-placement^=left]]:origin-right [&[data-placement^=right]]:origin-left',
                        'mielui-float-frame shadow-[var(--elevation-float)]',
                        'max-w-[min(var(--popover-available-width,calc(100vw-2*var(--popover-viewport-margin))),calc(100vw-2*var(--popover-viewport-margin)))] max-h-[min(var(--popover-available-height,calc(100vh-2*var(--popover-viewport-margin))),calc(100vh-2*var(--popover-viewport-margin)))]'
                    )}
                >
                    <div
                        class={cn(
                            surfaceClass,
                            'min-h-0 max-h-[inherit] flex-1 overflow-auto overscroll-contain mielui-inset-surface p-4'
                        )}
                    >
                        {@render children?.()}
                    </div>
                </div>
            {/if}
        {/snippet}
    </PopoverPrimitive.ContentStatic>
</div>
