<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
    const levels = [
        'bg-secondary',
        'bg-primary/25',
        'bg-primary/45',
        'bg-primary/70',
        'bg-primary'
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
                class={cn(level, 'size-2.5 rounded-[3px] ring-1 ring-inset ring-foreground/5')}
            ></span>
        {/each}
        <span class="ml-1">More</span>
    {/if}
</div>
