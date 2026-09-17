<script lang="ts">
    import * as NumberField from '@mielui/svelte/components/number-field';
</script>
<NumberField.Root value={4} disabled class="w-full max-w-56">
    <NumberField.Label>Included seats</NumberField.Label>
    <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
    </NumberField.Group>
</NumberField.Root>
