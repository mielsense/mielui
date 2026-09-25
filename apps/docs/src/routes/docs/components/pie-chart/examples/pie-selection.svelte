<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';
    import { Switch } from '@mielui/svelte/components/switch';

    let includeInternal = $state(true);
    const records = [
        { key: 'search', value: 420 },
        { key: 'direct', value: 280 },
        { key: 'internal', value: 160 }
    ];
    const data = $derived(records.filter((item) => includeInternal || item.key !== 'internal'));
    const config = {
        search: { label: 'Search', color: 'var(--chart-1)' },
        direct: { label: 'Direct', color: 'var(--chart-2)' },
        internal: { label: 'Internal', color: 'var(--chart-3)' }
    };
</script>

<div class="w-full max-w-lg space-y-4">
    <Switch bind:checked={includeInternal} label="Include internal traffic" />
    <PieChart.Root {data} {config} aria-label="Traffic sources">
        <PieChart.Plot><PieChart.Arc innerRadius={0} /></PieChart.Plot>
        <PieChart.Tooltip />
        <PieChart.Legend>
            {#snippet children({ label, percentage })}
                <span>{label}</span>
                <span class="tabular-nums text-foreground">{percentage.toFixed(1)}%</span>
            {/snippet}
        </PieChart.Legend>
    </PieChart.Root>
</div>
