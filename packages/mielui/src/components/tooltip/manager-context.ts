import { getContext } from 'svelte';
import { sharedTooltip, type TooltipManager } from './shared-tooltip';

export const tooltipManagerKey = Symbol('tooltip-manager');

export type TooltipContentState = {
    node?: HTMLElement;
    rich: boolean;
    revision: number;
};

export function getTooltipManager() {
    return getContext<TooltipManager | undefined>(tooltipManagerKey) ?? sharedTooltip;
}
