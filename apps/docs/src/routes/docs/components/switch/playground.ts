import { attributes, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content'),
    checked: toggle('Checked', 'State', true),
    disabled: toggle('Disabled', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        label: values.label && 'Push notifications',
        'aria-label': !values.label && 'Push notifications',
        description: values.description && 'Sent when someone mentions you.',
        disabled: values.disabled
    });

    return `<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';

    let enabled = $state(${values.checked});
</script>

<Switch bind:checked={enabled}${props} />`;
}
