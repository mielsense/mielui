import { createContext } from '@mielui/svelte/utils';
import type { HeatmapLabels } from '.';
import type { Cell, calendar } from './calendar';
import type { HeatmapMotion } from './reveal';

type HeatmapContext = {
    readonly labels: HeatmapLabels | undefined;
    tooltipCount: number;
    hoveredElement: HTMLButtonElement | undefined;
    focusedElement: HTMLButtonElement | undefined;
    readonly loading: boolean;
    readonly empty: boolean;
    readonly ready: boolean;
    readonly animation: 'rows' | 'columns' | 'live' | 'none';
    /** The theme's motion, or `undefined` when motion is reduced or turned off. */
    readonly motion: HeatmapMotion | undefined;
    readonly model: ReturnType<typeof calendar>;
    readonly active: Cell | undefined;
    readonly focused: string;
    readonly locale: string;
    activate: (date: string) => void;
    focus: (date: string) => void;
    select: (day: Cell) => void;
};

const { set: setHeatmapContext, get: getHeatmapContext } = createContext<HeatmapContext>('heatmap');

export { getHeatmapContext, setHeatmapContext };
