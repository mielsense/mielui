import {
    attributes,
    expression,
    type PlaygroundValues,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    legend: toggle('Legend', 'Content', true),
    description: toggle('Description', 'Content', true),
    disabled: toggle('Disabled', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        disabled: values.disabled,
        'aria-label': !values.legend && 'Contact details',
        'aria-describedby': values.description && expression('detailsId'),
        class: 'w-full max-w-sm'
    });
    const legend = values.legend
        ? `
    <Fieldset.Legend>Contact details</Fieldset.Legend>`
        : '';
    const description = values.description
        ? `
    <Fieldset.Description id={detailsId}>
        How we can reach you about your workspace.
    </Fieldset.Description>`
        : '';
    const script = values.description
        ? `

    const detailsId = $props.id();`
        : '';

    return `<script lang="ts">
    import * as Field from '@mielui/svelte/components/field';
    import * as Fieldset from '@mielui/svelte/components/fieldset';
    import { Input } from '@mielui/svelte/components/input';${script}
</script>

<Fieldset.Root${props}>${legend}${description}
    <Field.Group>
        <Field.Root>
            <Field.Label>Full name</Field.Label>
            <Field.Control>
                {#snippet children(control)}
                    <Input {...control} name="name" autocomplete="name" placeholder="Sam Rivera" />
                {/snippet}
            </Field.Control>
        </Field.Root>
        <Field.Root>
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
</Fieldset.Root>`;
}
