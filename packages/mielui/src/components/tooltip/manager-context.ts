import { createContext } from '@mielui/svelte/utils';
import { getContext, setContext } from 'svelte';
import type { TooltipState } from '.';
import { sharedTooltip, type TooltipManager } from './shared-tooltip';

export type TooltipContentState = {
    node?: HTMLElement;
    rich: boolean;
    revision: number;
};

export type TooltipContext = {
    readonly descriptionId: string;
    tip: TooltipState;
    content: TooltipContentState;
};

const managerKey = Symbol('mielui.tooltip-manager');

const { set: setTooltipContext, get: getTooltipContext } = createContext<TooltipContext>('tooltip');

export function setTooltipManager(manager: TooltipManager) {
    setContext(managerKey, manager);
}

export function getTooltipManager() {
    return getContext<TooltipManager | undefined>(managerKey) ?? sharedTooltip;
}

export { getTooltipContext, setTooltipContext };
