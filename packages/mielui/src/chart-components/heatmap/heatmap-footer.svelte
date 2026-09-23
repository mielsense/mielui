<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>
<div
    {...props}
    data-ui="heatmap-footer"
    class={cn(className, 'flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-foreground-muted')}
>
    {@render children?.()}
</div>
