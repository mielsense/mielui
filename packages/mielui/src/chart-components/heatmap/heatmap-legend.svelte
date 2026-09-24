<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';

    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
    const levels = [
        'bg-secondary',
        'bg-[color-mix(in_oklab,var(--chart-1)_25%,transparent)]',
        'bg-[color-mix(in_oklab,var(--chart-1)_45%,transparent)]',
        'bg-[color-mix(in_oklab,var(--chart-1)_70%,transparent)]',
        'bg-[var(--chart-1)]'
    ];
</script>
<div
    {...props}
    data-ui="heatmap-legend"
    class={cn(className, 'flex items-center gap-1 text-xs text-foreground-muted')}
>
    {#if children}
        {@render children()}
    {:else}
        <span class="mr-1">Less</span>
        {#each levels as level}
            <span
                aria-hidden="true"
                class={cn(level, 'size-2.5 rounded-[calc(var(--radius-xs)*1.5)] ring-1 ring-inset ring-foreground/5')}
            ></span>
        {/each}
        <span class="ml-1">More</span>
    {/if}
</div>
