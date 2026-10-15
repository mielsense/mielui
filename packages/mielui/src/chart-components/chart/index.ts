import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ChartRow, Config } from './context.svelte';

export type ChartLabels = {
    categories?: string;
    inspect?: (category: string) => string;
    loading?: string;
    empty?: string;
    emptyDescription?: string;
    /** Cell text in the accessible data table when a point has no value. */
    noData?: string;
};

export type ChartProps<T extends ChartRow = ChartRow> = Omit<
    HTMLAttributes<HTMLDivElement>,
    'children'
> & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: ChartLabels;
    /** Rows to plot. Each row holds a category and one numeric field per series. */
    data: readonly T[];
    /** Label, color, and value format for each series, keyed by series. */
    config: Config;
    /** Field of each row that holds its category. */
    x: keyof T & string;
    /** `horizontal` lays categories down the side and values across. */
    orientation?: 'vertical' | 'horizontal';
    /** Stacks bars of the same category instead of placing them side by side. */
    stacked?: boolean;
    /** Shows the loading state in place of the content. */
    loading?: boolean;
    /** `reveal` animates in once, `live` keeps a subtle motion running, and `none` is static. */
    animation?: 'reveal' | 'live' | 'none';
    'aria-label': string;
    /** Content rendered inside. */
    children?: Snippet;
};

export type ChartPlotProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** Marks, axes, and grid drawn inside the plot. */
    children?: Snippet;
    /** Replaces the built-in empty state. */
    empty?: Snippet;
    /** Replaces the built-in loading skeleton. */
    loading?: Snippet;
};

export type ChartBarProps = {
    /** Series to draw. Matches a data field and a `config` entry. */
    key: string;
    /** Classes added to the element. */
    class?: string;
    /** Corner radius of each bar in pixels. */
    radius?: number;
};

export type ChartLineProps = {
    /** Series to draw. Matches a data field and a `config` entry. */
    key: string;
    /** Classes added to the element. */
    class?: string;
    /** Thickness of the line in pixels. */
    strokeWidth?: number;
};

export type ChartAreaProps = ChartLineProps;

export type ChartXAxisProps = {
    /** Classes added to the element. */
    class?: string;
    /** Number of ticks to aim for on a value axis. */
    ticks?: number;
    /** Formats each tick label. */
    format?: (value: string | number) => string;
};

export type ChartYAxisProps = ChartXAxisProps;

export type ChartGridProps = {
    /** Classes added to the element. */
    class?: string;
    /** Number of grid lines to aim for. */
    ticks?: number;
};

export type ChartLegendProps = {
    /** Classes added to the element. */
    class?: string;
    /** Renders one legend entry. Omit it for a dot and the series label. */
    children?: Snippet<[{ key: string; label: string; color: string }]>;
};

export type ChartTooltipProps = {
    /** Classes added to the element. */
    class?: string;
    /** Renders the tooltip body for the inspected category. */
    children?: Snippet<
        [
            {
                label: string;
                values: {
                    key: string;
                    label: string;
                    value: number;
                    formatted: string;
                    color: string;
                }[];
            }
        ]
    >;
};

export { default as Area } from './area.svelte';
export { default as Bar } from './bar.svelte';
export { default as Grid } from './grid.svelte';
export { default as Legend } from './legend.svelte';
export { default as Line } from './line.svelte';
export { default as Plot } from './plot.svelte';
export { default as Root } from './root.svelte';
export { default as Tooltip } from './tooltip.svelte';
export { default as XAxis } from './x-axis.svelte';
export { default as YAxis } from './y-axis.svelte';
