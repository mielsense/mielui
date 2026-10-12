import {
    attributes,
    changed,
    literal,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    animation: select('Animation', ['reveal', 'live', 'none'], 'reveal'),
    innerRadius: number('Inner radius', 0.68, {
        min: 0,
        max: 0.9,
        step: 0.02,
        group: 'Appearance'
    }),
    cornerRadius: number('Corner radius', 4, {
        min: 0,
        max: 16,
        step: 1,
        group: 'Appearance'
    }),
    padAngle: number('Pad angle', 0.035, {
        min: 0,
        max: 0.2,
        step: 0.005,
        group: 'Appearance'
    }),
    label: toggle('Center label', 'Content', true),
    legend: toggle('Legend', 'Content', true),
    tooltip: toggle('Tooltip', 'Content', true),
    loading: toggle('Loading', 'State'),
    empty: toggle('Empty', 'State')
};

export const sessions = [
    {
        key: 'direct',
        value: 1240
    },
    {
        key: 'search',
        value: 860
    },
    {
        key: 'referral',
        value: 420
    }
];

export const sessionsConfig = {
    direct: {
        label: 'Direct',
        color: 'var(--chart-1)'
    },
    search: {
        label: 'Search',
        color: 'var(--chart-2)'
    },
    referral: {
        label: 'Referral',
        color: 'var(--chart-3)'
    }
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        animation: changed(values.animation, 'reveal'),
        loading: values.loading
    });
    const arc = attributes({
        innerRadius: changed(values.innerRadius, 0.68),
        cornerRadius: changed(values.cornerRadius, 4),
        padAngle: changed(values.padAngle, 0.035)
    });
    const rows = sessions.map((datum) => `        ${literal(datum)}`).join(',\n');
    const data = values.empty
        ? `    const data: PieChart.PieChartDatum[] = [];`
        : `    const data = [
${rows}
    ];`;
    const config = Object.entries(sessionsConfig)
        .map(([key, series]) => `        ${key}: ${literal(series)}`)
        .join(',\n');
    const label = values.label
        ? `
        <PieChart.Label />`
        : '';
    const tooltip = values.tooltip
        ? `
    <PieChart.Tooltip />`
        : '';
    const legend = values.legend
        ? `
    <PieChart.Legend />`
        : '';

    return `<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';

${data}
    const config = {
${config}
    };
</script>

<PieChart.Root {data} {config} aria-label="Monthly sessions by acquisition channel"${root}>
    <PieChart.Plot class="h-64">
        <PieChart.Arc${arc} />${label}
    </PieChart.Plot>${tooltip}${legend}
</PieChart.Root>`;
}
