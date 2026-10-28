import {
    attributes,
    changed,
    compact,
    defaultOn,
    type PlaygroundValues,
    select,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    side: select('Side', ['right', 'left'], 'right'),
    surface: select('Surface', ['theme', 'solid', 'glass'], 'theme', 'Appearance'),
    description: toggle('Description', 'Content', true),
    showClose: toggle('Close button', 'Content', true),
    footer: toggle('Footer', 'Content', true),
    allowClickOutside: toggle('Close on outside press', 'Behavior', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const content = attributes({
        side: changed(values.side, 'right'),
        surface: changed(values.surface, 'theme'),
        allowClickOutside: defaultOn(values.allowClickOutside)
    });
    const header = attributes({
        showClose: defaultOn(values.showClose)
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
    <Sheet.Trigger>Edit profile</Sheet.Trigger>
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
