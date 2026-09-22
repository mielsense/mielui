<script lang="ts">
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import type { Snippet } from 'svelte';
    import { getChart } from './context.svelte';

    let { loading, children }: { loading: boolean; children?: Snippet } = $props();
    const chart = getChart();
    const heights = [32, 56, 44, 70, 58, 82, 66, 90];
</script>
<div class="absolute inset-0 isolate grid place-items-center" role="status">
    <div
        aria-hidden="true"
        class="absolute inset-x-8 inset-y-7 -z-10 flex items-end gap-3 border-b border-border/50 pb-3 opacity-45"
    >
        {#each heights as height}
            <div class="flex-1" style:height={`${height}%`}>
                <Skeleton
                    variant={loading && chart.motion && chart.animation !== 'none' ? 'shimmer' : 'default'}
                    class="h-full w-full rounded-t-[var(--radius-md)] rounded-b-none"
                />
            </div>
        {/each}
    </div>
    <div
        class="rounded-[var(--radius-lg)] bg-background/90 px-5 py-4 text-center text-sm text-foreground-muted backdrop-blur-sm"
    >
        {#if children}
            {@render children()}
        {:else if loading}
            Loading chart…
        {:else}
            <div class="font-medium text-foreground">No data to display</div>
            <div class="mt-1 text-xs">Try another period or add your first record.</div>
        {/if}
    </div>
</div>
