<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, class: className, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>
<div
    {...props}
    data-ui="heatmap-calendar"
    class={cn(className, 'grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-2 overflow-x-auto pb-1')}
>
    {@render children?.()}
</div>
