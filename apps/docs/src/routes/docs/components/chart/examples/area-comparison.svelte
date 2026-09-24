<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { month: 'Jan', desktop: 186, mobile: 120 },
        { month: 'Feb', desktop: 242, mobile: 150 },
        { month: 'Mar', desktop: 218, mobile: 180 },
        { month: 'Apr', desktop: 304, mobile: 220 },
        { month: 'May', desktop: 286, mobile: 240 }
    ];
    const config = {
        desktop: { label: 'Desktop', color: 'var(--chart-1)' },
        mobile: { label: 'Mobile', color: 'var(--chart-2)' }
    };
</script>

<Chart.Root {data} {config} x="month" aria-label="Desktop and mobile sessions" class="w-full">
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Area key="desktop" />
        <Chart.Area key="mobile" />
    </Chart.Plot>
    <Chart.Tooltip />
    <Chart.Legend />
</Chart.Root>
