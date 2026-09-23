<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { month: 'Jan', revenue: 186 },
        { month: 'Feb', revenue: 242 },
        { month: 'Mar', revenue: 218 },
        { month: 'Apr', revenue: 304 },
        { month: 'May', revenue: 286 },
        { month: 'Jun', revenue: 372 }
    ];
    const config = {
        revenue: { label: 'Revenue', color: 'oklch(0.74 0.12 25)' }
    };
</script>

<Chart.Root {data} {config} x="month" aria-label="Monthly revenue" class="w-full">
    <Chart.Legend />
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Area key="revenue" />
    </Chart.Plot>
    <Chart.Tooltip />
</Chart.Root>
