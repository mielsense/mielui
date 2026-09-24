<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Slider } from '@mielui/svelte/components/slider';

    let selection = $state<[number, number]>([25, 70]);
</script>

<div class="flex w-full max-w-sm flex-col gap-2">
    <div class="flex items-center justify-between text-sm">
        <span class="text-foreground-muted">Right-to-left range</span>
        <span class="tabular-nums">
            <span use:numberShuffle={{ value: selection[0] }}>{selection[0]}</span> to<span
                use:numberShuffle={{ value: selection[1] }}
            >
                {selection[1]}
            </span>
        </span>
    </div>
    <Slider range dir="rtl" bind:value={selection} thumbLabels={['Range start', 'Range end']} />
</div>
