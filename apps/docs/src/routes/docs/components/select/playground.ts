import {
    attributes,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select(
        'Variant',
        ['outline', 'primary', 'secondary', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'outline'
    ),
    size: select('Size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
    surface: select('Surface', ['inherit', 'solid', 'glass'], 'inherit', 'Appearance'),
    placeholder: text('Placeholder', 'Select priority', 'Content'),
    groupLabel: toggle('Group label', 'Content'),
    disabled: toggle('Disabled', 'State'),
    disabledItem: toggle('Disabled option', 'State'),
    multiple: toggle('Multiple', 'Behavior'),
    dynamic: toggle('Dynamic width', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        type: values.multiple && 'multiple',
        disabled: values.disabled
    });
    const trigger = attributes({
        'aria-label': 'Priority',
        variant: values.variant !== 'outline' && values.variant,
        size: values.size !== 'md' && values.size,
        class: 'min-w-56'
    });
    const value = attributes({
        placeholder: values.placeholder !== 'Select' && values.placeholder
    });
    const content = attributes({
        surface: values.surface !== 'inherit' && values.surface,
        dynamic: values.dynamic
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
