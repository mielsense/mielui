import {
    attributes,
    changed,
    compact,
    number,
    type PlaygroundValues,
    quote,
    select,
    toggle
} from '$lib/components/docs/playground';

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
    strokeWidth: number('Line width', 2.5, {
        min: 0.5,
        max: 8,
        step: 0.5,
        group: 'Appearance'
    }),
    radius: number('Bar radius', 4, {
        min: 0,
        max: 16,
        step: 1,
        group: 'Appearance'
    }),
    ticks: number('Ticks', 5, {
        min: 2,
        max: 10,
        step: 1,
        group: 'Appearance'
    }),
    legend: toggle('Legend', 'Content', true),
    grid: toggle('Grid', 'Content', true),
    xAxis: toggle('X axis', 'Content', true),
    yAxis: toggle('Y axis', 'Content', true),
    tooltip: toggle('Tooltip', 'Content', true),
    loading: toggle('Loading', 'State'),
    empty: toggle('Empty', 'State'),
    stacked: toggle('Stacked bars', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

function marks(values: Values): string[] {
    const path = attributes({
        strokeWidth: changed(values.strokeWidth, 2.5)
    });
    const bar = attributes({
        radius: changed(values.radius, 4)
    });

    if (values.type === 'bar') {
        return [`<Chart.Bar key="revenue"${bar} />`, `<Chart.Bar key="target"${bar} />`];
    }
    if (values.type === 'line') {
        return [`<Chart.Line key="revenue"${path} />`, `<Chart.Line key="target"${path} />`];
    }
    if (values.type === 'area') {
        return [`<Chart.Area key="revenue"${path} />`, `<Chart.Area key="target"${path} />`];
    }

    return [`<Chart.Area key="revenue"${path} />`, `<Chart.Line key="target"${path} />`];
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
        stacked: values.type === 'bar' && values.stacked,
        animation: changed(values.animation, 'reveal'),
        loading: values.loading
    });
    const ticks = attributes({
        ticks: changed(values.ticks, 5)
    });
    const data = values.empty
        ? `    const data: { month: string; revenue: number; target: number }[] = [];`
        : `    const data = [
${rows()}
    ];`;
    const plot = compact([
        values.grid && `<Chart.Grid${ticks} />`,
        values.xAxis && `<Chart.XAxis${ticks} />`,
        values.yAxis && `<Chart.YAxis${ticks} />`,
        ...marks(values)
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
