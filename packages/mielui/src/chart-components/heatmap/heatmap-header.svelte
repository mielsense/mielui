<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HeatmapHeaderProps } from '.';

    let { children, class: className, ...props }: HeatmapHeaderProps = $props();
</script>

<div
    {...props}
    data-ui="heatmap-header"
    class={cn(className, 'flex items-center justify-between gap-3')}
>
    {@render children?.()}
</div>
