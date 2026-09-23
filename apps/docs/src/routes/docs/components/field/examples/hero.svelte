<script lang="ts">
    import * as Field from '@mielui/svelte/components/field';
    import { Input } from '@mielui/svelte/components/input';
</script>

<Field.Root class="w-full max-w-sm" required>
    <Field.Label>Work email<span class="text-foreground-muted">(required)</span></Field.Label>
    <Field.Control>
        {#snippet children(control)}
            <Input
                {...control}
                type="email"
                name="email"
                placeholder="you@company.com"
                autocomplete="email"
            />
        {/snippet}
    </Field.Control>
    <Field.Description>We’ll only use this address for account updates.</Field.Description>
</Field.Root>
