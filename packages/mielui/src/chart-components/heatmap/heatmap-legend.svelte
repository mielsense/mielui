<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapLegendProps } from '.';
    import { levelClasses } from './calendar';
    import { getHeatmapContext } from './context';

    let { children, class: className, ...rest }: HeatmapLegendProps = $props();
    const context = getHeatmapContext();
</script>

<div
    {...rest}
    data-ui="heatmap-legend"
    class={cn(className, 'flex items-center gap-1 text-xs text-foreground-muted')}
>
    {#if children}
        {@render children()}
    {:else}
        <span class="me-1">{context.labels?.less ?? 'Less'}</span>
        {#each levelClasses as level (level)}
            <span
                aria-hidden="true"
                class={cn(level, 'size-2.5 rounded-[calc(var(--radius-sm)*0.375)]')}
            ></span>
        {/each}
        <span class="ms-1">{context.labels?.more ?? 'More'}</span>
    {/if}
</div>
