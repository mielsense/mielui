import {
    attributes,
    BUTTON_VARIANTS,
    changed,
    compact,
    content,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Variant', BUTTON_VARIANTS, 'primary'),
    size: select('Size', ['sm', 'md', 'lg', 'icon'], 'md', 'Appearance'),
    label: text('Label', 'New project', 'Content'),
    leadingIcon: toggle('Leading icon', 'Content'),
    trailingIcon: toggle('Trailing icon', 'Content'),
    status: select('Status', ['idle', 'loading', 'success', 'error'], 'idle', 'State'),
    disabled: toggle('Disabled', 'State'),
    link: toggle('Link', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const iconOnly = values.size === 'icon';
    const leading = iconOnly || values.leadingIcon;
    const trailing = !iconOnly && values.trailingIcon;
    const props = attributes({
        variant: changed(values.variant, 'primary'),
        size: changed(values.size, 'md'),
        status: changed(values.status, 'idle'),
        disabled: values.disabled,
        'aria-label': iconOnly && values.label,
        href: values.link && '/docs/installation'
    });
    const icons = compact([
        leading && 'Add01Icon as Plus',
        trailing && 'ArrowRight02Icon as ArrowRight'
    ]);
    const imports = compact([
        icons.length > 0 && `import { ${icons.join(', ')} } from '@hugeicons/core-free-icons';`,
        "import { Button } from '@mielui/svelte/components/button';",
        icons.length > 0 && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
    const lines = compact([
        leading && '<HugeiconsIcon icon={Plus} size={14} />',
        !iconOnly && values.label !== '' && content(values.label),
        trailing && '<HugeiconsIcon icon={ArrowRight} size={14} />'
    ]);
    const body = icons.length
        ? `
${lines.map((line) => `    ${line}`).join('\n')}
`
        : lines.join('');

    return `<script lang="ts">
    ${imports}
</script>

<Button${props}>${body}</Button>`;
}
