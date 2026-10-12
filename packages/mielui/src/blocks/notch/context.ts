import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { NotchProps } from '.';

type NotchContext = {
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
export const notchContext = createContext<NotchContext>('notch');

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
