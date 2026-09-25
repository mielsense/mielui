<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { month: 'Mon', latency: 42 },
        { month: 'Tue', latency: 58 },
        { month: 'Wed', latency: null },
        { month: 'Thu', latency: 47 },
        { month: 'Fri', latency: 39 },
        { month: 'Sat', latency: 45 }
    ];
    const config = {
        latency: {
            label: 'Latency',
            color: 'var(--chart-1)',
            format: (value: number) => `${value} ms`
        }
    };
</script>

<Chart.Root
    {data}
    {config}
    x="month"
    aria-label="Response latency with a missing Wednesday measurement"
    class="w-full"
>
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Line key="latency" />
    </Chart.Plot>
    <Chart.Tooltip />
    <Chart.Legend />
</Chart.Root>
