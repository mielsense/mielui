import { pushEscapeLayer } from '@mielui/svelte/utils';
import type { Attachment } from 'svelte/attachments';
import type { PanelContext } from './context.svelte';
import { resizeDirection } from './geometry';
import type { SidebarResizeHandleProps } from './types';

type Handlers = Pick<
    SidebarResizeHandleProps,
    | 'onkeydown'
    | 'onpointerdown'
    | 'onpointermove'
    | 'onpointerup'
    | 'onpointercancel'
    | 'onlostpointercapture'
>;

export function resizeHandle(
    state: PanelContext,
    handlers: Handlers
): Attachment<HTMLButtonElement> {
    return (node: HTMLButtonElement) => {
        let gesture:
            | { pointer: number; startX: number; width: number; direction: number }
            | undefined;

        let releaseEscape: (() => void) | undefined;
        function cancel() {
            if (!gesture) {
                return;
            }
            state.setWidth(gesture.width);
            finish();
        }
        function finish() {
            const pointer = gesture?.pointer;
            gesture = undefined;
            state.setResizing(false);
            releaseEscape?.();
            releaseEscape = undefined;
            if (pointer !== undefined && node.hasPointerCapture(pointer)) {
                node.releasePointerCapture(pointer);
            }
        }
        function start(event: PointerEvent) {
            handlers.onpointerdown?.(
                event as PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }
            );
            if (event.defaultPrevented || event.button !== 0 || !event.isPrimary) {
                return;
            }
            event.preventDefault();
            gesture = {
                pointer: event.pointerId,
                startX: event.clientX,
                width: state.width,
                direction: resizeDirection(state.side, state.direction)
            };
            node.setPointerCapture(event.pointerId);
            node.focus({ preventScroll: true });
            state.setResizing(true);
            releaseEscape = pushEscapeLayer(cancel, node, state.depth + 1);
        }
        function move(event: PointerEvent) {
            handlers.onpointermove?.(
                event as PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }
            );
            if (gesture?.pointer === event.pointerId && !event.defaultPrevented) {
                state.setWidth(
                    gesture.width + (event.clientX - gesture.startX) * gesture.direction
                );
            }
        }
        function up(event: PointerEvent) {
            handlers.onpointerup?.(
                event as PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }
            );
            if (gesture?.pointer === event.pointerId) {
                finish();
            }
        }
        function pointerCancel(event: PointerEvent) {
            handlers.onpointercancel?.(
                event as PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }
            );
            if (gesture?.pointer === event.pointerId) {
                cancel();
            }
        }
        function lost(event: PointerEvent) {
            handlers.onlostpointercapture?.(
                event as PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }
            );
            if (gesture?.pointer === event.pointerId) {
                cancel();
            }
        }
        function keyboard(event: KeyboardEvent) {
            handlers.onkeydown?.(
                event as KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement }
            );
            if (event.defaultPrevented) {
                return;
            }
            if (event.key === 'Escape' && gesture) {
                event.preventDefault();
                event.stopPropagation();
                cancel();
                return;
            }
            let next: number;
            if (event.key === 'Home') {
                next = state.minWidth;
            } else if (event.key === 'End') {
                next = state.maxWidth;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                next =
                    state.width +
                    (event.key === 'ArrowRight' ? 1 : -1) *
                        resizeDirection(state.side, state.direction) *
                        (event.shiftKey ? 32 : 8);
            } else {
                return;
            }
            event.preventDefault();
            state.setWidth(next);
        }
        node.addEventListener('pointerdown', start);
        node.addEventListener('pointermove', move);
        node.addEventListener('pointerup', up);
        node.addEventListener('pointercancel', pointerCancel);
        node.addEventListener('lostpointercapture', lost);
        node.addEventListener('keydown', keyboard);
        window.addEventListener('blur', cancel);
        return () => {
            cancel();
            node.removeEventListener('pointerdown', start);
            node.removeEventListener('pointermove', move);
            node.removeEventListener('pointerup', up);
            node.removeEventListener('pointercancel', pointerCancel);
            node.removeEventListener('lostpointercapture', lost);
            node.removeEventListener('keydown', keyboard);
            window.removeEventListener('blur', cancel);
        };
    };
}
