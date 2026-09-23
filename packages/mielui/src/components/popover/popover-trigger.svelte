<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import {
        cn,
        isPointInSubmenuTriangle,
        positionFloatingPanel,
        submenuPanelOffset
    } from '@mielui/svelte/utils';
    import { buttonAttributes } from '../_internal/button-attributes';
    import type { Placement, PopoverTriggerProps } from '.';
    import { getPopoverContext } from './context.svelte';

    const { id: key, state: popoverState } = getPopoverContext();

    type Props = PopoverTriggerProps;

    let {
        children,
        element = $bindable(),
        class: classProp,
        onclick,
        onopen,
        style,
        id,
        'aria-haspopup': ariaHaspopup,
        'aria-controls': ariaControls,
        'aria-label': ariaLabel,
        ...rest
    }: Props = $props();

    $effect(() => {
        popoverState.buttonRef = element ?? null;
    });

    function openPopover() {
        onopen?.();
        if (popoverState.closeTimeout) {
            clearTimeout(popoverState.closeTimeout);
            popoverState.closeTimeout = undefined;
        }
        popoverState.open = true;

        const button = element;
        const popover = popoverState.popoverRef;

        if (button && popover) {
            positionFloatingPanel(
                button,
                popover,
                popoverState.placement,
                submenuPanelOffset(popoverState.placement, popoverState.hoverable)
            );
        }
    }

    function closePopover(delay = 180) {
        if (popoverState.closeTimeout) {
            clearTimeout(popoverState.closeTimeout);
        }

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

    function handleEnter() {
        if (!popoverState.hoverable || rest.disabled) {
            return;
        }
        clearTimeout(popoverState.hoverTimeout);
        clearTimeout(popoverState.closeTimeout);
        popoverState.hoverTimeout = undefined;
        popoverState.closeTimeout = undefined;
        const delay = popoverState.delay ?? 0;
        if (delay > 0) {
            popoverState.hoverTimeout = setTimeout(() => {
                popoverState.hoverTimeout = undefined;
                if (!rest.disabled && element?.matches(':hover, :focus')) {
                    openPopover();
                }
            }, delay);
        } else {
            openPopover();
        }
        popoverState.hovering = true;
    }

    function handleLeave(event: MouseEvent | FocusEvent) {
        if (popoverState.hoverable) {
            if (popoverState.hoverTimeout) {
                clearTimeout(popoverState.hoverTimeout);
                popoverState.hoverTimeout = undefined;
            }
            const pointerEvent = event.type === 'mouseleave' ? (event as MouseEvent) : undefined;
            const resolvedPlacement = (popoverState.popoverRef?.dataset.placement ??
                popoverState.placement) as Placement;
            const inContactTriangle =
                event.type !== 'mouseleave' ||
                (pointerEvent &&
                    element &&
                    popoverState.popoverRef &&
                    isPointInSubmenuTriangle(
                        { x: pointerEvent.clientX, y: pointerEvent.clientY },
                        element.getBoundingClientRect(),
                        popoverState.popoverRef.getBoundingClientRect(),
                        resolvedPlacement
                    ));
            closePopover(inContactTriangle ? (popoverState.closeDelay ?? 180) : 0);
            popoverState.hovering = false;
        }
    }
</script>

<Button
    bind:element
    {...buttonAttributes(rest)}
    class={cn(
        classProp,
        popoverState.open && !popoverState.hoverable && popoverState.inert && 'relative z-[130]'
    )}
    {style}
    onclick={(event) => {
        onclick?.(event);
        if (event.defaultPrevented) { return; }
        if (popoverState.open) {
            closePopover(0);
        } else {
            openPopover();
        }
    }}
    onmouseenter={handleEnter}
    onmouseleave={handleLeave}
    onfocus={handleEnter}
    onblur={handleLeave}
    aria-haspopup={ariaHaspopup ?? 'dialog'}
    aria-expanded={popoverState.open ? 'true' : 'false'}
    data-state={popoverState.open ? 'open' : 'closed'}
    aria-controls={ariaControls ?? `popover-${String(key)}-content`}
    aria-label={ariaLabel}
    id={id ?? `popover-${String(key)}-controls`}
>
    {@render children?.()}
</Button>
