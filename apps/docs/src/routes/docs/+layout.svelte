<script lang="ts">
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import { magneticHeadings } from '$lib/components/docs/magnetic-headings';
    import OnThisPage from '$lib/components/docs/on-this-page.svelte';
    import ScrollEdge from '$lib/components/shell/scroll-edge.svelte';
    import { fadeYEnd, scrollFade } from '$lib/components/shell/scroll-fade';
    import '$lib/components/docs/docs-layout.css';

    const { children }: { children: Snippet } = $props();
    const settleHeading = magneticHeadings(
        '[data-docs-page] > section:not([data-docs-toolbar]), #api-reference'
    );
    let content = $state<HTMLDivElement>();
</script>

<div class="relative h-full min-h-0 w-full">
    <div
        data-docs-scroll
        {@attach settleHeading}
        {@attach scrollFade({ size: 44, target: 'parent' })}
        class={`h-full min-h-0 w-full overflow-y-auto overscroll-contain [container-type:inline-size] ${fadeYEnd}`}
    >
        <div class="flex w-full gap-12 px-5 pt-8 pb-24 sm:px-10 lg:pt-12 2xl:gap-16 2xl:px-14">
            <div class="flex w-full min-w-0 flex-1 flex-col">
                <div bind:this={content} class="docs-article w-full min-w-0">
                    {@render children?.()}
                </div>
                {#if page.status < 400}
                    <DocsPager />
                {/if}
            </div>
            <aside class="sticky top-12 hidden w-52 shrink-0 self-start xl:block">
                <OnThisPage {content} />
            </aside>
        </div>
    </div>
    <ScrollEdge edge="top" fill />
    <ScrollEdge edge="bottom" />
</div>
