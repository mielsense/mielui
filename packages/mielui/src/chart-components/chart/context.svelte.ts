import { getContext, setContext } from 'svelte';

export type Row = Record<string, string | number | Date | null | undefined>;
export type Config = Record<
    string,
    { label: string; color?: string; format?: (value: number) => string }
>;
export interface ChartContext {
    readonly data: readonly Row[];
    readonly config: Config;
    readonly keys: string[];
    readonly barKeys: string[];
    register(token: symbol, key: string, kind: 'bar' | 'line' | 'area'): () => void;
    readonly x: string;
    readonly orientation: 'vertical' | 'horizontal';
    readonly stacked: boolean;
    readonly loading: boolean;
    readonly animation: 'reveal' | 'live' | 'none';
    readonly motion: boolean;
    readonly motionScale: number;
    readonly domain: [number, number];
    readonly categoryDomain: [number, number];
    position(row: number): number;
    readonly element: HTMLDivElement | undefined;
    pointer: { x: number; y: number } | null;
    anchor: { x: number; y: number };
    active: number | null;
    focused: number | null;
    value(row: number, key: string): number | null;
    color(key: string): string;
    label(row: number): string;
    format(key: string, value: number): string;
}
const key = Symbol('mielui-chart');
export function setChart(context: ChartContext) {
    setContext(key, context);
}
export function getChart(): ChartContext {
    const context = getContext<ChartContext | undefined>(key);
    if (!context) {
        throw new Error('Chart parts must be placed inside Chart.Root.');
    }
    return context;
}
