import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    size: select('Size', ['sm', 'md', 'lg', 'xl'], 'lg'),
    orientation: select('Orientation', ['horizontal', 'vertical'], 'horizontal', 'Appearance'),
    trigger: select(
        'Trigger variant',
        ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'primary',
        'Appearance'
    ),
    glass: toggle('Glass surface', 'Appearance'),
    description: toggle('Description', 'Content', true),
    body: toggle('Body', 'Content', true),
    footer: toggle('Footer', 'Content', true),
    showClose: toggle('Close button', 'Content', true),
    error: toggle('Destructive', 'State'),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true),
    allowEscape: toggle('Close on Escape', 'Behavior', true),
    role: select('Role', ['dialog', 'alertdialog'], 'dialog', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const defaultSize = values.orientation === 'horizontal' ? 'lg' : 'md';
    const root = attributes({
        orientation: values.orientation !== 'horizontal' && values.orientation,
        error: values.error
    });
    const trigger = attributes({
        variant: values.trigger !== 'primary' && values.trigger
    });
    const content = attributes({
        size: values.size !== defaultSize && values.size,
        surface: values.glass && 'glass',
        role: values.role !== 'dialog' && values.role,
        showClose: values.showClose ? undefined : expression('false'),
        allowClickOutside: values.allowClickOutside ? undefined : expression('false'),
        allowEscape: values.allowEscape ? undefined : expression('false')
    });
    const imports = values.body
        ? `
    import { Input } from '@mielui/svelte/components/input';

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
    import * as Dialog from '@mielui/svelte/components/dialog';${imports}
</script>

<Dialog.Root${root}>
    <Dialog.Trigger${trigger}>Rename project</Dialog.Trigger>
    <Dialog.Content${content}>
        <Dialog.Header>
            <Dialog.Title>Rename project</Dialog.Title>${description}
        </Dialog.Header>${body}${footer}
    </Dialog.Content>
</Dialog.Root>`;
}
