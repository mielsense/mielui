<script lang="ts">
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { days } from './data';
    let selected = $state('Choose a day');
</script>
<Heatmap.Root
    {days}
    weeks={12}
    endDate="2026-09-15"
    weekStartsOn={1}
    class="max-w-sm"
    onDaySelect={(day) => { selected = `${day.date}: ${day.count} contributions`; }}
>
    {#snippet children({ total })}
        <Heatmap.Header>
            <span class="text-sm font-medium">Last 12 weeks</span>
            <span class="text-xs text-foreground-muted">{total} contributions</span>
        </Heatmap.Header>
        <Heatmap.Calendar>
            <Heatmap.MonthLabels />
            <Heatmap.Grid />
        </Heatmap.Calendar>
        <Heatmap.Footer>
            <Heatmap.Legend />
            <Heatmap.Detail />
        </Heatmap.Footer>
        <p aria-live="polite" class="text-xs text-foreground-muted">{selected}</p>
    {/snippet}
</Heatmap.Root>
