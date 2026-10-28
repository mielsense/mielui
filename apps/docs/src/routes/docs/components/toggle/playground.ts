import {
    attributes,
    CONTROL_SIZES,
    changed,
    compact,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Variant', ['default', 'outline'], 'default'),
    size: select('Size', CONTROL_SIZES, 'md', 'Appearance'),
    content: select('Content', ['icon', 'text', 'icon-and-text'], 'icon', 'Content'),
    pressed: toggle('Pressed', 'State'),
    disabled: toggle('Disabled', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const hasIcon = values.content !== 'text';
    const hasText = values.content !== 'icon';
    const props = attributes({
        variant: changed(values.variant, 'default'),
        size: changed(values.size, 'md'),
        disabled: values.disabled,
        'aria-label': !hasText && 'Bold'
    });
    const imports = compact([
        hasIcon && "import { TextBoldIcon as Bold } from '@hugeicons/core-free-icons';",
        "import { Toggle } from '@mielui/svelte/components/toggle';",
        hasIcon && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
    const children = compact([
        hasIcon && '    <HugeiconsIcon icon={Bold} size={14} />',
        hasText && '    Bold'
    ]);

    return `<script lang="ts">
    ${imports}

    let bold = $state(${values.pressed});
</script>

<Toggle bind:pressed={bold}${props}>
${children.join('\n')}
</Toggle>`;
}
