<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapDetailProps } from '.';
    import { getHeatmapContext } from './context';

    let { children, class: className, ...rest }: HeatmapDetailProps = $props();
    const context = getHeatmapContext();
</script>

<p
    {...rest}
    data-ui="heatmap-detail"
    role={context.ready ? undefined : 'status'}
    class={cn(className, 'min-h-4 text-xs text-foreground-muted tabular-nums')}
>
    {#if children}
        {@render children(context.active)}
    {:else}
        {context.loading
            ? (context.labels?.detailLoading ?? 'Loading activity…')
            : context.empty
              ? (context.labels?.detailEmpty ?? 'No activity for this period.')
              : context.active?.label}
    {/if}
</p>
