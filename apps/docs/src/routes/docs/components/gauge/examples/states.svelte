<script lang="ts">
    import { Gauge } from '@mielui/svelte/components/gauge';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let state = $state('ready');
</script>
<div class="w-full space-y-6">
    <Tabs.Root bind:value={state} variant="ghost">
        <Tabs.List aria-label="Storage data state">
            <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
            <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
            <Tabs.Trigger value="empty">No data</Tabs.Trigger>
            <Tabs.Trigger value="zero">Zero</Tabs.Trigger>
            <Tabs.Trigger value="full">Full</Tabs.Trigger>
        </Tabs.List>
    </Tabs.Root>
    <div
        aria-busy={state === 'loading'}
        class="flex min-h-40 flex-col items-center justify-center gap-3"
    >
        {#if state === 'loading'}
            <Skeleton class="size-30 rounded-full" />
            <p role="status" class="text-sm text-foreground-muted">Loading storage usage…</p>
        {:else if state === 'empty'}
            <p class="text-sm text-foreground-muted">Storage usage is unavailable.</p>
        {:else}
            <Gauge
                value={state === 'zero' ? 0 : state === 'full' ? 100 : 64}
                max={100}
                label="Storage used in GB"
            />
            <p class="text-sm text-foreground-muted">GB used of 100 GB</p>
        {/if}
    </div>
</div>
