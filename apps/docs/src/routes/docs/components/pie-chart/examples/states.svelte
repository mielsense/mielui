<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    const records = [
        { key: 'completed', value: 72 },
        { key: 'remaining', value: 28 }
    ];
    const config = {
        completed: { label: 'Completed', color: 'var(--chart-2)' },
        remaining: { label: 'Remaining', color: 'var(--chart-1)' }
    };

    let view = $state<'loading' | 'empty' | 'ready'>('loading');

    const data = $derived(view === 'empty' ? [] : records);

    function showReady() {
        view = 'ready';
    }

    function showLoading() {
        view = 'loading';
    }

    function showEmpty() {
        view = 'empty';
    }
</script>

<div class="w-full max-w-lg">
    <div class="flex flex-wrap justify-center gap-2">
        <Button variant={view === 'loading' ? 'primary' : 'secondary'} onclick={showLoading}>
            Loading
        </Button>
        <Button variant={view === 'empty' ? 'primary' : 'secondary'} onclick={showEmpty}>
            Empty
        </Button>
        <Button variant={view === 'ready' ? 'primary' : 'secondary'} onclick={showReady}>
            Ready
        </Button>
    </div>
    <PieChart.Root {data} {config} loading={view === 'loading'} aria-label="Checklist completion">
        <PieChart.Plot>
            <PieChart.Arc />
            <PieChart.Label />
        </PieChart.Plot>
        {#if view === 'ready'}
            <PieChart.Legend />
        {/if}
        <PieChart.Tooltip />
    </PieChart.Root>
</div>
