import {
    attributes,
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

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        animation: values.animation !== 'reveal' && values.animation,
        loading: values.loading
    });
    const arc = attributes({
        innerRadius: values.innerRadius !== 0.68 && values.innerRadius,
        cornerRadius: values.cornerRadius !== 4 && values.cornerRadius,
        padAngle: values.padAngle !== 0.035 && values.padAngle
    });
    const data = values.empty
        ? `    const data: PieChart.PieChartDatum[] = [];`
        : `    const data = [
        { key: 'direct', value: 1240 },
        { key: 'search', value: 860 },
        { key: 'referral', value: 420 }
    ];`;
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
        direct: { label: 'Direct', color: 'var(--chart-1)' },
        search: { label: 'Search', color: 'var(--chart-2)' },
        referral: { label: 'Referral', color: 'var(--chart-3)' }
    };
</script>

<PieChart.Root {data} {config} aria-label="Monthly sessions by acquisition channel"${root}>
    <PieChart.Plot class="h-64">
        <PieChart.Arc${arc} />${label}
    </PieChart.Plot>${tooltip}${legend}
</PieChart.Root>`;
}
