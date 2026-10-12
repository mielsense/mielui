import {
    attributes,
    changed,
    compact,
    defaultOn,
    expression,
    type PlaygroundValues,
    quote,
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
    focusTrap: toggle('Trap focus', 'Behavior', true),
    lockScroll: toggle('Lock scroll', 'Behavior', true)
};

type Values = PlaygroundValues<typeof controls>;

export const CHANNELS_SEAM = 'border-b-[length:var(--border-size)] border-border';

export const options = [
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
];

export function isDefaultContent(values: Values): boolean {
    return values.plane && values.preview && values.hue && values.hexInput && values.channels;
}

function presets(): string {
    return options
        .map((option) => {
            return `        {
            label: ${quote(option.label)},
            value: ${quote(option.value)}
        }`;
        })
        .join(',\n');
}

export function code(values: Values): string {
    const rootProps = attributes({
        label: values.label && 'Accent color',
        options: values.presets && expression('options'),
        format: changed(values.format, 'hsl')
    });
    const triggerProps = attributes({
        variant: changed(values.variant, 'outline')
    });
    const contentProps = attributes({
        surface: changed(values.surface, 'theme'),
        allowClickOutside: defaultOn(values.allowClickOutside),
        dismissLayer: defaultOn(values.dismissLayer),
        focusTrap: defaultOn(values.focusTrap),
        lockScroll: defaultOn(values.lockScroll)
    });
    const channelsProps = attributes({
        class: values.presets && CHANNELS_SEAM
    });
    const sliders = compact([
        values.hue && '                <ColorPicker.Hue />',
        values.hexInput && '                <ColorPicker.HexInput />'
    ]);
    const row = compact([
        values.preview && '            <ColorPicker.Preview />',
        sliders.length > 0 &&
            `            <div class="min-w-0 flex-1 space-y-2">
${sliders.join('\n')}
            </div>`
    ]);
    const parts = compact([
        values.plane && '        <ColorPicker.Plane class="mx-1.5 mt-1.5 w-auto" />',
        row.length > 0 &&
            `        <div class="flex items-center gap-2.5 px-2.5 pt-2.5 pb-1">
${row.join('\n')}
        </div>`,
        values.channels && `        <ColorPicker.Channels${channelsProps} />`,
        values.presets && '        <ColorPicker.Presets />'
    ]);
    const content = isDefaultContent(values)
        ? `    <ColorPicker.Content${contentProps} />`
        : `    <ColorPicker.Content${contentProps}>
${parts.join('\n')}
    </ColorPicker.Content>`;
    const declaration = values.presets
        ? `
    const options = [
${presets()}
    ];`
        : '';

    return `<script lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    let value = $state('#5e6ad2');${declaration}
</script>

<ColorPicker.Root bind:value${rootProps}>
    <ColorPicker.Trigger${triggerProps} />
${content}
</ColorPicker.Root>`;
}
