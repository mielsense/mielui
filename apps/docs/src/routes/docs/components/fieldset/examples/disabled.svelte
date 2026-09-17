<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Field from '@mielui/svelte/components/field';
    import * as Fieldset from '@mielui/svelte/components/fieldset';
    import { Input } from '@mielui/svelte/components/input';

    let locked = $state(true);
</script>

<div class="flex w-full max-w-sm flex-col gap-6">
    <Fieldset.Root disabled={locked} class="disabled:opacity-[var(--opacity-disabled)]">
        <Fieldset.Legend>Billing contact</Fieldset.Legend>
        <Field.Root>
            <Field.Label>Invoice email</Field.Label>
            <Field.Control>
                {#snippet children(control)}
                    <Input
                        {...control}
                        type="email"
                        name="invoiceEmail"
                        value="billing@company.com"
                    />
                {/snippet}
            </Field.Control>
        </Field.Root>
    </Fieldset.Root>
    <Button class="w-fit" variant="outline" onclick={() => { locked = !locked; }}>
        {locked ? 'Edit billing contact' : 'Lock billing contact'}
    </Button>
</div>
