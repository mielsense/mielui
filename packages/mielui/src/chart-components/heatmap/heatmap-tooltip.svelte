<script lang="ts">
    import { onMount } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getTooltipManager } from '../../components/tooltip/manager-context';
    import { cn } from '../../utils';
    import { useHeatmap } from './context.svelte';

    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
    const context = useHeatmap();
    const manager = getTooltipManager();
    let element = $state<HTMLDivElement>();
    const anchor = $derived(context.hoveredElement ?? context.focusedElement);
    const day = $derived(context.model.cells.find((cell) => cell.date === anchor?.dataset.date));

    onMount(() => {
        context.tooltipCount += 1;
        return () => {
            context.tooltipCount -= 1;
        };
    });

    $effect(() => {
        const target = anchor;
        const label = day?.label;
        if (!target || !label || !element) {
            return;
        }
        manager.showTooltip(target, label, 'top', 0, cn(className), children ? element : undefined);
        return () => {
            manager.hideTooltip(target, 0);
        };
    });
</script>

<div {...props} bind:this={element} data-ui="heatmap-tooltip" hidden>
    {#if children}
        {@render children()}
    {:else}
        {day?.label}
    {/if}
</div>
