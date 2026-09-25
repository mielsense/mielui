<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/pie-chart';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let dataState = $state('ready');
    let animation = $state<'reveal' | 'live' | 'none'>('reveal');
    let replay = $state(0);
    const records = [
        { key: 'completed', value: 72 },
        { key: 'remaining', value: 28 }
    ];
    const config = {
        completed: { label: 'Completed', color: 'var(--chart-1)' },
        remaining: { label: 'Remaining', color: 'var(--chart-2)' }
    };
    const data = $derived(
        dataState === 'empty'
            ? []
            : dataState === 'zero'
              ? records.map((item) => ({ ...item, value: 0 }))
              : records
    );
    function changeAnimation(value: string) {
        if (value === 'reveal' || value === 'live' || value === 'none') {
            animation = value;
        }
    }
</script>
<div class="w-full space-y-4">
    <div class="flex flex-wrap items-center gap-3">
        <Tabs.Root bind:value={dataState} variant="ghost">
            <div role="group" aria-label="Chart data state">
                <Tabs.List>
                    <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
                    <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
                    <Tabs.Trigger value="empty">No data</Tabs.Trigger>
                    <Tabs.Trigger value="zero">Zero total</Tabs.Trigger>
                </Tabs.List>
            </div>
        </Tabs.Root>
        <Tabs.Root value={animation} onValueChange={changeAnimation} variant="ghost">
            <div role="group" aria-label="Chart animation">
                <Tabs.List>
                    <Tabs.Trigger value="reveal">Reveal</Tabs.Trigger>
                    <Tabs.Trigger value="live">Live</Tabs.Trigger>
                    <Tabs.Trigger value="none">None</Tabs.Trigger>
                </Tabs.List>
            </div>
        </Tabs.Root>
        <Button variant="secondary" onclick={() => { replay += 1; }}>Replay</Button>
    </div>
    {#key `${animation}-${replay}`}
        <Chart.Root
            {data}
            {config}
            {animation}
            loading={dataState === 'loading'}
            aria-label="Quarterly orders"
        >
            <Chart.Plot>
                <Chart.Arc innerRadius={0} />
            </Chart.Plot>
            <Chart.Legend />
            <Chart.Tooltip />
        </Chart.Root>
    {/key}
</div>
