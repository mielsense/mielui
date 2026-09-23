import { createContext } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { NotchProps } from '.';

type NotchContext = {
    open: boolean;
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
