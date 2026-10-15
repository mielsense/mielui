<script lang="ts">
    import * as Card from '@mielui/svelte/components/card';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import type { Snippet } from 'svelte';
    import { findChartLabels, getChart } from './context.svelte';

    let { loading, children }: { loading: boolean; children?: Snippet } = $props();
    const labels = findChartLabels();
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
                    class="h-full w-full rounded-t-[calc(var(--radius-sm)*0.5)] rounded-b-none"
                />
            </div>
        {/each}
    </div>
    <Card.Root variant="inset" class="mx-6 max-w-xs text-center text-sm">
        <Card.Content class="gap-1">
            {#if children}
                {@render children()}
            {:else if loading}
                {labels?.()?.loading ?? 'Loading chart…'}
            {:else}
                <div class="font-medium text-foreground">
                    {labels?.()?.empty ?? 'No data to display'}
                </div>
                <div class="mt-1 text-xs">
                    {labels?.()?.emptyDescription ??
                        'Try another period or add your first record.'}
                </div>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
