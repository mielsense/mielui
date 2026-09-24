<script lang="ts">
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    const data = [
        { key: 'storage', value: 1840 },
        { key: 'compute', value: 3260 },
        { key: 'network', value: 900 }
    ];
    const currency = (value: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    const config = {
        storage: { label: 'Storage', color: 'var(--chart-1)', format: currency },
        compute: { label: 'Compute', color: 'var(--chart-2)', format: currency },
        network: { label: 'Network', color: 'var(--chart-3)', format: currency }
    };
</script>

<div class="@container w-full max-w-2xl">
    <h3 class="font-medium">Infrastructure spend</h3>
    <p class="mt-1 text-sm text-foreground-muted">This month, before tax.</p>
    <PieChart.Root
        {data}
        {config}
        aria-label="Monthly infrastructure spend"
        class="grid items-center gap-6 @lg:grid-cols-2"
    >
        <PieChart.Plot class="h-64">
            <PieChart.Arc innerRadius={0.78} padAngle={0.025} cornerRadius={3} />
            <PieChart.Label class="text-2xl">
                {#snippet children({ total, active })}
                    <tspan x="0" dy="-0.1em">{currency(active?.value ?? total)}</tspan>
                    <tspan x="0" dy="1.8em" class="fill-foreground-muted text-xs font-normal">
                        {active ? config[active.key as keyof typeof config].label : 'Total spend'}
                    </tspan>
                {/snippet}
            </PieChart.Label>
        </PieChart.Plot>
        <PieChart.Legend
            class="flex-col items-stretch gap-2 [&_button]:w-full [&_button]:justify-between"
        >
            {#snippet children({ item, label, value, percentage })}
                <span class="flex items-center gap-2">
                    <span
                        class="size-2 rounded-full"
                        style:background={config[item.key as keyof typeof config].color}
                    ></span>
                    {label}
                </span>
                <span class="ml-auto pl-4 text-right">
                    <span class="block text-foreground tabular-nums">{value}</span>
                    <span class="block text-xs tabular-nums">{percentage.toFixed(1)}%</span>
                </span>
            {/snippet}
        </PieChart.Legend>
        <PieChart.Tooltip>
            {#snippet children({ label, value, percentage })}
                <span class="grid gap-1">
                    <span class="text-foreground-muted">{label}</span>
                    <span class="font-medium">{value} ·{percentage.toFixed(1)}%</span>
                </span>
            {/snippet}
        </PieChart.Tooltip>
    </PieChart.Root>
</div>
