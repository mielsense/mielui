<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { month: 'Jan', revenue: 186, target: 160 },
        { month: 'Feb', revenue: 242, target: 190 },
        { month: 'Mar', revenue: 218, target: 220 },
        { month: 'Apr', revenue: 304, target: 250 },
        { month: 'May', revenue: 286, target: 280 },
        { month: 'Jun', revenue: 372, target: 310 }
    ];
    const config = {
        revenue: { label: 'Revenue', color: 'oklch(0.74 0.12 25)' },
        target: { label: 'Target', color: 'oklch(0.84 0.12 85)' }
    };
</script>

<Chart.Root {data} {config} x="month" aria-label="Monthly revenue and target" class="w-full">
    <Chart.Legend />
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar key="revenue" />
        <Chart.Line key="target" />
    </Chart.Plot>
    <Chart.Tooltip />
</Chart.Root>
