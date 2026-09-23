<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';

    let value = $state(1240.5);
    const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    function format(amount: number) {
        return currency.format(amount);
    }
</script>

<div class="flex flex-col items-center gap-6">
    <span
        use:numberShuffle={{ value, format }}
        class="inline-block min-w-[10ch] text-center text-3xl tabular-nums"
    >
        {format(value)}
    </span>
    <div class="flex gap-2">
        <Button variant="secondary" onclick={() => { value += 125.25; }}>Add $125.25</Button>
        <Button variant="outline" onclick={() => { value = 0; }}>Reset</Button>
    </div>
</div>
