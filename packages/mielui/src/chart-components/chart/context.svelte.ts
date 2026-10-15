import { createContext } from '@mielui/svelte/utils';
import type { ChartLabels } from '.';

export type ChartRow = Record<string, string | number | Date | null | undefined>;
export type Config = Record<
    string,
    { label: string; color?: string; format?: (value: number) => string }
>;
export interface ChartContext {
    readonly data: readonly ChartRow[];
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

const { set: setChart, get: getChart } = createContext<ChartContext>('chart');

const { set: setChartLabels, find: findChartLabels } =
    createContext<() => ChartLabels | undefined>('chart-labels');

export { findChartLabels, getChart, setChart, setChartLabels };
