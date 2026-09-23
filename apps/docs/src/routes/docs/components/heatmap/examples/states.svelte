<script lang="ts">
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let state = $state('ready');
    const days = [
        { date: '2026-09-10', count: 6 },
        { date: '2026-09-12', count: 12 },
        { date: '2026-09-15', count: 3 }
    ];
</script>
<div class="w-full space-y-4">
    <Tabs.Root bind:value={state} variant="ghost">
        <div role="group" aria-label="Activity data state">
            <Tabs.List>
                <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
                <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
                <Tabs.Trigger value="empty">No activity</Tabs.Trigger>
            </Tabs.List>
        </div>
    </Tabs.Root>
    <div aria-busy={state === 'loading'} class="min-h-48">
        {#if state === 'loading'}
            <p role="status" class="mb-4 text-sm text-foreground-muted">Loading activity…</p>
            <Skeleton class="h-36 w-full" />
        {:else}
            <Heatmap.Root days={state === 'empty' ? [] : days} weeks={12} endDate="2026-09-15" />
        {/if}
    </div>
</div>
