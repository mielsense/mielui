import {
    isPointInSubmenuTriangle,
    lockBodyScroll,
    positionFloatingPanel,
    submenuPanelOffset
} from '@mielui/svelte/utils';
import { onMount } from 'svelte';
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

    function updatePosition() {
        if (!options.popover) {
            return;
        }

        const reference = options.refElement ?? popoverState.buttonRef;

        if (!reference) {
            return;
        }

        const triggerWidth = popoverState.buttonRef?.getBoundingClientRect().width;

        if (triggerWidth) {
            options.popover.style.setProperty('--popover-trigger-width', `${triggerWidth}px`);
        }

        const placement = options.refElement ? 'right-start' : popoverState.placement;

        positionFloatingPanel(
            reference,
            options.popover,
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
        window.addEventListener('resize', schedulePosition);
        window.addEventListener('scroll', schedulePosition, true);
        window.visualViewport?.addEventListener('resize', schedulePosition);
        window.visualViewport?.addEventListener('scroll', schedulePosition);

        popoverState.popoverRef = options.popover;

        if (options.portal && options.popover) {
            document.body.appendChild(options.popover);
        }

        const ro = new ResizeObserver(schedulePosition);

        if (popoverState.buttonRef) {
            ro.observe(popoverState.buttonRef);
        }

        if (options.popover) {
            ro.observe(options.popover);
        }

        return () => {
            window.removeEventListener('resize', schedulePosition);
            window.removeEventListener('scroll', schedulePosition, true);
            window.visualViewport?.removeEventListener('resize', schedulePosition);
            window.visualViewport?.removeEventListener('scroll', schedulePosition);
            ro.disconnect();

            if (positionFrame !== undefined) {
                cancelAnimationFrame(positionFrame);
            }

            options.popover?.remove();
        };
    });

    $effect(() => {
        if (!options.dismissEl || typeof document === 'undefined') {
            return;
        }

        document.body.appendChild(options.dismissEl);

        return () => {
            options.dismissEl?.remove();
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

        const resolvedPlacement = (options.popover?.dataset.placement ??
            popoverState.placement) as Placement;

        const inContactTriangle =
            popoverState.buttonRef &&
            options.popover &&
            isPointInSubmenuTriangle(
                { x: event.clientX, y: event.clientY },
                popoverState.buttonRef.getBoundingClientRect(),
                options.popover.getBoundingClientRect(),
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
            !options.popover
        ) {
            return;
        }

        return inertOutsidePopover(options.popover, popoverState.buttonRef);
    });

    /** Positions synchronously on open so the panel never paints at its origin or at auto width. */
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
        cancelClose,
        scheduleClose
    };
}
