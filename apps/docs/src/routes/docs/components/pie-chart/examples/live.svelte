<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    let annual = $state(false);
    const data = $derived([
        { key: 'team', value: annual ? 680 : 420 },
        { key: 'solo', value: annual ? 320 : 580 }
    ]);
    const config = {
        team: { label: 'Team', color: 'var(--color-primary)' },
        solo: { label: 'Solo', color: 'var(--color-info)' }
    };

    function switchPeriod() {
        annual = !annual;
    }
</script>

<div class="w-full max-w-lg">
    <div class="flex items-center justify-between gap-4">
        <h3 class="font-medium">{annual ? 'Annual plans' : 'Monthly plans'}</h3>
        <Button variant="secondary" onclick={switchPeriod}>Switch period</Button>
    </div>
    <PieChart.Root {data} {config} animation="live" aria-label="Subscriptions by plan">
        <PieChart.Plot>
            <PieChart.Arc innerRadius={0.76} padAngle={0.045} />
            <PieChart.Label>
                {#snippet children({ total, active })}
                    {active ? active.value : total}
                {/snippet}
            </PieChart.Label>
        </PieChart.Plot>
        <PieChart.Tooltip />
        <PieChart.Legend />
    </PieChart.Root>
</div>
