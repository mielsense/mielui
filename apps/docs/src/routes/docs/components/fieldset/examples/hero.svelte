<script lang="ts">
    import * as Field from '@mielui/svelte/components/field';
    import * as Fieldset from '@mielui/svelte/components/fieldset';
    import { Input } from '@mielui/svelte/components/input';

    const uid = $props.id();
</script>

<Fieldset.Root aria-describedby={`${uid}-details`} class="w-full max-w-sm">
    <Fieldset.Legend>Contact details</Fieldset.Legend>
    <Fieldset.Description id={`${uid}-details`}>
        How we can reach you about your workspace.
    </Fieldset.Description>
    <Field.Group>
        <Field.Root required>
            <Field.Label>Full name</Field.Label>
            <Field.Control>
                {#snippet children(control)}
                    <Input {...control} name="name" autocomplete="name" placeholder="Sam Rivera" />
                {/snippet}
            </Field.Control>
        </Field.Root>
        <Field.Root required>
            <Field.Label>Email address</Field.Label>
            <Field.Control>
                {#snippet children(control)}
                    <Input
                        {...control}
                        type="email"
                        name="email"
                        autocomplete="email"
                        placeholder="sam@company.com"
                    />
                {/snippet}
            </Field.Control>
        </Field.Root>
    </Field.Group>
</Fieldset.Root>
