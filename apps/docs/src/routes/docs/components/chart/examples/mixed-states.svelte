<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let state = $state('ready');
    let animation = $state<'reveal' | 'live' | 'none'>('reveal');
    let replay = $state(0);
    const records = [
        { month: 'April', orders: 48, target: 60 },
        { month: 'May', orders: 72, target: 65 },
        { month: 'June', orders: 61, target: 70 }
    ];
    const config = {
        orders: { label: 'Orders', color: 'var(--color-primary)' },
        target: { label: 'Target', color: 'var(--color-foreground-muted)' }
    };
    const data = $derived(state === 'empty' ? [] : records);
    function changeAnimation(value: string) {
        if (value === 'reveal' || value === 'live' || value === 'none') {
            animation = value;
        }
    }
</script>
<div class="w-full space-y-4">
    <div class="flex flex-wrap items-center gap-3">
        <Tabs.Root bind:value={state} variant="ghost">
            <Tabs.List aria-label="Chart data state">
                <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
                <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
                <Tabs.Trigger value="empty">No data</Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
        <Tabs.Root value={animation} onValueChange={changeAnimation} variant="ghost">
            <Tabs.List aria-label="Chart animation">
                <Tabs.Trigger value="reveal">Reveal</Tabs.Trigger>
                <Tabs.Trigger value="live">Live</Tabs.Trigger>
                <Tabs.Trigger value="none">None</Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
        <Button variant="secondary" onclick={() => { replay += 1; }}>Replay</Button>
    </div>
    {#key `${animation}-${replay}`}
        <Chart.Root
            {data}
            {config}
            {animation}
            x="month"
            loading={state === 'loading'}
            aria-label="Quarterly orders"
        >
            <Chart.Plot>
                <Chart.Grid />
                <Chart.XAxis />
                <Chart.YAxis />
                <Chart.Bar key="orders" />
                <Chart.Line key="target" />
            </Chart.Plot>
            <Chart.Legend />
            <Chart.Tooltip />
        </Chart.Root>
    {/key}
</div>
