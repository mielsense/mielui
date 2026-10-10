import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select(
        'Variant',
        ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'primary'
    ),
    size: select('Size', ['sm', 'md', 'lg', 'icon'], 'md', 'Appearance'),
    unstyled: toggle('Unstyled', 'Appearance'),
    label: text('Label', 'New project', 'Content'),
    leadingIcon: toggle('Leading icon', 'Content'),
    trailingIcon: toggle('Trailing icon', 'Content'),
    loadingLabel: text('Loading label', 'Loading…', 'Content'),
    successLabel: text('Success label', 'Done', 'Content'),
    errorLabel: text('Error label', 'Try again', 'Content'),
    status: select('Status', ['idle', 'loading', 'success', 'error'], 'idle', 'State'),
    loading: toggle('Loading', 'State'),
    disabled: toggle('Disabled', 'State'),
    link: toggle('Link', 'Behavior')
};

/** A status label to pass on, or nothing when it is empty or the built-in text. */
export function customLabel(value: string, fallback: string): string | undefined {
    if (value === '' || value === fallback) {
        return undefined;
    }

    return value;
}

function attribute(value: string | undefined) {
    if (value !== undefined && /["{&]/.test(value)) {
        return expression(JSON.stringify(value));
    }

    return value;
}

function content(value: string): string {
    if (/[{}<&]/.test(value) || value !== value.trim()) {
        return `{${JSON.stringify(value)}}`;
    }

    return value;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const iconOnly = values.size === 'icon';
    const leading = iconOnly || values.leadingIcon;
    const trailing = !iconOnly && values.trailingIcon;
    const props = attributes({
        variant: values.variant,
        size: values.size !== 'md' && values.size,
        unstyled: values.unstyled,
        status: values.status !== 'idle' && values.status,
        loading: values.loading,
        loadingLabel: attribute(customLabel(values.loadingLabel, 'Loading…')),
        successLabel: attribute(customLabel(values.successLabel, 'Done')),
        errorLabel: attribute(customLabel(values.errorLabel, 'Try again')),
        disabled: values.disabled,
        'aria-label': iconOnly && attribute(values.label),
        href: values.link && '/docs/installation'
    });
    const icons = [
        leading && 'Add01Icon as Plus',
        trailing && 'ArrowRight02Icon as ArrowRight'
    ].filter((name) => name !== false);
    const iconImports = icons.length
        ? `
    import { ${icons.join(', ')} } from '@hugeicons/core-free-icons';`
        : '';
    const iconComponent = icons.length
        ? `
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : '';
    const lines = [
        leading && '<HugeiconsIcon icon={Plus} size={14} />',
        !iconOnly && content(values.label),
        trailing && '<HugeiconsIcon icon={ArrowRight} size={14} />'
    ].filter((line) => line !== false && line !== '');
    const body = icons.length
        ? `
${lines.map((line) => `    ${line}`).join('\n')}
`
        : lines.join('');

    return `<script lang="ts">${iconImports}
    import { Button } from '@mielui/svelte/components/button';${iconComponent}
</script>

<Button${props}>${body}</Button>`;
}
