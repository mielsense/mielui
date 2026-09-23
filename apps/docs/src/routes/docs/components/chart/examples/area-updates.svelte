<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';

    let revised = $state(false);
    const data = $derived(
        revised
            ? [
                  { month: 'April', sales: 240 },
                  { month: 'May', sales: 190 },
                  { month: 'June', sales: 320 }
              ]
            : [
                  { month: 'April', sales: 170 },
                  { month: 'May', sales: 280 },
                  { month: 'June', sales: 210 }
              ]
    );
    const config = { sales: { label: 'Orders', color: 'oklch(0.74 0.12 25)' } };

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
            <Chart.Area key="sales" />
        </Chart.Plot>
        <Chart.Tooltip />
        <Chart.Legend />
    </Chart.Root>
</div>
