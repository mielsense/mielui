<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';

    let value = $state(72);
    const values = [72, 98, 104, 36];
    function updateValue() {
        value = values[(values.indexOf(value) + 1) % values.length];
    }
</script>

<div class="flex flex-col items-center gap-6">
    <span
        use:numberShuffle={{ value }}
        class="inline-block min-w-[3ch] text-center text-4xl tabular-nums"
    >
        {value}
    </span>
    <Button variant="secondary" onclick={updateValue}>Update value</Button>
</div>
