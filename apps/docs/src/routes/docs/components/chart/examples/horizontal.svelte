<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { month: 'Jan', desktop: 186, mobile: 160 },
        { month: 'Feb', desktop: 242, mobile: 190 },
        { month: 'Mar', desktop: 218, mobile: 220 },
        { month: 'Apr', desktop: 304, mobile: 250 },
        { month: 'May', desktop: 286, mobile: 280 },
        { month: 'Jun', desktop: 372, mobile: 310 }
    ];
    const config = {
        desktop: { label: 'Desktop', color: 'var(--color-primary)' },
        mobile: { label: 'Mobile', color: 'var(--color-success)' }
    };
</script>

<Chart.Root
    {data}
    {config}
    x="month"
    aria-label="Monthly visitors by device"
    class="w-full"
    orientation="horizontal"
    stacked
>
    <Chart.Legend />
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar key="desktop" />
        <Chart.Bar key="mobile" />
    </Chart.Plot>
    <Chart.Tooltip />
</Chart.Root>
