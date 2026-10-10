import { attributes, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    descriptions: toggle('Descriptions', 'Content', true),
    disabled: toggle('Disabled', 'State'),
    disabledItem: toggle('Disabled option', 'State'),
    invalid: toggle('Invalid', 'State')
};

const options = [
    {
        value: 'free',
        label: 'Free',
        description: 'For solo hobby projects.'
    },
    {
        value: 'pro',
        label: 'Pro',
        description: 'For small teams and side projects.'
    },
    {
        value: 'team',
        label: 'Team',
        description: 'Audit log, SSO, and priority support.'
    }
];

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        disabled: values.disabled
    });
    const items = options
        .map((option) => {
            const item = attributes({
                value: option.value,
                label: option.label,
                description: values.descriptions && option.description,
                disabled: values.disabledItem && option.value === 'team',
                'aria-invalid': values.invalid && 'true'
            });

            return `    <RadioGroup.Item${item} />`;
        })
        .join('\n');

    return `<script lang="ts">
    import * as RadioGroup from '@mielui/svelte/components/radio-group';

    let plan = $state('pro');
</script>

<RadioGroup.Root bind:value={plan} name="plan" aria-label="Plan"${props}>
${items}
</RadioGroup.Root>`;
}
