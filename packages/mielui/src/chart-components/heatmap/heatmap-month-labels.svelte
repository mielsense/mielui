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
    data-ui="heatmap-month-labels"
    class={cn(className, 'col-start-2 row-start-1 grid gap-1 text-[length:var(--font-size-meta)] text-foreground-muted')}
    style:grid-template-columns={`repeat(${context.model.weeks}, minmax(10px, 1fr))`}
>
    {#if children}
        {@render children()}
    {:else}
        {#each context.model.months as month}
            <span class="overflow-visible whitespace-nowrap" style:grid-column={month.column}>
                {month.label}
            </span>
        {/each}
    {/if}
</div>
