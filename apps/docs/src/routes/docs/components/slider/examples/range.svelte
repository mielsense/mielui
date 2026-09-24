<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Slider } from '@mielui/svelte/components/slider';

    let price = $state<[number, number]>([200, 750]);
</script>

<div class="flex w-full max-w-sm flex-col gap-2">
    <div class="flex items-center justify-between text-sm">
        <span class="text-foreground-muted">Price range</span>
        <span class="tabular-nums">
            $<span use:numberShuffle={{ value: price[0] }}>{price[0]}</span> to $<span
                use:numberShuffle={{ value: price[1] }}
            >
                {price[1]}
            </span>
        </span>
    </div>
    <Slider
        range
        bind:value={price}
        min={0}
        max={1000}
        step={10}
        thumbLabels={['Minimum price', 'Maximum price']}
    />
</div>
