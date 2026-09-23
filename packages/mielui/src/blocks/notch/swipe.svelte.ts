import { onDestroy } from 'svelte';
import type { NotchProps } from '.';

type SwipeOptions = {
    readonly open: boolean;
    readonly side: NonNullable<NotchProps['side']>;
    readonly element: HTMLElement | null;
    dismiss: () => void;
};

export function createNotchSwipe(options: SwipeOptions) {
    let offset = $state(0);
    let pointer: { id: number; x: number; y: number; started: number } | undefined;

    function cancel() {
        const id = pointer?.id;
        pointer = undefined;
        offset = 0;
        if (id !== undefined && options.element?.hasPointerCapture(id)) {
            options.element.releasePointerCapture(id);
        }
    }

    function start(event: PointerEvent) {
        if (
            !options.open ||
            event.button !== 0 ||
            pointer ||
            (event.target instanceof Element &&
                event.target.closest(
                    'button, a, input, textarea, select, [contenteditable="true"]'
                ))
        ) {
            return;
        }
        pointer = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            started: performance.now()
        };
    }

    function move(event: PointerEvent) {
        if (!pointer || pointer.id !== event.pointerId) {
            return;
        }
        const vertical = options.side === 'top' || options.side === 'bottom';
        const primary = vertical ? event.clientY - pointer.y : event.clientX - pointer.x;
        const cross = vertical ? event.clientX - pointer.x : event.clientY - pointer.y;
        const direction = options.side === 'top' || options.side === 'left' ? -1 : 1;
        if (Math.abs(cross) > Math.abs(primary) && Math.abs(cross) > 10) {
            cancel();
            return;
        }
        if (primary * direction > 6) {
            offset = primary;
            const element = options.element;
            if (event.isTrusted && element && !element.hasPointerCapture(event.pointerId)) {
                element.setPointerCapture(event.pointerId);
            }
        } else {
            offset = 0;
        }
    }

    function finish(event: PointerEvent) {
        if (!pointer || pointer.id !== event.pointerId) {
            return;
        }
        const elapsed = Math.max(1, performance.now() - pointer.started);
        const dismiss =
            Math.abs(offset) > 36 || (Math.abs(offset) > 12 && Math.abs(offset) / elapsed > 0.5);
        cancel();
        if (dismiss) {
            options.dismiss();
        }
    }

    onDestroy(cancel);

    return {
        get offset() {
            return offset;
        },
        get active() {
            return pointer !== undefined;
        },
        start,
        move,
        finish,
        cancel
    };
}
