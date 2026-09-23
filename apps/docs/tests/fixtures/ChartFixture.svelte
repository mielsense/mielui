<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    let {
        data = [
            { category: 'A', total: 10, target: 80 },
            { category: 'B', total: 20, target: 90 }
        ],
        loading = false,
        horizontal = false,
        stacked = false,
        animation = 'none'
    }: {
        data?: { category: string; total: number | null; target: number }[];
        loading?: boolean;
        horizontal?: boolean;
        stacked?: boolean;
        animation?: 'none' | 'reveal' | 'live';
    } = $props();
    const config = {
        total: { label: 'Total' },
        target: { label: 'Target', color: 'var(--color-success)' }
    };
</script>
<div class="w-[600px]">
    <Chart.Root
        {data}
        {config}
        x="category"
        aria-label="Test comparison"
        {animation}
        {loading}
        {stacked}
        orientation={horizontal ? 'horizontal' : 'vertical'}
    >
        <Chart.Plot>
            <Chart.Grid />
            <Chart.XAxis />
            <Chart.YAxis />
            <Chart.Bar key="total" />
            <Chart.Line key="target" />
        </Chart.Plot>
        <Chart.Legend />
        <Chart.Tooltip />
    </Chart.Root>
</div>
