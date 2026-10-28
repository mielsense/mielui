import {
    attributes,
    changed,
    compact,
    type PlaygroundValues,
    quote,
    select,
    toggle
} from '#lib/components/docs/playground.js';

type Revenue = {
    month: string;
    revenue: number;
    target: number;
};

export const revenue: Revenue[] = [
    {
        month: 'Jan',
        revenue: 186,
        target: 160
    },
    {
        month: 'Feb',
        revenue: 242,
        target: 190
    },
    {
        month: 'Mar',
        revenue: 218,
        target: 220
    },
    {
        month: 'Apr',
        revenue: 304,
        target: 250
    },
    {
        month: 'May',
        revenue: 286,
        target: 280
    },
    {
        month: 'Jun',
        revenue: 372,
        target: 310
    }
];

export const config = {
    revenue: {
        label: 'Revenue',
        color: 'var(--chart-1)'
    },
    target: {
        label: 'Target',
        color: 'var(--chart-2)'
    }
};

export const controls = {
    type: select('Chart type', ['mixed', 'bar', 'line', 'area'], 'mixed'),
    orientation: select('Orientation', ['vertical', 'horizontal'], 'vertical', 'Appearance'),
    animation: select('Animation', ['reveal', 'live', 'none'], 'reveal', 'Appearance'),
    legend: toggle('Legend', 'Content', true),
    grid: toggle('Grid', 'Content', true),
    axes: toggle('Axes', 'Content', true),
    tooltip: toggle('Tooltip', 'Content', true),
    state: select('Data', ['ready', 'loading', 'empty'], 'ready', 'State')
};

type Values = PlaygroundValues<typeof controls>;

function marks(type: Values['type']): string[] {
    if (type === 'bar') {
        return ['<Chart.Bar key="revenue" />', '<Chart.Bar key="target" />'];
    }
    if (type === 'line') {
        return ['<Chart.Line key="revenue" />', '<Chart.Line key="target" />'];
    }
    if (type === 'area') {
        return ['<Chart.Area key="revenue" />', '<Chart.Area key="target" />'];
    }

    return ['<Chart.Area key="revenue" />', '<Chart.Line key="target" />'];
}

function rows(): string {
    return revenue
        .map((row) => {
            const month = quote(row.month);

            return `        { month: ${month}, revenue: ${row.revenue}, target: ${row.target} }`;
        })
        .join(',\n');
}

function series(): string {
    return Object.entries(config)
        .map(([key, item]) => {
            return `        ${key}: { label: ${quote(item.label)}, color: ${quote(item.color)} }`;
        })
        .join(',\n');
}

export function code(values: Values): string {
    const root = attributes({
        orientation: changed(values.orientation, 'vertical'),
        animation: changed(values.animation, 'reveal'),
        loading: values.state === 'loading'
    });
    const data =
        values.state === 'empty'
            ? `    const data: { month: string; revenue: number; target: number }[] = [];`
            : `    const data = [
${rows()}
    ];`;
    const plot = compact([
        values.grid && '<Chart.Grid />',
        values.axes && '<Chart.XAxis />',
        values.axes && '<Chart.YAxis />',
        ...marks(values.type)
    ])
        .map((line) => `        ${line}`)
        .join('\n');
    const legend = values.legend
        ? `
    <Chart.Legend />`
        : '';
    const tooltip = values.tooltip
        ? `
    <Chart.Tooltip />`
        : '';

    return `<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

${data}
    const config = {
${series()}
    };
</script>

<Chart.Root {data} {config} x="month" aria-label="Monthly revenue and target" class="w-full"${root}>${legend}
    <Chart.Plot>
${plot}
    </Chart.Plot>${tooltip}
</Chart.Root>`;
}
