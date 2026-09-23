<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { month: 'Jan', balance: 24 },
        { month: 'Feb', balance: -12 },
        { month: 'Mar', balance: 38 },
        { month: 'Apr', balance: -6 },
        { month: 'May', balance: 19 }
    ];
    const config = { balance: { label: 'Net new accounts', color: 'oklch(0.74 0.12 25)' } };
</script>

<Chart.Root {data} {config} x="month" aria-label="Net account changes by month" class="w-full">
    <Chart.Plot>
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar key="balance" />
    </Chart.Plot>
    <Chart.Tooltip />
    <Chart.Legend />
</Chart.Root>
