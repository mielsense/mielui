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
export type PieChartLabels = {
    loading?: string;
    empty?: string;
    category?: string;
    value?: string;
};

export type PieChartProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: PieChartLabels;
    /** Segments to plot, each with a key and a value. */
    data: readonly PieChartDatum[];
    /** Label, color, and value format for each series, keyed by series. */
    config: PieChartConfig;
    'aria-label': string;
    /** Shows the loading state in place of the content. */
    loading?: boolean;
    /** `reveal` animates in once, `live` keeps a subtle motion running, and `none` is static. */
    animation?: 'reveal' | 'live' | 'none';
    /** Content rendered inside. */
    children?: Snippet;
};
export type PieChartPlotProps = HTMLAttributes<HTMLDivElement>;
export type PieChartArcProps = {
    /** Hole size as a share of the radius. Zero draws a full pie. */
    innerRadius?: number;
    /** Corner radius of each segment in pixels. */
    cornerRadius?: number;
    /** Gap between segments in radians. */
    padAngle?: number;
    /** Classes added to the element. */
    class?: string;
};
export type PieChartLabelProps = Omit<SVGAttributes<SVGTextElement>, 'children'> & {
    /** Content rendered inside. */
    children?: Snippet<[{ total: number; active: PieChartDatum | undefined }]>;
};
export type PieChartTooltipProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** Content rendered inside. */
    children?: Snippet<[{ item: PieChartDatum; label: string; value: string; percentage: number }]>;
};
export type PieChartLegendProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
    /** Content rendered inside. */
    children?: Snippet<[{ item: PieChartDatum; label: string; value: string; percentage: number }]>;
};
export { Arc, Label, Legend, Plot, Root, Tooltip };
