<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { days } from './data';

    let dataState = $state('ready');
    let animation = $state('rows');
    let replay = $state(0);
    const entrance = $derived(
        animation === 'columns' ? 'columns' : animation === 'rows' ? 'rows' : 'none'
    );

    function replayCalendar() {
        replay += 1;
    }

    function highlightCalendar(element: HTMLElement) {
        if (animation !== 'live' || dataState !== 'ready') {
            return;
        }
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let visible = false;
        let inspecting = false;
        let disposed = false;
        let animations: Animation[] = [];

        function update() {
            const duration = getCssDuration(element, '--motion-duration-panel', 180);
            const enabled = !preference.matches && duration > 0;
            if (!enabled) {
                for (const current of animations) {
                    current.cancel();
                }
                animations = [];
                return;
            }
            if (!animations.length) {
                animations = Array.from(
                    element.querySelectorAll<HTMLElement>('[data-ui="heatmap-cell"]')
                ).map((cell, index) => {
                    const column = Math.floor(index / 7);
                    return cell.animate(
                        [
                            { filter: 'brightness(1)' },
                            { filter: 'brightness(1.5)', offset: 0.12 },
                            { filter: 'brightness(1)', offset: 0.3 },
                            { filter: 'brightness(1)' }
                        ],
                        {
                            duration: (4800 * duration) / 180,
                            delay: column * 90,
                            iterations: Infinity,
                            easing: 'ease-in-out'
                        }
                    );
                });
            }
            for (const current of animations) {
                if (visible && !document.hidden && !inspecting) {
                    current.play();
                } else {
                    current.pause();
                }
            }
        }
        function inspect() {
            inspecting = true;
            update();
        }
        function resume() {
            queueMicrotask(() => {
                if (disposed) {
                    return;
                }
                inspecting = element.matches(':hover') || element.contains(document.activeElement);
                update();
            });
        }
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? false;
            update();
        });
        const themeObserver = new MutationObserver(update);
        for (
            let ancestor: HTMLElement | null = element;
            ancestor;
            ancestor = ancestor.parentElement
        ) {
            themeObserver.observe(ancestor, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }
        observer.observe(element);
        preference.addEventListener('change', update);
        document.addEventListener('visibilitychange', update);
        element.addEventListener('pointerenter', inspect);
        element.addEventListener('pointerleave', resume);
        element.addEventListener('focusin', inspect);
        element.addEventListener('focusout', resume);
        return () => {
            disposed = true;
            observer.disconnect();
            themeObserver.disconnect();
            preference.removeEventListener('change', update);
            document.removeEventListener('visibilitychange', update);
            element.removeEventListener('pointerenter', inspect);
            element.removeEventListener('pointerleave', resume);
            element.removeEventListener('focusin', inspect);
            element.removeEventListener('focusout', resume);
            for (const current of animations) {
                current.cancel();
            }
        };
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
        <Tabs.Root bind:value={animation} variant="ghost">
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
            <div class="w-full" {@attach highlightCalendar}>
                <Heatmap.Root
                    days={dataState === 'ready' ? days : []}
                    weeks={26}
                    endDate="2026-09-15"
                    animation={dataState === 'ready' ? entrance : 'none'}
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
