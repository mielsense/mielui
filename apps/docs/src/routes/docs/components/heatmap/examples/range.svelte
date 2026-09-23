<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { days } from './data';

    let weeks = $state(12);

    function switchRange() {
        weeks = weeks === 12 ? 26 : 12;
    }
</script>

<div class="w-full space-y-4">
    <Button variant="secondary" onclick={switchRange}>
        {weeks === 12 ? 'Show six months' : 'Show twelve weeks'}
    </Button>
    <Heatmap.Root {days} {weeks} endDate="2026-09-15" weekStartsOn={1} />
</div>
