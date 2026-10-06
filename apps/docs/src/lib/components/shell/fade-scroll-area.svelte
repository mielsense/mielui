<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import ScrollEdge from './scroll-edge.svelte';
    import { fadeY, scrollFade } from './scroll-fade';

    const {
        class: className,
        start = false,
        end = true,
        hideScrollbar = false,
        children
    }: {
        class?: string;
        start?: boolean;
        end?: boolean;
        hideScrollbar?: boolean;
        children: Snippet;
    } = $props();

    let wrapper = $state<HTMLDivElement>();
    let viewport = $state<HTMLDivElement>();

    $effect(() => {
        if (!wrapper || !viewport) {
            return;
        }

        return scrollFade({ start, end, target: wrapper })(viewport);
    });
</script>

<!--
    @component
    ScrollArea whose edges fade and blur while more content lies beyond them.
-->

<div bind:this={wrapper} class={cn('relative flex min-h-0 flex-col', className)}>
    <ScrollArea
        bind:element={viewport}
        class={cn('h-full min-h-0 flex-1', fadeY, hideScrollbar && 'hide-scrollbar-all')}
        showCues={false}
    >
        {@render children()}
    </ScrollArea>
    {#if start}
        <ScrollEdge edge="top" />
    {/if}
    {#if end}
        <ScrollEdge edge="bottom" />
    {/if}
</div>
