<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { getCssDuration } from '@mielui/svelte/transition';
    import { days } from './data';

    let state = $state('ready');
    let animation = $state('rows');
    let replay = $state(0);
    const entrance = $derived(
        animation === 'columns' ? 'columns' : animation === 'rows' ? 'rows' : 'none'
    );

    function replayCalendar() {
        replay += 1;
    }

    function highlightCalendar(element: HTMLElement) {
        if (animation !== 'live' || state !== 'ready') {
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
        <Tabs.Root bind:value={state} variant="ghost">
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
    <div aria-busy={state === 'loading'} class="relative flex min-h-64 items-center justify-center">
        {#if state === 'ready'}
            {#key `${animation}-${replay}`}
                <div class="w-full" {@attach highlightCalendar}>
                    <Heatmap.Root {days} weeks={26} endDate="2026-09-15" animation={entrance} />
                </div>
            {/key}
        {:else}
            {#if state === 'loading'}
                <div
                    aria-hidden="true"
                    class="absolute inset-x-0 grid grid-cols-12 gap-1 opacity-50"
                >
                    {#each Array.from({ length: 84 }) as _, index (index)}
                        <Skeleton class="h-5 rounded-sm" />
                    {/each}
                </div>
            {/if}
            <Card.Root variant="inset" class="relative w-full max-w-xs text-center" role="status">
                <Card.Content>
                    <Card.Title>
                        {state === 'loading' ? 'Loading activity' : 'No activity yet'}
                    </Card.Title>
                    <Card.Description class="mt-2">
                        {state === 'loading' ? 'Fetching contributions for this period.' : 'Contributions will appear here when activity is available.'}
                    </Card.Description>
                </Card.Content>
            </Card.Root>
        {/if}
    </div>
</div>
