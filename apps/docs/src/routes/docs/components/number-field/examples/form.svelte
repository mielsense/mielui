<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as NumberField from '@mielui/svelte/components/number-field';

    let value = $state<number | undefined>(3);
    let submitted = $state('');
</script>
<form
    class="flex w-full max-w-64 flex-col gap-4"
    onsubmit={(event) => {
    event.preventDefault();
    submitted = String(new FormData(event.currentTarget).get('quantity'));
}}
>
    <NumberField.Root name="quantity" bind:value min={1} max={20} required>
        <NumberField.Label>Quantity</NumberField.Label>
        <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
        </NumberField.Group>
    </NumberField.Root>
    <div class="flex gap-2">
        <Button type="submit">Save quantity</Button>
        <Button type="reset" variant="outline">Reset</Button>
    </div>
    <p role="status" class="text-foreground-muted [font-size:var(--font-size-caption)]">
        {submitted ? `Saved quantity: ${submitted}` : 'Clear the input to see native required validation.'}
    </p>
</form>
