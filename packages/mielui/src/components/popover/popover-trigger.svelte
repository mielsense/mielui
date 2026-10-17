<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn, isPointInSubmenuTriangle } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import type { Placement, PopoverTriggerProps } from '.';
    import { getPopoverContext } from './context';
    import { closePopoverAfter } from './position.svelte';

    const { id: key, state: popoverState } = getPopoverContext();

    let {
        children,
        icon = false,
        element = $bindable(),
        class: className,
        onclick,
        onopen,
        style,
        id,
        'aria-haspopup': ariaHaspopup,
        'aria-controls': ariaControls,
        'aria-label': ariaLabel,
        ...rest
    }: PopoverTriggerProps = $props();

    $effect(() => {
        popoverState.buttonRef = element ?? null;
    });

    function openPopover() {
        onopen?.();
        clearTimeout(popoverState.closeTimeout);
        popoverState.closeTimeout = undefined;
        popoverState.open = true;
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
    }

    function handleLeave(event: MouseEvent | FocusEvent) {
        if (!popoverState.hoverable) {
            return;
        }

        clearTimeout(popoverState.hoverTimeout);
        popoverState.hoverTimeout = undefined;

        const panel = popoverState.popoverRef;
        const inContactTriangle =
            !(event instanceof MouseEvent) ||
            (element &&
                panel &&
                isPointInSubmenuTriangle(
                    {
                        x: event.clientX,
                        y: event.clientY
                    },
                    element.getBoundingClientRect(),
                    panel.getBoundingClientRect(),
                    (panel.dataset.placement ?? popoverState.placement) as Placement
                ));

        closePopoverAfter(popoverState, inContactTriangle ? popoverState.closeDelay : 0);
    }
</script>

<Button
    bind:element
    {...buttonAttributes(rest)}
    class={cn(
        className,
        popoverState.open && !popoverState.hoverable && popoverState.inert && 'relative z-[130]'
    )}
    {style}
    onclick={(event) => {
        onclick?.(event);
        if (event.defaultPrevented) {
            return;
        }
        if (popoverState.open) {
            closePopoverAfter(popoverState);
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
    aria-controls={ariaControls ?? `popover-${key}-content`}
    aria-label={ariaLabel}
    id={id ?? `popover-${key}-controls`}
>
    {@render children?.()}
    {#if icon}
        <HugeiconsIcon
            icon={ChevronDown}
            aria-hidden="true"
            class={cn(
                'shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none',
                popoverState.open && 'rotate-180'
            )}
        />
    {/if}
</Button>
