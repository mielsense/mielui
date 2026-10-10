import { attributes, type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    type: select('Type', ['single', 'multiple'], 'single'),
    size: select('Size', ['sm', 'md', 'lg'], 'sm', 'Appearance'),
    content: select('Content', ['icon', 'text'], 'icon', 'Content'),
    disabled: toggle('Disabled', 'State'),
    disabledItem: toggle('Disabled item', 'State')
};

const ITEMS = {
    single: [
        {
            value: 'left',
            text: 'Left',
            label: 'Align left',
            icon: 'AlignLeft',
            source: 'TextAlignLeftIcon'
        },
        {
            value: 'center',
            text: 'Center',
            label: 'Align center',
            icon: 'AlignCenter',
            source: 'TextAlignCenterIcon'
        },
        {
            value: 'right',
            text: 'Right',
            label: 'Align right',
            icon: 'AlignRight',
            source: 'TextAlignRightIcon'
        }
    ],
    multiple: [
        {
            value: 'bold',
            text: 'Bold',
            label: 'Bold',
            icon: 'Bold',
            source: 'TextBoldIcon'
        },
        {
            value: 'italic',
            text: 'Italic',
            label: 'Italic',
            icon: 'Italic',
            source: 'TextItalicIcon'
        },
        {
            value: 'underline',
            text: 'Underline',
            label: 'Underline',
            icon: 'Underline',
            source: 'TextUnderlineIcon'
        }
    ]
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const multiple = values.type === 'multiple';
    const withIcons = values.content === 'icon';
    const items = ITEMS[values.type];
    const props = attributes({
        size: values.size !== 'sm' && values.size,
        disabled: values.disabled,
        'aria-label': multiple ? 'Text formatting' : 'Text alignment'
    });
    const iconSources = items
        .map((item) => `${item.source} as ${item.icon}`)
        .sort((a, b) => a.localeCompare(b));
    const imports = [
        withIcons &&
            `    import {\n        ${iconSources.join(',\n        ')}\n    } from '@hugeicons/core-free-icons';`,
        "    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';",
        withIcons && "    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ].filter((line) => line !== false);
    const state = multiple
        ? "let formatting = $state(['bold']);"
        : "let alignment = $state<string | undefined>('center');";
    const itemLines = items.map((item, index) => {
        const itemProps = attributes({
            value: item.value,
            'aria-label': withIcons && item.label,
            disabled: values.disabledItem && index === items.length - 1
        });

        if (withIcons) {
            return `    <ToggleGroup.Item${itemProps}>
        <HugeiconsIcon icon={${item.icon}} size={14} />
    </ToggleGroup.Item>`;
        }

        return `    <ToggleGroup.Item${itemProps}>${item.text}</ToggleGroup.Item>`;
    });

    return `<script lang="ts">
${imports.join('\n')}

    ${state}
</script>

<ToggleGroup.Root type="${values.type}" bind:value={${multiple ? 'formatting' : 'alignment'}}${props}>
${itemLines.join('\n')}
</ToggleGroup.Root>`;
}
