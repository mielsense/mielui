<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>
<div
    {...props}
    data-ui="heatmap-header"
    class={cn(className, 'flex items-center justify-between gap-3')}
>
    {@render children?.()}
</div>
