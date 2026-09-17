<script lang="ts">
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as Field from '@mielui/svelte/components/field';
</script>

<Field.Root orientation="horizontal" class="max-w-sm gap-3">
    <Field.Control>
        {#snippet children(control)}
            <Checkbox {...control} name="updates" class="mt-0.5" />
        {/snippet}
    </Field.Control>
    <Field.Content>
        <Field.Label>Product updates</Field.Label>
        <Field.Description>A short email when there’s something useful to share.</Field.Description>
    </Field.Content>
</Field.Root>
