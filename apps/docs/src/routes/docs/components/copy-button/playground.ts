import {
    type AttributeValues,
    attributes,
    BUTTON_VARIANTS,
    changed,
    type PlaygroundValues,
    select,
    tag,
    toggle
} from '#lib/components/docs/playground.js';

export const command = 'pnpm add @mielui/svelte';

export const controls = {
    variant: select('Variant', BUTTON_VARIANTS, 'ghost'),
    size: select('Size', ['icon', 'sm', 'md', 'lg'], 'icon', 'Appearance'),
    disabled: toggle('Disabled', 'State')
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
