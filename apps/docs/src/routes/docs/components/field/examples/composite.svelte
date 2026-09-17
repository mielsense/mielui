<script lang="ts">
    import * as Field from '@mielui/svelte/components/field';
    import * as NumberField from '@mielui/svelte/components/number-field';
    import * as OTPField from '@mielui/svelte/components/otp-field';

    const uid = $props.id();
    let seats = $state<number | undefined>(2);
    let code = $state('');
    const disabled = false;
    const required = true;
</script>

<Field.Group class="w-full max-w-sm">
    <Field.Root {disabled} {required}>
        <Field.Label>Seats (required)</Field.Label>
        <NumberField.Root bind:value={seats} name="seats" min={1} max={12} {disabled} {required}>
            <NumberField.Group>
                <NumberField.Decrement />
                <Field.Control describedBy={`${uid}-seats-hint`}>
                    {#snippet children(control)}
                        <NumberField.Input {...control} />
                    {/snippet}
                </Field.Control>
                <NumberField.Increment />
            </NumberField.Group>
        </NumberField.Root>
        <Field.Description id={`${uid}-seats-hint`}>
            Choose between 1 and 12 seats.
        </Field.Description>
    </Field.Root>
    <Field.Root {required}>
        <Field.Label>Verification code (required)</Field.Label>
        <Field.Control describedBy={`${uid}-code-hint`}>
            {#snippet children(control)}
                <OTPField.Root {...control} bind:value={code} name="code" length={6} />
            {/snippet}
        </Field.Control>
        <Field.Description id={`${uid}-code-hint`}>
            Enter the six digits sent to your email.
        </Field.Description>
    </Field.Root>
</Field.Group>
