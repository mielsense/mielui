import { attributes, type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'primary'], 'default'),
    size: select('Size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content'),
    checked: toggle('Checked', 'State', true),
    disabled: toggle('Disabled', 'State'),
    invalid: toggle('Invalid', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        variant: values.variant !== 'default' && values.variant,
        size: values.size !== 'md' && values.size,
        label: values.label && 'Product updates',
        'aria-label': !values.label && 'Product updates',
        description: values.description && 'Get an email when a new version ships.',
        disabled: values.disabled,
        'aria-invalid': values.invalid && 'true'
    });

    return `<script lang="ts">
    import { Checkbox } from '@mielui/svelte/components/checkbox';

    let subscribed = $state(${values.checked});
</script>

<Checkbox bind:checked={subscribed}${props} />`;
}
