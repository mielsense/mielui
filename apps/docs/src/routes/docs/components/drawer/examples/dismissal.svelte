<script lang="ts">
    import * as Drawer from '@mielui/svelte/components/drawer';

    let blocked = $state(0);
</script>

<Drawer.Root>
    <Drawer.Trigger>Open drawer</Drawer.Trigger>
    <Drawer.Content
        interactOutsideBehavior="ignore"
        onEscapeKeydown={(event) => {
            event.preventDefault();
            blocked += 1;
        }}
    >
        <Drawer.Header>
            <Drawer.Title>Unsaved changes</Drawer.Title>
            <Drawer.Description>
                Outside presses are ignored. Escape was blocked {blocked} times.
            </Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
            <Drawer.Close>Discard and close</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
