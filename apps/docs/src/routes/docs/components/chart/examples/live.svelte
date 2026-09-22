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
        revenue: { label: 'Revenue', color: 'var(--color-primary)' },
        target: { label: 'Target', color: 'var(--color-success)' }
    };
</script>

<Chart.Root
    {data}
    {config}
    x="month"
    aria-label="Monthly revenue and target"
    class="w-full"
    animation="live"
>
    <Chart.Legend />
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Line key="revenue" />
        <Chart.Line key="target" />
    </Chart.Plot>
    <Chart.Tooltip />
</Chart.Root>
