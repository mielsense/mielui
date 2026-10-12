import {
    attributes,
    BUTTON_VARIANTS,
    changed,
    compact,
    defaultOn,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    side: select('Side', ['right', 'left'], 'right'),
    trigger: select('Trigger variant', BUTTON_VARIANTS, 'primary', 'Appearance'),
    glass: toggle('Glass surface', 'Appearance'),
    description: toggle('Description', 'Content', true),
    footer: toggle('Footer', 'Content', true),
    close: toggle('Close button', 'Content', true),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const trigger = attributes({
        variant: changed(values.trigger, 'primary')
    });
    const content = attributes({
        side: changed(values.side, 'right'),
        surface: values.glass && 'glass',
        allowClickOutside: defaultOn(values.allowClickOutside)
    });
    const header = attributes({
        close: defaultOn(values.close)
    });
    const description = values.description
        ? `
            <Sheet.Description>Changes apply to your account right away.</Sheet.Description>`
        : '';
    const imports = compact([
        values.footer && "import { Button } from '@mielui/svelte/components/button';",
        "import { Input } from '@mielui/svelte/components/input';",
        "import * as Sheet from '@mielui/svelte/components/sheet';"
    ]).join('\n    ');
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

    return `<script lang="ts">
    ${imports}

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
