import { createContext } from '@mielui/svelte/utils';
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

const { set: setTooltipContext, get: getTooltipContext } = createContext<TooltipContext>('tooltip');

const { set: setTooltipManager, find: findTooltipManager } =
    createContext<TooltipManager>('tooltip-manager');

function getTooltipManager(): TooltipManager {
    return findTooltipManager() ?? sharedTooltip;
}

export { getTooltipContext, getTooltipManager, setTooltipContext, setTooltipManager };
