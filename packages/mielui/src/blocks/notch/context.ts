import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { NotchProps } from '.';

export type NotchContext = {
    open: boolean;
    readonly labels: NotchProps['labels'];
    readonly actionCount: number;
    width: number;
    height: number;
    returnFocus: HTMLElement | undefined;
    register: (element: HTMLElement, action?: boolean) => () => void;
    scheduleCollapse: () => void;
    cancelCollapse: () => void;
    contains: (element: Node | null) => boolean;
    hovered: boolean;
    focused: boolean;
    peek: Snippet | undefined;
    readonly mode: NonNullable<NotchProps['mode']>;
    readonly side: NonNullable<NotchProps['side']>;
    readonly surface: NotchProps['surface'];
};
const { set: setNotchContext, get: getNotchContext } = createContext<NotchContext>('notch');

export { getNotchContext, setNotchContext };

/** Focus, hover, and Escape handling shared by the floating parts that sit beside the notch. */
export function notchSatelliteHandlers(context: NotchContext) {
    return {
        focusin(event: FocusEvent) {
            if (
                event.relatedTarget instanceof HTMLElement &&
                !context.contains(event.relatedTarget)
            ) {
                context.returnFocus = event.relatedTarget;
            }
            context.focused = true;
        },
        focusout() {
            queueMicrotask(() => {
                context.focused = context.contains(document.activeElement);
                if (context.mode === 'peek' && !context.focused && !context.hovered) {
                    context.open = false;
                }
            });
        },
        pointerenter() {
            context.cancelCollapse();
            context.hovered = true;
        },
        pointerleave() {
            context.hovered = false;
            if (context.mode === 'peek' && !context.focused) {
                context.scheduleCollapse();
            }
        },
        keydown(event: KeyboardEvent) {
            if (event.key === 'Escape' && !event.defaultPrevented) {
                event.preventDefault();
                context.open = false;
            }
        }
    };
}

/** Resolves the theme's `--spacing` unit on `node` to pixels. */
export function spacingInPixels(node: HTMLElement, fallback: number) {
    const token = getComputedStyle(node).getPropertyValue('--spacing').trim();
    const spacing = Number.parseFloat(token);
    if (!Number.isFinite(spacing)) {
        return fallback;
    }
    if (!token.endsWith('rem')) {
        return spacing;
    }
    const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    return spacing * rootSize;
}

export function openPopover(host: HTMLElement) {
    if (typeof host.showPopover === 'function' && !host.matches(':popover-open')) {
        host.showPopover();
    }
}

export function closePopover(host: HTMLElement) {
    if (typeof host.hidePopover === 'function' && host.matches(':popover-open')) {
        host.hidePopover();
    }
}
