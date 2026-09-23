<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
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
    <div aria-busy={dataState === 'loading'} class="w-full">
        {#key `${animation}-${replay}-${dataState}`}
            <div class="w-full">
                <Heatmap.Root
                    days={dataState === 'ready' ? days : []}
                    weeks={26}
                    endDate="2026-09-15"
                    animation={dataState === 'ready' ? animation : 'none'}
                >
                    <Heatmap.Header>
                        {#if dataState === 'ready'}
                            <Heatmap.Summary />
                        {:else}
                            <p class="text-sm font-medium">Activity</p>
                        {/if}
                    </Heatmap.Header>
                    <Heatmap.Calendar>
                        <Heatmap.MonthLabels />
                        <Heatmap.WeekdayLabels />
                        <Heatmap.Grid>
                            {#snippet children(cells)}
                                {#each cells as day (day.date)}
                                    {#if dataState === 'ready'}
                                        <Heatmap.Cell {day} />
                                    {:else}
                                        <div
                                            aria-hidden="true"
                                            class="aspect-square min-h-2.5 min-w-2.5"
                                            style:grid-column={day.column}
                                            style:grid-row={day.row}
                                        >
                                            <Skeleton
                                                variant={dataState === 'loading' && animation !== 'none' ? 'shimmer' : 'default'}
                                                class="size-full rounded-[calc(var(--radius-xs)*1.5)]"
                                            />
                                        </div>
                                    {/if}
                                {/each}
                            {/snippet}
                        </Heatmap.Grid>
                    </Heatmap.Calendar>
                    {#if dataState === 'ready'}
                        <Heatmap.Tooltip />
                    {/if}
                    <Heatmap.Footer>
                        {#if dataState === 'ready'}
                            <Heatmap.Detail />
                        {:else}
                            <p role="status" class="text-xs text-foreground-muted">
                                {dataState === 'loading' ? 'Loading activity…' : 'No activity for this period.'}
                            </p>
                        {/if}
                        <Heatmap.Legend />
                    </Heatmap.Footer>
                </Heatmap.Root>
            </div>
        {/key}
    </div>
</div>
