import {
    attributes,
    expression,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    side: select('Side', ['right', 'left'], 'right'),
    trigger: select(
        'Trigger variant',
        ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'primary',
        'Appearance'
    ),
    glass: toggle('Glass surface', 'Appearance'),
    description: toggle('Description', 'Content', true),
    footer: toggle('Footer', 'Content', true),
    close: toggle('Close button', 'Content', true),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const trigger = attributes({
        variant: values.trigger !== 'primary' && values.trigger
    });
    const content = attributes({
        side: values.side !== 'right' && values.side,
        surface: values.glass && 'glass',
        allowClickOutside: values.allowClickOutside ? undefined : expression('false')
    });
    const header = attributes({
        close: values.close ? undefined : expression('false')
    });
    const description = values.description
        ? `
            <Sheet.Description>Changes apply to your account right away.</Sheet.Description>`
        : '';
    const buttonImport = values.footer
        ? `
    import { Button } from '@mielui/svelte/components/button';`
        : '';
    const save = values.footer
        ? `

    function save() {
        open = false;
    }`
        : '';
    const footer = values.footer
        ? `
        <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Button onclick={save}>Save changes</Button>
        </Sheet.Footer>`
        : '';

    return `<script lang="ts">${buttonImport}
    import { Input } from '@mielui/svelte/components/input';
    import * as Sheet from '@mielui/svelte/components/sheet';

    let open = $state(false);${save}
</script>

<Sheet.Root bind:open>
    <Sheet.Trigger${trigger}>Edit profile</Sheet.Trigger>
    <Sheet.Content${content}>
        <Sheet.Header${header}>
            <Sheet.Title>Edit profile</Sheet.Title>${description}
        </Sheet.Header>
        <div class="flex flex-col gap-4">
            <Input label="Name" placeholder="Ada Lovelace" />
            <Input label="Email" type="email" placeholder="ada@example.com" />
        </div>${footer}
    </Sheet.Content>
</Sheet.Root>`;
}
