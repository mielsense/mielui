<script lang="ts">
    import type { Snippet } from 'svelte';
    import OnThisPage from '$lib/components/docs/on-this-page.svelte';
    import '$lib/components/docs/docs-layout.css';
    import { magneticHeadings } from '$lib/components/docs/magnetic-headings';

    const { children }: { children: Snippet } = $props();
    const settleHeading = magneticHeadings(
        '[data-docs-page] > section:not([data-docs-toolbar]), #api-reference'
    );
    let content = $state<HTMLDivElement>();
    let viewport = $state<HTMLDivElement>();
</script>

<div
    class="grid h-full min-h-0 w-full grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_16rem]"
>
    <div class="flex min-h-0 min-w-0 flex-col overflow-hidden bg-[var(--docs-content)]">
        <div
            bind:this={viewport}
            {@attach settleHeading}
            data-docs-scroll
            class="min-h-0 flex-1 bg-[var(--docs-content)] overflow-y-auto overscroll-none [container-type:inline-size] [--docs-gutter:calc((var(--spacing)*5+2rem)/2)]"
        >
            <div bind:this={content} class="docs-article w-full min-w-0">
                {@render children?.()}
            </div>
        </div>
    </div>
    <aside class="hidden min-h-0 overflow-y-auto bg-[var(--docs-content)] md:block">
        <div class="flex h-[var(--docs-row-height)] items-center px-5 text-sm font-medium">
            On this page
        </div>
        <OnThisPage {content} />
    </aside>
</div>
