import { getContext, setContext } from 'svelte';
import type { Cell, calendar } from './calendar';

type Context = {
    tooltipCount: number;
    hoveredElement: HTMLButtonElement | undefined;
    focusedElement: HTMLButtonElement | undefined;
    readonly animation: 'rows' | 'columns' | 'live' | 'none';
    readonly model: ReturnType<typeof calendar>;
    readonly active: Cell | undefined;
    readonly focused: string;
    readonly locale: string;
    activate: (date: string) => void;
    focus: (date: string) => void;
    select: (day: Cell) => void;
};
const key = Symbol('mielui.heatmap');
export function provide(context: Context) {
    setContext(key, context);
}
export function useHeatmap(): Context {
    const context = getContext<Context | undefined>(key);
    if (!context) {
        throw new Error('Heatmap parts must be inside Heatmap.Root.');
    }
    return context;
}
