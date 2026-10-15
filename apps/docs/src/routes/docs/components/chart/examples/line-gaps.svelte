<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { day: 'Mon', latency: 42 },
        { day: 'Tue', latency: 58 },
        { day: 'Wed', latency: null },
        { day: 'Thu', latency: 47 },
        { day: 'Fri', latency: 39 },
        { day: 'Sat', latency: 45 }
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
    x="day"
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
