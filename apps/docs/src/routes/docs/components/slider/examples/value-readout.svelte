<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Slider } from '@mielui/svelte/components/slider';

    let volume = $state(64);
</script>

<div class="flex w-full max-w-sm flex-col gap-2">
    <div class="flex items-center justify-between text-[0.78rem]">
        <span class="text-foreground-muted">Volume</span>
        <span class="font-mono text-foreground">
            <span use:numberShuffle={{ value: volume }}>{volume}</span>
        </span>
    </div>
    <Slider bind:value={volume} label="Volume" />
</div>
