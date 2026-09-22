<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    import { useHeatmap } from './context.svelte';

    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
    const context = useHeatmap();
</script>
<div
    {...props}
    aria-hidden="true"
    data-ui="heatmap-weekday-labels"
    class={cn(className, 'col-start-1 row-start-2 grid grid-rows-7 gap-1 text-[length:var(--font-size-meta)] text-foreground-muted')}
>
    {#if children}
        {@render children()}
    {:else}
        {#each context.model.weekdays as label, row}
            <span class="flex items-center leading-none" style:grid-row={row + 1}>
                {row % 2 === 1 ? label : ''}
            </span>
        {/each}
    {/if}
</div>
