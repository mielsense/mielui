import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    select,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    direction: select('Direction', ['bottom', 'top', 'left', 'right'], 'bottom'),
    glass: toggle('Glass surface', 'Appearance'),
    handle: toggle('Handle', 'Content', true),
    description: toggle('Description', 'Content', true),
    dismissible: toggle('Dismissible', 'Behavior', true),
    handleOnly: toggle('Drag from handle only', 'Behavior'),
    closeThreshold: number('Close threshold', 0.25, {
        min: 0.05,
        max: 1,
        step: 0.05,
        group: 'Behavior'
    })
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const root = attributes({
        direction: values.direction !== 'bottom' && values.direction,
        dismissible: values.dismissible ? undefined : expression('false'),
        handleOnly: values.handleOnly,
        closeThreshold: values.closeThreshold !== 0.25 && values.closeThreshold
    });
    const content = attributes({
        surface: values.glass && 'glass'
    });
    const handle = values.handle
        ? `
            <Drawer.Handle />`
        : '';
    const description = values.description
        ? `
                <Drawer.Description>Choose what appears in your reading list.</Drawer.Description>`
        : '';

    return `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Drawer from '@mielui/svelte/components/drawer';
    import { Switch } from '@mielui/svelte/components/switch';

    let open = $state(false);
    let unreadOnly = $state(true);
    let showArchived = $state(false);

    function apply() {
        open = false;
    }
</script>

<Drawer.Root bind:open${root}>
    <Drawer.Trigger>Filters</Drawer.Trigger>
    <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content${content}>${handle}
            <Drawer.Header>
                <Drawer.Title>Filters</Drawer.Title>${description}
            </Drawer.Header>
            <Drawer.Body class="flex flex-col gap-4">
                <Switch bind:checked={unreadOnly} label="Unread only" />
                <Switch bind:checked={showArchived} label="Show archived" />
            </Drawer.Body>
            <Drawer.Footer>
                <Drawer.Close>Close</Drawer.Close>
                <Button onclick={apply}>Apply</Button>
            </Drawer.Footer>
        </Drawer.Content>
    </Drawer.Portal>
</Drawer.Root>`;
}
