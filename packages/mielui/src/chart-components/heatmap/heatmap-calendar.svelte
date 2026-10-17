<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapCalendarProps } from '.';

    let { children, class: className, ...rest }: HeatmapCalendarProps = $props();
</script>

<div
    {...rest}
    data-ui="heatmap-calendar"
    class={cn(
        className,
        'grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-2 overflow-x-auto pb-1'
    )}
>
    {@render children?.()}
</div>
