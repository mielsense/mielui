import type { Snippet } from 'svelte';
import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';
import Root from './pie-chart.svelte';
import Arc from './pie-chart-arc.svelte';
import Label from './pie-chart-label.svelte';
import Legend from './pie-chart-legend.svelte';
import Plot from './pie-chart-plot.svelte';
import Tooltip from './pie-chart-tooltip.svelte';

export type PieChartDatum = { key: string; value: number };
export type PieChartConfig = Record<
    string,
    { label: string; color?: string; format?: (value: number) => string }
>;
export type PieChartProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    data: readonly PieChartDatum[];
    config: PieChartConfig;
    'aria-label': string;
    loading?: boolean;
    animation?: 'reveal' | 'live' | 'none';
    children?: Snippet;
};
export type PieChartPlotProps = HTMLAttributes<HTMLDivElement>;
export type PieChartArcProps = {
    innerRadius?: number;
    cornerRadius?: number;
    padAngle?: number;
    class?: string;
};
export type PieChartLabelProps = Omit<SVGAttributes<SVGTextElement>, 'children'> & {
    children?: Snippet<[{ total: number; active: PieChartDatum | undefined }]>;
};
export type PieChartTooltipProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet<[{ item: PieChartDatum; label: string; value: string; percentage: number }]>;
};
export type PieChartLegendProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
    children?: Snippet<[{ item: PieChartDatum; label: string; value: string; percentage: number }]>;
};
export { Arc, Label, Legend, Plot, Root, Tooltip };
