import {
    attributes,
    number,
    type PlaygroundValues,
    select,
    tag,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select(
        'Variant',
        ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'ghost'
    ),
    size: select('Size', ['icon', 'sm', 'md', 'lg'], 'icon', 'Appearance'),
    label: text('Label', 'Copy', 'Content'),
    copiedLabel: text('Copied label', 'Copied', 'Content'),
    disabled: toggle('Disabled', 'State'),
    duration: number('Duration', 2000, {
        min: 500,
        max: 10000,
        step: 500,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = {
        text: 'pnpm add @mielui/svelte',
        variant: values.variant !== 'ghost' && values.variant,
        size: values.size !== 'icon' && values.size,
        label: values.label !== 'Copy' && values.label,
        copiedLabel: values.copiedLabel !== 'Copied' && values.copiedLabel,
        duration: values.duration !== 2000 && values.duration,
        disabled: values.disabled
    };
    const inline = `<CopyButton${attributes(props)}>Copy command</CopyButton>`;
    const element =
        values.size === 'icon'
            ? tag('CopyButton', props, ' />', '    ')
            : inline.length <= 96
              ? inline
              : `${tag('CopyButton', props, '>', '    ')}
        Copy command
    </CopyButton>`;

    return `<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
</script>

<div class="flex items-center gap-3">
    <code class="text-sm">pnpm add @mielui/svelte</code>
    ${element}
</div>`;
}
