import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { Cell, Day } from './calendar';

export type HeatmapLabels = {
    unit?: (count: number) => string;
    tooltipValue?: string;
    less?: string;
    more?: string;
    grid?: string;
    gridLoading?: string;
    gridEmpty?: string;
    detailLoading?: string;
    detailEmpty?: string;
    /** Text Summary shows before the data is ready. */
    summaryPending?: string;
};

export type HeatmapProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /**
     * Overrides the built-in text and accessible names. Every key is optional and English is the
     * fallback.
     */
    labels?: HeatmapLabels;
    /** Daily counts keyed by ISO date. Missing dates count as zero. */
    days: readonly Day[];
    /** Number of weeks shown, from 1 to 104. */
    weeks?: number;
    /** Shows the loading state in place of the content. */
    loading?: boolean;
    /** `rows` and `columns` stagger the entrance, `live` repeats a column highlight, and `none` is static. */
    animation?: 'rows' | 'columns' | 'live' | 'none';
    /** Last date shown. Defaults to the latest supplied date, or today for an empty dataset. */
    endDate?: string;
    /** First day of each week, from 0 (Sunday) to 6. */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /** Locale for month and weekday names. */
    locale?: string;
    /** Called with the computed day when a cell is activated. */
    onDaySelect?: (day: Cell) => void;
    /** Custom layout. Omit it for the built-in calendar, receiving the visible days and their total. */
    children?: Snippet<[{ days: readonly Cell[]; total: number }]>;
};

export type HeatmapHeaderProps = HTMLAttributes<HTMLDivElement>;
export type HeatmapCalendarProps = HTMLAttributes<HTMLDivElement>;
export type HeatmapMonthLabelsProps = HTMLAttributes<HTMLDivElement>;
export type HeatmapWeekdayLabelsProps = HTMLAttributes<HTMLDivElement>;
export type HeatmapFooterProps = HTMLAttributes<HTMLDivElement>;
export type HeatmapLegendProps = HTMLAttributes<HTMLDivElement>;
export type HeatmapTooltipProps = HTMLAttributes<HTMLDivElement>;

export type HeatmapGridProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** Renders the cells. Omit it for one Cell per visible day. */
    children?: Snippet<[readonly Cell[]]>;
};

export type HeatmapCellProps = HTMLButtonAttributes & {
    /** Visible day this cell represents. */
    day: Cell;
};

export type HeatmapDetailProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
    /** Renders the detail line for the hovered or focused day. */
    children?: Snippet<[Cell | undefined]>;
};

export type HeatmapSummaryProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
    /** Renders the summary from the total of the visible days. */
    children?: Snippet<[number]>;
};

export { default as Root } from './heatmap.svelte';
export { default as Calendar } from './heatmap-calendar.svelte';
export { default as Cell } from './heatmap-cell.svelte';
export { default as Detail } from './heatmap-detail.svelte';
export { default as Footer } from './heatmap-footer.svelte';
export { default as Grid } from './heatmap-grid.svelte';
export { default as Header } from './heatmap-header.svelte';
export { default as Legend } from './heatmap-legend.svelte';
export { default as MonthLabels } from './heatmap-month-labels.svelte';
export { default as Summary } from './heatmap-summary.svelte';
export { default as Tooltip } from './heatmap-tooltip.svelte';
export { default as WeekdayLabels } from './heatmap-weekday-labels.svelte';
