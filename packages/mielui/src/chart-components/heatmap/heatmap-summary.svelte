<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '../../utils';
    import { useHeatmap } from './context.svelte';

    let {
        children,
        class: className,
        ...props
    }: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
        children?: Snippet<[number]>;
    } = $props();
    const context = useHeatmap();
</script>
<p {...props} data-ui="heatmap-summary" class={cn(className, 'text-sm font-medium tabular-nums')}>
    {#if children}
        {@render children(context.model.total)}
    {:else if !context.ready}
        Activity
    {:else}
        <span
            use:numberShuffle={{ value: context.model.total, format: (value) => new Intl.NumberFormat(context.locale).format(value) }}
        >
            {new Intl.NumberFormat(context.locale).format(context.model.total)}
        </span>
        contributions
    {/if}
</p>
