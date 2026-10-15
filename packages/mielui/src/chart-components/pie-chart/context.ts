import { createContext } from '@mielui/svelte/utils';
import type { PieChartConfig, PieChartDatum, PieChartLabels } from './index';

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
    percentage(item: PieChartDatum): number;
};

const { set: setPieContext, get: getPieContext } = createContext<PieContext>('pie-chart');

const { set: setPieChartLabels, find: findPieChartLabels } =
    createContext<() => PieChartLabels | undefined>('pie-chart-labels');

export { findPieChartLabels, getPieContext, setPieChartLabels, setPieContext };
