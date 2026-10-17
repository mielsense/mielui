import {
    attributes,
    BUTTON_VARIANTS,
    CONTROL_SIZES,
    changed,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', BUTTON_VARIANTS, 'outline'),
    size: select('Size', CONTROL_SIZES, 'md', 'Appearance'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    placeholder: text('Placeholder', 'Select priority', 'Content'),
    groupLabel: toggle('Group label', 'Content'),
    disabled: toggle('Disabled', 'State'),
    disabledItem: toggle('Disabled option', 'State'),
    multiple: toggle('Multiple', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        type: values.multiple && 'multiple',
        disabled: values.disabled
    });
    const trigger = attributes({
        'aria-label': 'Priority',
        variant: changed(values.variant, 'outline'),
        size: changed(values.size, 'md'),
        class: 'min-w-56'
    });
    const value = attributes({
        placeholder: changed(values.placeholder, 'Select')
    });
    const content = attributes({
        surface: changed(values.surface, 'theme')
    });
    const low = attributes({
        value: 'low',
        disabled: values.disabledItem
    });
    const label = values.groupLabel
        ? `
        <Select.Label>Priority</Select.Label>`
        : '';
    const state = values.multiple
        ? 'let priorities = $state<string[]>([]);'
        : "let priority = $state('');";
    const binding = values.multiple ? 'priorities' : 'priority';

    return `<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';

    ${state}
</script>

<Select.Root bind:value={${binding}}${root}>
    <Select.Trigger${trigger}>
        <Select.Value${value} />
    </Select.Trigger>
    <Select.Content${content}>${label}
        <Select.Item value="urgent">Urgent</Select.Item>
        <Select.Item value="high">High</Select.Item>
        <Select.Item value="medium">Medium</Select.Item>
        <Select.Item${low}>Low</Select.Item>
    </Select.Content>
</Select.Root>`;
}
