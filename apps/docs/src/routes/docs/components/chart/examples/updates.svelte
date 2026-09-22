<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';

    let quarter = $state(false);
    const data = $derived(
        quarter
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
    const config = { sales: { label: 'Orders', color: 'var(--color-primary)' } };

    function switchQuarter() {
        quarter = !quarter;
    }
</script>
<div class="w-full">
    <Button variant="secondary" onclick={switchQuarter}>
        {`Show ${quarter ? 'first' : 'second'} quarter`}
    </Button>
    <Chart.Root {data} {config} x="month" aria-label="Quarterly orders" class="mt-4">
        <Chart.Plot>
            <Chart.Grid />
            <Chart.XAxis />
            <Chart.YAxis />
            <Chart.Bar key="sales" />
        </Chart.Plot>
        <Chart.Tooltip />
        <Chart.Legend />
    </Chart.Root>
</div>
