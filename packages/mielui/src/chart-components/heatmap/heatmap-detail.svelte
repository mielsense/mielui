<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    import type { Cell } from './calendar';
    import { useHeatmap } from './context.svelte';

    let {
        children,
        class: className,
        ...props
    }: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
        children?: Snippet<[Cell | undefined]>;
    } = $props();
    const context = useHeatmap();
</script>
<p
    {...props}
    data-ui="heatmap-detail"
    role={context.ready ? undefined : 'status'}
    class={cn(className, 'min-h-4 text-xs text-foreground-muted tabular-nums')}
>
    {#if children}
        {@render children(context.active)}
    {:else}
        {context.loading ? 'Loading activity…' : context.empty ? 'No activity for this period.' : context.active?.label}
    {/if}
</p>
