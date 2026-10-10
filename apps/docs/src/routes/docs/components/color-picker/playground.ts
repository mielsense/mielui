import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['outline', 'secondary', 'ghost'], 'outline'),
    format: select('Format', ['hsl', 'rgb', 'hsv'], 'hsl', 'Appearance'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    label: toggle('Label', 'Content', true),
    presets: toggle('Presets', 'Content'),
    plane: toggle('Plane', 'Content', true),
    preview: toggle('Preview', 'Content', true),
    hue: toggle('Hue', 'Content', true),
    hexInput: toggle('Hex input', 'Content', true),
    channels: toggle('Channels', 'Content', true),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true),
    dismissLayer: toggle('Dismiss layer', 'Behavior', true),
    focusTrap: toggle('Focus trap', 'Behavior', true),
    lockScroll: toggle('Lock scroll', 'Behavior', true)
};

export const CHANNELS_SEAM = 'border-b-[length:var(--border-size)] border-border';

export function isDefaultContent(values: PlaygroundValues<typeof controls>): boolean {
    return values.plane && values.preview && values.hue && values.hexInput && values.channels;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const rootProps = attributes({
        label: values.label && 'Accent color',
        options: values.presets && expression('options'),
        format: values.format !== 'hsl' && values.format
    });
    const triggerProps = attributes({
        variant: values.variant !== 'outline' && values.variant
    });
    const contentProps = attributes({
        surface: values.surface !== 'theme' && values.surface,
        allowClickOutside: values.allowClickOutside ? undefined : expression('false'),
        dismissLayer: values.dismissLayer ? undefined : expression('false'),
        focusTrap: values.focusTrap ? undefined : expression('false'),
        lockScroll: values.lockScroll ? undefined : expression('false')
    });
    const channelsProps = attributes({
        class: values.presets && CHANNELS_SEAM
    });
    const sliders = [
        values.hue && '                <ColorPicker.Hue />',
        values.hexInput && '                <ColorPicker.HexInput />'
    ].filter((line) => line !== false);
    const row = [
        values.preview && '            <ColorPicker.Preview />',
        sliders.length > 0 &&
            `            <div class="min-w-0 flex-1 space-y-2">
${sliders.join('\n')}
            </div>`
    ].filter((line) => line !== false);
    const parts = [
        values.plane && '        <ColorPicker.Plane class="mx-1.5 mt-1.5 w-auto" />',
        row.length > 0 &&
            `        <div class="flex items-center gap-2.5 px-2.5 pt-2.5 pb-1">
${row.join('\n')}
        </div>`,
        values.channels && `        <ColorPicker.Channels${channelsProps} />`,
        values.presets && '        <ColorPicker.Presets />'
    ].filter((line) => line !== false);
    const content = isDefaultContent(values)
        ? `    <ColorPicker.Content${contentProps} />`
        : `    <ColorPicker.Content${contentProps}>
${parts.join('\n')}
    </ColorPicker.Content>`;
    const options = values.presets
        ? `
    const options = [
        {
            label: 'Indigo',
            value: '#5e6ad2'
        },
        {
            label: 'Rose',
            value: '#e65c86'
        },
        {
            label: 'Green',
            value: '#36a375'
        },
        {
            label: 'Amber',
            value: '#d9902f'
        }
    ];`
        : '';

    return `<script lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    let value = $state('#5e6ad2');${options}
</script>

<ColorPicker.Root bind:value${rootProps}>
    <ColorPicker.Trigger${triggerProps} />
${content}
</ColorPicker.Root>`;
}
