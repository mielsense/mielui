<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapFooterProps } from '.';

    let { children, class: className, ...props }: HeatmapFooterProps = $props();
</script>

<div
    {...props}
    data-ui="heatmap-footer"
    class={cn(
        className,
        'flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-foreground-muted'
    )}
>
    {@render children?.()}
</div>
