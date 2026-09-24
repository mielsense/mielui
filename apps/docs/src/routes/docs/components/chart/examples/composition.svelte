<script lang="ts">
    import * as Chart from '@mielui/svelte/components/chart';

    const data = [
        { day: 'Mon', requests: 420, target: 500 },
        { day: 'Tue', requests: 670, target: 600 },
        { day: 'Wed', requests: 590, target: 650 },
        { day: 'Thu', requests: 810, target: 750 },
        { day: 'Fri', requests: 940, target: 800 }
    ];
    const config = {
        target: { label: 'Target', color: 'var(--chart-2)' },
        requests: {
            label: 'API requests',
            color: 'var(--chart-1)',
            format: (value: number) => `${value.toLocaleString()} requests`
        }
    };
</script>
<Chart.Root
    {data}
    {config}
    x="day"
    animation="live"
    aria-label="API requests by weekday"
    class="w-full"
>
    <Chart.Legend>
        {#snippet children({ label, color })}
            <div class="flex items-center gap-2 text-sm">
                <span class="h-0.5 w-5 rounded-full" style:background={color}></span>
                {label}
                <span class="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
                    Live example
                </span>
            </div>
        {/snippet}
    </Chart.Legend>
    <Chart.Plot class="h-56">
        <Chart.XAxis />
        <Chart.Bar key="requests" />
        <Chart.Line key="target" />
    </Chart.Plot>
    <Chart.Tooltip>
        {#snippet children({ label, values })}
            <div class="flex flex-col gap-1">
                <span class="text-foreground-muted">{label}</span>
                {#each values as item}
                    <strong class="text-sm font-medium tabular-nums">{item.formatted}</strong>
                {/each}
            </div>
        {/snippet}
    </Chart.Tooltip>
</Chart.Root>
