<script lang="ts">
    import * as NumberField from '@mielui/svelte/components/number-field';

    let quantity = $state<number | undefined>(2);
</script>
<div class="w-full max-w-56">
    <NumberField.Root bind:value={quantity} min={1} max={12} name="quantity">
        <NumberField.Label>Seats</NumberField.Label>
        <NumberField.Group class="w-36 max-w-full">
            <NumberField.Decrement />
            <NumberField.Input aria-describedby="seats-hint" />
            <NumberField.Increment />
        </NumberField.Group>
    </NumberField.Root>
    <p id="seats-hint" class="mt-2 text-foreground-muted [font-size:var(--font-size-caption)]">
        Choose between 1 and 12 seats.
    </p>
</div>
