import { getContext, setContext } from 'svelte';
import type { PieChartConfig, PieChartDatum } from './index';

type PieContext = {
    readonly element: HTMLElement | undefined;
    anchor: Element | undefined;
    pointer: { x: number; y: number } | undefined;
    readonly data: readonly PieChartDatum[];
    readonly config: PieChartConfig;
    readonly total: number;
    readonly loading: boolean;
    readonly animation: 'reveal' | 'live' | 'none';
    readonly motion: boolean;
    readonly ready: boolean;
    readonly durationScale: number;
    readonly live: boolean;
    readonly visible: boolean;
    active: string | undefined;
    focused: string | undefined;
    color(key: string): string;
    label(key: string): string;
    format(item: PieChartDatum): string;
};
const key = Symbol('mielui-pie-chart');
export function setPieContext(context: PieContext) {
    return setContext(key, context);
}
export function getPieContext(): PieContext {
    const context = getContext<PieContext>(key);
    if (!context) {
        throw new Error('PieChart parts must be rendered inside PieChart.Root.');
    }
    return context;
}
