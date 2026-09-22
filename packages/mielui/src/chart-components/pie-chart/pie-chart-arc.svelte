<script lang="ts">
    import { getPieContext } from './context';
    import type { PieChartArcProps } from './index';
    import Slice from './slice.svelte';

    let {
        innerRadius = 0.68,
        cornerRadius = 4,
        padAngle = 0.035,
        class: className
    }: PieChartArcProps = $props();
    const context = getPieContext();
    const slices = $derived.by(() => {
        let angle = 0;
        return context.data.map((item) => {
            const start = angle;
            angle += context.total > 0 ? (item.value / context.total) * Math.PI * 2 : 0;
            return { item, start, end: angle };
        });
    });
</script>

{#if !context.loading}
    {#each slices as slice (slice.item.key)}
        <Slice {...slice} {innerRadius} {cornerRadius} {padAngle} class={className} />
    {/each}
{/if}
