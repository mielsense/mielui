import {
    isPointInSubmenuTriangle,
    lockBodyScroll,
    positionFloatingPanel,
    submenuPanelOffset
} from '@mielui/svelte/utils';
import { onMount, untrack } from 'svelte';
import type { Placement, PopoverContentProps, PopoverState } from '.';
import { inertOutsidePopover } from './inert';

type PositionOptions = {
    readonly state: PopoverState;
    readonly popover: HTMLElement | undefined;
    readonly dismissEl: HTMLElement | undefined;
    readonly refElement: PopoverContentProps['refElement'];
    readonly portal: boolean;
    readonly lockScroll: boolean;
};

export function createPopoverPosition(options: PositionOptions) {
    const popoverState = options.state;

    let positionFrame: number | undefined;
    let placement = $state<Placement>(
        untrack(() => (options.refElement ? 'right-start' : popoverState.placement))
    );

    function updatePosition() {
        const popover = options.popover;
        const reference = options.refElement ?? popoverState.buttonRef;

        if (!popover || !reference) {
            return;
        }

        const triggerWidth = popoverState.buttonRef?.getBoundingClientRect().width;

        if (triggerWidth) {
            popover.style.setProperty('--popover-trigger-width', `${triggerWidth}px`);
        }

        const requested = options.refElement ? 'right-start' : popoverState.placement;

        void positionFloatingPanel(
            reference,
            popover,
            requested,
            submenuPanelOffset(requested, popoverState.hoverable)
        ).then(() => {
            const resolved = popover.dataset.placement as Placement | undefined;

            if (resolved) {
                placement = resolved;
            }
        });
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
        popoverState.popoverRef = options.popover;

        if (options.portal && options.popover) {
            document.body.appendChild(options.popover);
        }

        return () => {
            if (positionFrame !== undefined) {
                cancelAnimationFrame(positionFrame);
            }

            options.popover?.remove();
        };
    });

    $effect(() => {
        const popover = options.popover;
        const trigger = popoverState.buttonRef;

        if (!popoverState.open || !popover) {
            return;
        }

        window.addEventListener('resize', schedulePosition);
        window.addEventListener('scroll', schedulePosition, true);
        window.visualViewport?.addEventListener('resize', schedulePosition);
        window.visualViewport?.addEventListener('scroll', schedulePosition);

        const observer = new ResizeObserver(schedulePosition);

        observer.observe(popover);

        if (trigger) {
            observer.observe(trigger);
        }

        return () => {
            window.removeEventListener('resize', schedulePosition);
            window.removeEventListener('scroll', schedulePosition, true);
            window.visualViewport?.removeEventListener('resize', schedulePosition);
            window.visualViewport?.removeEventListener('scroll', schedulePosition);
            observer.disconnect();
        };
    });

    $effect(() => {
        if (!options.dismissEl) {
            return;
        }

        document.body.appendChild(options.dismissEl);

        return () => {
            options.dismissEl?.remove();
        };
    });

    function cancelClose() {
        if (popoverState.hoverable && popoverState.closeTimeout) {
            clearTimeout(popoverState.closeTimeout);
            popoverState.closeTimeout = undefined;
        }
    }

    function scheduleClose(event: MouseEvent) {
        if (!popoverState.hoverable) {
            return;
        }

        const panel = options.popover;
        const trigger = popoverState.buttonRef;
        const inContactTriangle =
            trigger &&
            panel &&
            isPointInSubmenuTriangle(
                {
                    x: event.clientX,
                    y: event.clientY
                },
                trigger.getBoundingClientRect(),
                panel.getBoundingClientRect(),
                placement
            );

        closePopoverAfter(popoverState, inContactTriangle ? popoverState.closeDelay : 0);
    }

    $effect(() => {
        if (
            !popoverState.open ||
            popoverState.hoverable ||
            !popoverState.inert ||
            !options.popover
        ) {
            return;
        }

        return inertOutsidePopover(options.popover, popoverState.buttonRef);
    });

    /** Positions on open, before paint, so the panel never shows at its origin or at auto width. */
    $effect(() => {
        if (popoverState.open && options.popover) {
            updatePosition();
        }
    });

    $effect(() => {
        if (popoverState.open && !popoverState.hoverable && options.lockScroll) {
            return lockBodyScroll();
        }
    });

    return {
        get placement() {
            return placement;
        },
        cancelClose,
        scheduleClose
    };
}

/** Closes the popover after `delay` milliseconds, replacing any pending close. */
export function closePopoverAfter(popoverState: PopoverState, delay = 0) {
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
