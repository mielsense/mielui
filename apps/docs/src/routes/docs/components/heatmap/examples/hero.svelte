<script lang="ts">
    import * as Heatmap from '@mielui/svelte/components/heatmap';
    import { days } from './data';

    let { animation = 'rows' }: { animation?: 'rows' | 'columns' | 'live' | 'none' } = $props();
</script>
<div class="w-full max-w-xl">
    {#key animation}
        <Heatmap.Root {days} {animation} endDate="2026-09-15" />
    {/key}
</div>
