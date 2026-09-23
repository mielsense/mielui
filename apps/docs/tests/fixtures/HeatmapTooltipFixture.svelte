<script lang="ts">
    import * as Heatmap from '@mielui/svelte/components/heatmap';

    let { tooltip = true }: { tooltip?: boolean } = $props();
</script>

<Heatmap.Root
    days={[{ date: '2026-09-15', count: 12 }]}
    endDate="2026-09-15"
    weeks={2}
    animation="none"
>
    <Heatmap.Calendar>
        <Heatmap.Grid />
    </Heatmap.Calendar>
    {#if tooltip}
        <Heatmap.Tooltip />
    {/if}
</Heatmap.Root>
