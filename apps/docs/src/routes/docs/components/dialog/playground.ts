import {
    attributes,
    changed,
    compact,
    defaultOn,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    size: select('Size', ['sm', 'md', 'lg', 'xl'], 'lg'),
    orientation: select('Orientation', ['horizontal', 'vertical'], 'horizontal', 'Appearance'),
    glass: toggle('Glass surface', 'Appearance'),
    description: toggle('Description', 'Content', true),
    body: toggle('Body', 'Content', true),
    footer: toggle('Footer', 'Content', true),
    showClose: toggle('Close button', 'Content', true),
    error: toggle('Destructive', 'State'),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true),
    allowEscape: toggle('Close on Escape', 'Behavior', true)
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const defaultSize = values.orientation === 'horizontal' ? 'lg' : 'md';
    const root = attributes({
        orientation: changed(values.orientation, 'horizontal'),
        error: values.error
    });
    const content = attributes({
        size: changed(values.size, defaultSize),
        surface: values.glass && 'glass',
        showClose: defaultOn(values.showClose),
        allowClickOutside: defaultOn(values.allowClickOutside),
        allowEscape: defaultOn(values.allowEscape)
    });
    const imports = compact([
        "import * as Dialog from '@mielui/svelte/components/dialog';",
        values.body && "import { Input } from '@mielui/svelte/components/input';"
    ]).join('\n    ');
    const state = values.body
        ? `

    let name = $state('Mielui docs');`
        : '';
    const description = values.description
        ? `
            <Dialog.Description>
                The new name shows up everywhere this project is listed.
            </Dialog.Description>`
        : '';
    const body = values.body
        ? `
        <Dialog.Body>
            <Input bind:value={name} label="Project name" />
        </Dialog.Body>`
        : '';
    const footer = values.footer
        ? `
        <Dialog.Footer>
            <Dialog.Close>Cancel</Dialog.Close>
            <Dialog.Confirm>Rename</Dialog.Confirm>
        </Dialog.Footer>`
        : '';

    return `<script lang="ts">
    ${imports}${state}
</script>

<Dialog.Root${root}>
    <Dialog.Trigger>Rename project</Dialog.Trigger>
    <Dialog.Content${content}>
        <Dialog.Header>
            <Dialog.Title>Rename project</Dialog.Title>${description}
        </Dialog.Header>${body}${footer}
    </Dialog.Content>
</Dialog.Root>`;
}
