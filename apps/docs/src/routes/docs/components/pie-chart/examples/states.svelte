<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as PieChart from '@mielui/svelte/components/pie-chart';

    let state = $state<'loading' | 'empty' | 'ready'>('loading');
    const config = {
        completed: { label: 'Completed', color: 'var(--color-success)' },
        remaining: { label: 'Remaining', color: 'var(--color-primary)' }
    };
    const data = $derived(
        state === 'empty'
            ? []
            : [
                  { key: 'completed', value: 72 },
                  { key: 'remaining', value: 28 }
              ]
    );

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

<div class="w-full max-w-lg">
    <div class="flex flex-wrap justify-center gap-2">
        <Button variant={state === 'loading' ? 'primary' : 'secondary'} onclick={showLoading}>
            Loading
        </Button>
        <Button variant={state === 'empty' ? 'primary' : 'secondary'} onclick={showEmpty}>
            Empty
        </Button>
        <Button variant={state === 'ready' ? 'primary' : 'secondary'} onclick={showReady}>
            Ready
        </Button>
    </div>
    <PieChart.Root {data} {config} loading={state === 'loading'} aria-label="Checklist completion">
        <PieChart.Plot>
            <PieChart.Arc />
            <PieChart.Label />
        </PieChart.Plot>
        {#if state === 'ready'}
            <PieChart.Legend />
        {/if}
        <PieChart.Tooltip />
    </PieChart.Root>
</div>
