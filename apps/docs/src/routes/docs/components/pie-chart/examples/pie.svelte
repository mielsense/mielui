<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    const data = [
        { key: 'paid', value: 64 },
        { key: 'trial', value: 24 },
        { key: 'free', value: 12 }
    ];
    const config = {
        paid: {
            label: 'Paid',
            color: 'var(--chart-1)',
            format: (value: number) => `${value}%`
        },
        trial: {
            label: 'Trial',
            color: 'var(--chart-2)',
            format: (value: number) => `${value}%`
        },
        free: {
            label: 'Free',
            color: 'var(--chart-3)',
            format: (value: number) => `${value}%`
        }
    };
</script>

<PieChart.Root
    {data}
    {config}
    aria-label="Accounts by subscription status"
    animation="none"
    class="w-full max-w-lg"
>
    <PieChart.Legend />
    <PieChart.Plot class="h-64">
        <PieChart.Arc innerRadius={0} cornerRadius={2} padAngle={0.02} />
    </PieChart.Plot>
    <PieChart.Tooltip />
</PieChart.Root>
