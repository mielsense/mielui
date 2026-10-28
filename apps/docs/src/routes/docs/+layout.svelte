<script lang="ts">
    import type { Snippet } from 'svelte';
    import DocsPager from '#lib/components/docs/docs-pager.svelte';
    import { magneticHeadings } from '#lib/components/docs/magnetic-headings.js';
    import PageMinimap from '#lib/components/docs/page-minimap.svelte';
    import { createPageOutline } from '#lib/components/docs/page-outline.svelte.js';
    import ScrollEdge from '#lib/components/shell/scroll-edge.svelte';
    import { scrollFade } from '#lib/components/shell/scroll-fade.js';
    import { getShell } from '#lib/components/shell/shell.svelte.js';
    import { page } from '$app/state';
    import '#lib/components/docs/docs-layout.css';

    const { children }: { children: Snippet } = $props();
    const settleHeading = magneticHeadings(
        '[data-docs-page] > section:not([data-docs-toolbar]), #api-reference'
    );
    let content = $state<HTMLDivElement>();
    const shell = getShell();
    const outline = createPageOutline(() => content);

    $effect(() => {
        shell.outline = outline;

        return () => {
            shell.outline = undefined;
        };
    });
</script>

<div
    class="relative h-full min-h-0 w-full has-[[data-docs-toolbar]]:[&>[data-scroll-edge=top]]:hidden"
>
    <div
        data-docs-scroll
        {@attach settleHeading}
        {@attach scrollFade({ size: 44, target: 'parent' })}
        class="h-full min-h-0 w-full overflow-y-auto overscroll-contain [container-type:inline-size]"
    >
        <div class="flex w-full justify-center px-5 pt-8 pb-24 sm:px-10 lg:pt-14 xl:px-20">
            <div class="flex min-w-0 flex-[0_1_60rem] flex-col">
                <div bind:this={content} class="docs-article w-full min-w-0">
                    {@render children()}
                </div>
                {#if page.status < 400}
                    <DocsPager />
                {/if}
            </div>
            <div
                aria-hidden="true"
                data-sidebar-balance
                class="hidden flex-[0_1000_16.5rem] lg:block"
            ></div>
        </div>
    </div>
    <aside
        class="pointer-events-none absolute inset-y-0 end-5 z-20 hidden items-center py-24 xl:flex [&>nav]:pointer-events-auto"
    >
        <PageMinimap {outline} />
    </aside>
    <ScrollEdge edge="top" fill />
    <ScrollEdge edge="bottom" fill />
</div>
