<script lang="ts">
    import { onMount } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { overlaySurface } from '../../components/_internal/surface';
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
        manager.showTooltip(
            target,
            label,
            'top',
            0,
            cn(
                'mielui-modal-frame min-w-40 p-[var(--mielui-modal-inset)]! rounded-[var(--radius-xl)]! text-xs! text-foreground! bg-card [&>.mielui-tooltip-label]:block',
                overlaySurface(),
                className
            ),
            element
        );
        return () => {
            manager.hideTooltip(target, 0);
        };
    });
</script>

<div {...props} bind:this={element} data-ui="heatmap-tooltip" hidden>
    <div class="mielui-inset-surface bg-transparent! p-3">
        {#if children}
            {@render children()}
        {:else if day}
            <div class="mb-2 font-medium">
                {new Intl.DateTimeFormat(context.locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${day.date}T00:00:00Z`))}
            </div>
            <div class="flex items-center gap-2">
                <span class="size-2 rounded-full bg-primary"></span>
                <span class="flex-1 text-foreground-muted">Contributions</span>
                <span class="ml-4 font-medium tabular-nums">
                    {new Intl.NumberFormat(context.locale).format(day.count)}
                </span>
            </div>
        {/if}
    </div>
</div>
