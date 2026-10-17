import {
    attributes,
    CONTROL_SIZES,
    changed,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'card'], 'default'),
    size: select('Size', CONTROL_SIZES, 'md', 'Appearance'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content'),
    checked: toggle('Checked', 'State', true),
    disabled: toggle('Disabled', 'State'),
    invalid: toggle('Invalid', 'State')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const props = attributes({
        variant: changed(values.variant, 'default'),
        size: changed(values.size, 'md'),
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
