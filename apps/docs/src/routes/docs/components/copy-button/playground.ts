import {
    type AttributeValues,
    attributes,
    BUTTON_VARIANTS,
    changed,
    number,
    type PlaygroundValues,
    select,
    tag,
    text,
    toggle
} from '$lib/components/docs/playground';

const DEFAULT_LABEL = 'Copy';
const DEFAULT_COPIED_LABEL = 'Copied';

export const command = 'pnpm add @mielui/svelte';

export const controls = {
    variant: select('Variant', BUTTON_VARIANTS, 'ghost'),
    size: select('Size', ['icon', 'sm', 'md', 'lg'], 'icon', 'Appearance'),
    label: text('Label', DEFAULT_LABEL, 'Content'),
    copiedLabel: text('Copied label', DEFAULT_COPIED_LABEL, 'Content'),
    disabled: toggle('Disabled', 'State'),
    duration: number('Duration', 2000, {
        min: 500,
        max: 10000,
        step: 500,
        group: 'Behavior'
    })
};

type Values = PlaygroundValues<typeof controls>;

function element(values: Values, props: AttributeValues): string {
    if (values.size === 'icon') {
        return tag('CopyButton', props, ' />', '    ');
    }

    const inline = `<CopyButton${attributes(props)}>Copy command</CopyButton>`;

    if (inline.length <= 96) {
        return inline;
    }

    return `${tag('CopyButton', props, '>', '    ')}
        Copy command
    </CopyButton>`;
}

export function code(values: Values): string {
    const props = {
        text: command,
        variant: changed(values.variant, 'ghost'),
        size: changed(values.size, 'icon'),
        label: changed(values.label, DEFAULT_LABEL),
        copiedLabel: changed(values.copiedLabel, DEFAULT_COPIED_LABEL),
        duration: changed(values.duration, 2000),
        disabled: values.disabled
    };

    return `<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
</script>

<div class="flex items-center gap-3">
    <code class="text-sm">${command}</code>
    ${element(values, props)}
</div>`;
}
