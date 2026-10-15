import {
    attributes,
    changed,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['outline', 'secondary'], 'outline'),
    label: toggle('Label', 'Content', true),
    description: toggle('Description', 'Content', true),
    placeholder: text('Placeholder', 'Add a topic…', 'Content'),
    error: toggle('Error', 'State'),
    disabled: toggle('Disabled', 'State'),
    max: toggle('Limit to 3 tags', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        variant: changed(values.variant, 'outline'),
        label: values.label && 'Topics',
        description: values.description && 'Type a topic and press Enter.',
        error: values.error && 'Topics must be lowercase.',
        max: values.max && 3,
        disabled: values.disabled
    });
    const input = attributes({
        'aria-label': !values.label && 'Topics',
        placeholder: changed(values.placeholder, 'Add a tag…')
    });

    return `<script lang="ts">
    import * as TagInput from '@mielui/svelte/components/tag-input';

    let tags = $state(['svelte', 'design-system']);
</script>

<TagInput.Root bind:tags${root}>
    <TagInput.List />
    <TagInput.Input${input} />
</TagInput.Root>`;
}
