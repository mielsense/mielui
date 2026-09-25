<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { date: new Date('2026-04-01T00:00:00Z'), visitors: 120 },
        { date: new Date('2026-04-03T00:00:00Z'), visitors: 180 },
        { date: new Date('2026-04-10T00:00:00Z'), visitors: 150 },
        { date: new Date('2026-04-12T00:00:00Z'), visitors: 230 }
    ];
    const config = { visitors: { label: 'Visitors', color: 'var(--chart-2)' } };
</script>

<Chart.Root
    {data}
    {config}
    x="date"
    aria-label="Visitors sampled at irregular dates"
    class="w-full"
>
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Line key="visitors" />
    </Chart.Plot>
    <Chart.Tooltip />
    <Chart.Legend />
</Chart.Root>
