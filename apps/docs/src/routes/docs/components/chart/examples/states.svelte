<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';
    import * as EmptyState from '@mielui/svelte/components/empty-state';

    let state = $state<'ready' | 'loading' | 'empty'>('ready');
    const records = [
        { month: 'April', orders: 48 },
        { month: 'May', orders: 72 },
        { month: 'June', orders: 61 }
    ];
    const data = $derived(state === 'empty' ? [] : records);
    const config = { orders: { label: 'Orders', color: 'var(--chart-1)' } };

    function showReady() {
        state = 'ready';
    }

    function showLoading() {
        state = 'loading';
    }

    function showEmpty() {
        state = 'empty';
    }
</script>
<div class="w-full space-y-4">
    <div class="flex flex-wrap gap-2">
        <Button variant="secondary" onclick={showReady}>Show data</Button>
        <Button variant="secondary" onclick={showLoading}>Show loading</Button>
        <Button variant="secondary" onclick={showEmpty}>Show empty</Button>
    </div>
    <Chart.Root
        {data}
        {config}
        x="month"
        loading={state === 'loading'}
        aria-label="Orders this quarter"
    >
        <Chart.Plot>
            {#snippet empty()}
                <EmptyState.Root class="border-0 p-4">
                    <EmptyState.Header>
                        <EmptyState.Title>No orders in this period</EmptyState.Title>
                        <EmptyState.Description>
                            Try another period to see your order history.
                        </EmptyState.Description>
                    </EmptyState.Header>
                    <EmptyState.Actions>
                        <Button variant="secondary" onclick={showReady}>Show last quarter</Button>
                    </EmptyState.Actions>
                </EmptyState.Root>
            {/snippet}
            <Chart.Grid />
            <Chart.XAxis />
            <Chart.YAxis />
            <Chart.Bar key="orders" />
        </Chart.Plot>
        <Chart.Tooltip />
    </Chart.Root>
</div>
