<script lang="ts">
    import type { Snippet } from 'svelte';
    import '$lib/components/docs/docs-layout.css';
    import { magneticHeadings } from '$lib/components/docs/magnetic-headings';
    import OnThisPage from '$lib/components/docs/on-this-page.svelte';
    import SectionIntersections from '$lib/components/docs/section-intersections.svelte';

    const { children }: { children: Snippet } = $props();
    const settleHeading = magneticHeadings(
        '[data-docs-page] > section:not([data-docs-toolbar]), #api-reference'
    );
    let content = $state<HTMLDivElement>();
    let viewport = $state<HTMLDivElement>();
</script>

<div
    class="grid h-full min-h-0 w-full grid-cols-[minmax(0,1fr)] gap-0 xl:grid-cols-[minmax(0,1fr)_18rem]"
>
    <div class="flex min-h-0 min-w-0 flex-col">
        <div
            bind:this={viewport}
            {@attach settleHeading}
            data-docs-scroll
            class="min-h-0 flex-1 bg-[var(--docs-content)] overflow-y-auto overscroll-none [container-type:inline-size] [--docs-gutter:1.25rem] sm:[--docs-gutter:1.5rem] lg:[--docs-gutter:2rem]"
        >
            <div bind:this={content} class="docs-article w-full min-w-0">
                {@render children?.()}
            </div>
        </div>
    </div>
    <aside
        class="hidden min-h-0 min-w-0 overflow-y-auto overscroll-none border-l-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] xl:block"
    >
        <OnThisPage {content} />
    </aside>
</div>

<SectionIntersections {content} {viewport} />
