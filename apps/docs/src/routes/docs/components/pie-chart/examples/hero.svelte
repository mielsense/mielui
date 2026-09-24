<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    const data = [
        { key: 'direct', value: 1240 },
        { key: 'search', value: 860 },
        { key: 'referral', value: 420 }
    ];
    const config = {
        direct: { label: 'Direct', color: 'var(--chart-1)' },
        search: { label: 'Search', color: 'var(--chart-2)' },
        referral: { label: 'Referral', color: 'var(--chart-3)' }
    };
</script>

<div class="w-full max-w-lg">
    <h3 class="font-medium">Where visitors come from</h3>
    <p class="mt-1 text-sm text-foreground-muted">Sessions by acquisition channel this month.</p>
    <PieChart.Root {data} {config} aria-label="Monthly sessions by acquisition channel">
        <PieChart.Plot class="h-64">
            <PieChart.Arc />
            <PieChart.Label />
        </PieChart.Plot>
        <PieChart.Tooltip />
        <PieChart.Legend />
    </PieChart.Root>
</div>
