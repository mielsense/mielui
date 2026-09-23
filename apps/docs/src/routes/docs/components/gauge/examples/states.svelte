<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import * as Tabs from '@mielui/svelte/components/tabs';

    let dataState = $state('ready');
    let animation = $state('reveal');
    const motion = $derived(
        animation === 'live' ? 'live' : animation === 'none' ? 'none' : 'reveal'
    );
    let replay = $state(0);

    function replayAnimation() {
        replay += 1;
    }
</script>
<div class="w-full space-y-6">
    <div class="flex flex-wrap items-center gap-3">
        <Tabs.Root bind:value={dataState} variant="ghost">
            <div role="group" aria-label="Storage data state">
                <Tabs.List>
                    <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
                    <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
                    <Tabs.Trigger value="empty">No data</Tabs.Trigger>
                    <Tabs.Trigger value="zero">Zero</Tabs.Trigger>
                    <Tabs.Trigger value="full">Full</Tabs.Trigger>
                </Tabs.List>
            </div>
        </Tabs.Root>
        <Tabs.Root bind:value={animation} variant="ghost">
            <div role="group" aria-label="Gauge animation">
                <Tabs.List>
                    <Tabs.Trigger value="reveal">Reveal</Tabs.Trigger>
                    <Tabs.Trigger value="live">Live</Tabs.Trigger>
                    <Tabs.Trigger value="none">None</Tabs.Trigger>
                </Tabs.List>
            </div>
        </Tabs.Root>
        <Button variant="secondary" onclick={replayAnimation}>Replay</Button>
    </div>
    <div aria-busy={dataState === 'loading'} class="flex min-h-64 items-center justify-center">
        {#if dataState === 'loading' || dataState === 'empty'}
            <div class="flex flex-col items-center gap-3 text-center" role="status">
                {#if dataState === 'loading'}
                    <Skeleton
                        variant={animation === 'none' ? 'default' : 'shimmer'}
                        class="size-[120px] rounded-full [mask-image:radial-gradient(transparent_48%,#000_49%)]"
                    />
                {:else}
                    <Gauge value={0} label="No storage measurement" tone="muted">—</Gauge>
                {/if}
                <p class="text-sm text-foreground-muted">
                    {dataState === 'loading' ? 'Loading usage…' : 'No usage data'}
                </p>
            </div>
        {:else}
            {#key `${animation}-${replay}`}
                <div class="flex flex-col items-center gap-3">
                    <Gauge
                        value={dataState === 'zero' ? 0 : dataState === 'full' ? 100 : 64}
                        max={100}
                        animation={motion}
                        label="Storage used in GB"
                    />
                    <p class="text-sm text-foreground-muted">GB used of 100 GB</p>
                </div>
            {/key}
        {/if}
    </div>
</div>
