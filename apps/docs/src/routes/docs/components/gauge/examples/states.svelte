<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
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
    <div class="flex min-h-64 items-center justify-center">
        {#key `${animation}-${replay}`}
            <div class="flex flex-col items-center gap-3">
                <Gauge
                    value={dataState === 'empty' ? null : dataState === 'zero' ? 0 : dataState === 'full' ? 100 : 64}
                    loading={dataState === 'loading'}
                    max={100}
                    animation={motion}
                    label="Storage used in GB"
                />
                <p class="text-sm text-foreground-muted">GB used of 100 GB</p>
            </div>
        {/key}
    </div>
</div>
