<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';

    let revised = $state(false);
    const data = $derived(
        revised
            ? [
                  { month: 'April', orders: 240 },
                  { month: 'May', orders: 190 },
                  { month: 'June', orders: 320 }
              ]
            : [
                  { month: 'April', orders: 170 },
                  { month: 'May', orders: 280 },
                  { month: 'June', orders: 210 }
              ]
    );
    const config = { orders: { label: 'Orders', color: 'var(--chart-1)' } };

    function switchRevision() {
        revised = !revised;
    }
</script>
<div class="w-full">
    <Button variant="secondary" onclick={switchRevision}>
        {revised ? 'Show original forecast' : 'Show revised forecast'}
    </Button>
    <Chart.Root
        {data}
        {config}
        x="month"
        aria-label="Order forecasts for April through June"
        class="mt-4"
    >
        <Chart.Plot>
            <Chart.Grid />
            <Chart.XAxis />
            <Chart.YAxis />
            <Chart.Area key="orders" />
        </Chart.Plot>
        <Chart.Tooltip />
        <Chart.Legend />
    </Chart.Root>
</div>
