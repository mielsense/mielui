import { attributes, type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'outline'], 'default'),
    size: select('Size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
    content: select('Content', ['icon', 'text', 'icon-and-text'], 'icon', 'Content'),
    pressed: toggle('Pressed', 'State'),
    disabled: toggle('Disabled', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const hasIcon = values.content !== 'text';
    const hasText = values.content !== 'icon';
    const props = attributes({
        variant: values.variant !== 'default' && values.variant,
        size: values.size !== 'md' && values.size,
        disabled: values.disabled,
        'aria-label': !hasText && 'Bold'
    });
    const imports = [
        hasIcon && "    import { TextBoldIcon as Bold } from '@hugeicons/core-free-icons';",
        "    import { Toggle } from '@mielui/svelte/components/toggle';",
        hasIcon && "    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ].filter((line) => line !== false);
    const children = [
        hasIcon && '    <HugeiconsIcon icon={Bold} size={14} />',
        hasText && '    Bold'
    ].filter((line) => line !== false);

    return `<script lang="ts">
${imports.join('\n')}

    let bold = $state(${values.pressed});
</script>

<Toggle bind:pressed={bold}${props}>
${children.join('\n')}
</Toggle>`;
}
