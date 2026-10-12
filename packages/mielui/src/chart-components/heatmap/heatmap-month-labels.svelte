<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { weekColumns } from './calendar';
    import { useHeatmap } from './context.svelte';

    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
    const context = useHeatmap();
</script>
<div
    {...props}
    aria-hidden="true"
    data-ui="heatmap-month-labels"
    class={cn(className, 'col-start-2 row-start-1 grid gap-1 text-xs text-foreground-muted')}
    style:grid-template-columns={weekColumns(context.model.weeks)}
>
    {#if children}
        {@render children()}
    {:else}
        {#each context.model.months as month (month.column)}
            <span class="overflow-visible whitespace-nowrap" style:grid-column={month.column}>
                {month.label}
            </span>
        {/each}
    {/if}
</div>
