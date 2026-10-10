import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'depth'], 'default'),
    orientation: select('Orientation', ['horizontal', 'vertical'], 'horizontal', 'Appearance'),
    separator: toggle('Separator', 'Content', true),
    link: toggle('Link', 'Content', true),
    disabled: toggle('Disabled item', 'State'),
    type: select('Selection', ['multiple', 'single'], 'multiple', 'Behavior'),
    loop: toggle('Loop', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const multiple = values.type === 'multiple';
    const vertical = values.orientation === 'vertical';
    const root = attributes({
        'aria-label': 'Text formatting',
        variant: values.variant !== 'default' && values.variant,
        orientation: vertical && 'vertical',
        loop: !values.loop && expression('false')
    });
    const group = attributes({
        type: values.type,
        'bind:value': expression(multiple ? 'formats' : 'format'),
        'aria-label': 'Text styles',
        class: vertical && 'flex-col'
    });
    const disabled = attributes({
        disabled: values.disabled
    });
    const state = multiple
        ? "let formats = $state<string[]>(['bold']);"
        : "let format = $state('bold');";
    const clear = multiple ? 'formats = [];' : "format = '';";
    const separator = values.separator
        ? `
    <Toolbar.Separator />`
        : '';
    const link = values.link
        ? `
    <Toolbar.Link href="/docs/components/toolbar">Help</Toolbar.Link>`
        : '';

    return `<script lang="ts">
    import * as Toolbar from '@mielui/svelte/components/toolbar';

    ${state}
</script>

<Toolbar.Root${root}>
    <Toolbar.Group${group}>
        <Toolbar.Item value="bold">Bold</Toolbar.Item>
        <Toolbar.Item value="italic">Italic</Toolbar.Item>
        <Toolbar.Item value="underline"${disabled}>Underline</Toolbar.Item>
    </Toolbar.Group>${separator}
    <Toolbar.Button
        onclick={() => {
            ${clear}
        }}
    >
        Clear
    </Toolbar.Button>${link}
</Toolbar.Root>`;
}
