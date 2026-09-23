<script lang="ts">
    import * as NumberField from '@mielui/svelte/components/number-field';

    let amount = $state<number | undefined>(1.5);
</script>
<NumberField.Root bind:value={amount} min={0} max={10} step={0.25} class="w-full max-w-56">
    <NumberField.Label>Hours</NumberField.Label>
    <NumberField.Group>
        <NumberField.Input class="text-left" />
        <NumberField.Decrement aria-label="Subtract fifteen minutes" />
        <NumberField.Increment aria-label="Add fifteen minutes" />
    </NumberField.Group>
</NumberField.Root>
