<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    let {
        animation = 'none',
        loading = false,
        data = [
            { key: 'direct', value: 60 },
            { key: 'search', value: 40 }
        ]
    }: {
        animation?: 'none' | 'reveal' | 'live';
        loading?: boolean;
        data?: { key: string; value: number }[];
    } = $props();
    const config = {
        direct: { label: 'Direct', color: 'var(--color-primary)' },
        search: { label: 'Search', color: 'var(--color-success)' }
    };
</script>
<PieChart.Root
    {data}
    {config}
    {animation}
    {loading}
    aria-label="Traffic sources"
    class="w-96"
    style="--color-primary: #ba7ca5; --color-success: #2ca878;"
>
    <PieChart.Plot>
        <PieChart.Arc />
        <PieChart.Label />
    </PieChart.Plot>
    <PieChart.Tooltip />
    <PieChart.Legend />
</PieChart.Root>
