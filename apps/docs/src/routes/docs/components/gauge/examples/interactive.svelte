<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import { Gauge } from '@mielui/svelte/components/gauge';
    import { fromAction } from 'svelte/attachments';

    let used = $state(48);

    function addFiles() {
        used = Math.min(64, used + 8);
    }

    function clearFiles() {
        used = 16;
    }
</script>

<div class="flex flex-col items-center gap-5">
    <Gauge
        value={used}
        max={64}
        label="Storage used in gigabytes"
        tone={used >= 56 ? 'warning' : 'primary'}
    >
        <span class="flex flex-col items-center gap-1">
            <span {@attach fromAction(numberShuffle, () => ({ value: used }))}>{used}</span>
            <span class="text-xs font-normal text-foreground-muted">of 64 GB</span>
        </span>
    </Gauge>
    <div class="flex flex-wrap gap-2">
        <Button onclick={addFiles} disabled={used === 64}>Add 8 GB</Button>
        <Button variant="secondary" onclick={clearFiles}>Clear old files</Button>
    </div>
</div>
