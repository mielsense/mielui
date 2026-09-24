<script lang="ts">
    import type { Snippet } from 'svelte';
    import '$lib/components/docs/docs-layout.css';
    import { magneticHeadings } from '$lib/components/docs/magnetic-headings';

    const { children }: { children: Snippet } = $props();
    const settleHeading = magneticHeadings(
        '[data-docs-page] > section:not([data-docs-toolbar]), #api-reference'
    );
    let viewport = $state<HTMLDivElement>();
</script>

<div class="grid h-full min-h-0 w-full grid-cols-[minmax(0,1fr)]">
    <div class="flex min-h-0 min-w-0 flex-col overflow-hidden bg-[var(--docs-content)]">
        <div
            bind:this={viewport}
            {@attach settleHeading}
            data-docs-scroll
            class="min-h-0 flex-1 bg-[var(--docs-content)] overflow-y-auto overscroll-none [container-type:inline-size] [--docs-gutter:calc((var(--spacing)*5+2rem)/2)]"
        >
            <div class="docs-article w-full min-w-0">
                {@render children?.()}
            </div>
        </div>
    </div>
</div>
