<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { days } from './data';

    let dataState = $state('ready');
    let animation = $state<'rows' | 'columns' | 'live' | 'none'>('rows');
    let replay = $state(0);

    function changeAnimation(value: string) {
        if (value === 'rows' || value === 'columns' || value === 'live' || value === 'none') {
            animation = value;
        }
    }

    function replayCalendar() {
        replay += 1;
    }
</script>
<div class="w-full space-y-6">
    <div class="flex flex-wrap items-center gap-3">
        <Tabs.Root bind:value={dataState} variant="ghost">
            <div role="group" aria-label="Activity data state">
                <Tabs.List>
                    <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
                    <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
                    <Tabs.Trigger value="empty">No data</Tabs.Trigger>
                </Tabs.List>
            </div>
        </Tabs.Root>
        <Tabs.Root value={animation} onValueChange={changeAnimation} variant="ghost">
            <div role="group" aria-label="Activity animation">
                <Tabs.List>
                    <Tabs.Trigger value="rows">Rows</Tabs.Trigger>
                    <Tabs.Trigger value="columns">Columns</Tabs.Trigger>
                    <Tabs.Trigger value="live">Live</Tabs.Trigger>
                    <Tabs.Trigger value="none">None</Tabs.Trigger>
                </Tabs.List>
            </div>
        </Tabs.Root>
        <Button variant="secondary" onclick={replayCalendar}>Replay</Button>
    </div>
    {#key `${animation}-${replay}`}
        <Heatmap.Root
            days={dataState === 'empty' ? [] : days}
            loading={dataState === 'loading'}
            weeks={26}
            endDate="2026-09-15"
            {animation}
        />
    {/key}
</div>
