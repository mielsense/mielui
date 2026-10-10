import {
    attributes,
    expression,
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
    removable: toggle('Removable tags', 'Content', true),
    disabled: toggle('Disabled', 'State'),
    error: toggle('Error', 'State'),
    max: toggle('Limit to 3 tags', 'Behavior'),
    allowDuplicates: toggle('Allow duplicates', 'Behavior'),
    space: toggle('Space adds a tag', 'Behavior'),
    addOnBlur: toggle('Add on blur', 'Behavior', true),
    addOnPaste: toggle('Add on paste', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        variant: values.variant !== 'outline' && values.variant,
        label: values.label && 'Topics',
        description: values.description && 'Type a topic and press Enter.',
        error: values.error && 'Topics must be lowercase.',
        max: values.max && 3,
        allowDuplicates: values.allowDuplicates,
        delimiters: values.space && expression("[',', ' ']"),
        addOnBlur: !values.addOnBlur && expression('false'),
        addOnPaste: !values.addOnPaste && expression('false'),
        disabled: values.disabled
    });
    const input = attributes({
        'aria-label': !values.label && 'Topics',
        placeholder: values.placeholder !== 'Add a tag…' && values.placeholder
    });
    const list = values.removable
        ? '    <TagInput.List />'
        : `    <TagInput.List>
        {#each tags as tag, index (index)}
            <li class="contents">
                <TagInput.Tag value={tag} {index} removable={false} />
            </li>
        {/each}
    </TagInput.List>`;

    return `<script lang="ts">
    import * as TagInput from '@mielui/svelte/components/tag-input';

    let tags = $state(['svelte', 'design-system']);
</script>

<TagInput.Root bind:tags${root}>
${list}
    <TagInput.Input${input} />
</TagInput.Root>`;
}
