<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    const data = [
        { key: 'product', value: 52 },
        { key: 'engineering', value: 31 },
        { key: 'support', value: 17 }
    ];
    const percent = (value: number) => `${value}%`;
    const config = {
        product: { label: 'Product', color: 'oklch(0.74 0.12 25)', format: percent },
        engineering: { label: 'Engineering', color: 'oklch(0.84 0.12 85)', format: percent },
        support: { label: 'Support', color: 'oklch(0.8 0.09 55)', format: percent }
    };
</script>

<div class="w-full max-w-xl">
    <h3 class="font-medium">Time by team</h3>
    <p class="mt-1 text-sm text-foreground-muted">Share of tracked hours this week.</p>
    <PieChart.Root {data} {config} animation="live" aria-label="Weekly tracked hours by team">
        <PieChart.Plot class="h-72">
            <PieChart.Arc innerRadius={0} cornerRadius={5} padAngle={0.025} />
        </PieChart.Plot>
        <PieChart.Legend />
        <PieChart.Tooltip />
    </PieChart.Root>
</div>
