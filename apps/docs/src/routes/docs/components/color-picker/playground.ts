import {
    attributes,
    changed,
    compact,
    type PlaygroundValues,
    quote,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Variant', ['outline', 'secondary', 'ghost'], 'outline'),
    format: select('Format', ['hsl', 'rgb', 'hsv'], 'hsl', 'Appearance'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    label: toggle('Label', 'Content', true),
    plane: toggle('Plane', 'Content', true),
    channels: toggle('Channels', 'Content', true),
    presets: toggle('Presets', 'Content')
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

/** Content renders every part by itself, so the example only spells them out when one is off. */
export function isDefaultContent(values: Values): boolean {
    return values.plane && values.channels;
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
        format: changed(values.format, 'hsl')
    });
    const optionsProp = values.presets ? ' {options}' : '';
    const triggerProps = attributes({
        variant: changed(values.variant, 'outline')
    });
    const contentProps = attributes({
        surface: changed(values.surface, 'theme')
    });
    const channelsProps = attributes({
        class: values.presets && CHANNELS_SEAM
    });
    const parts = compact([
        values.plane && '        <ColorPicker.Plane class="mx-1.5 mt-1.5 w-auto" />',
        `        <div class="flex items-center gap-2.5 px-2.5 pt-2.5 pb-1">
            <ColorPicker.Preview />
            <div class="min-w-0 flex-1 space-y-2">
                <ColorPicker.Hue />
                <ColorPicker.HexInput />
            </div>
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

<ColorPicker.Root bind:value${optionsProp}${rootProps}>
    <ColorPicker.Trigger${triggerProps} />
${content}
</ColorPicker.Root>`;
}
