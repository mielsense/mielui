<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Drawer from '@mielui/svelte/components/drawer';
    import { Switch } from '@mielui/svelte/components/switch';

    type Direction = 'top' | 'right' | 'bottom' | 'left';

    const directions: Direction[] = ['top', 'right', 'bottom', 'left'];
    let open = $state(false);
    let direction = $state<Direction>('right');
    let unreadOnly = $state(true);
    let showArchived = $state(false);

    function show(next: Direction) {
        direction = next;
        open = true;
    }
</script>

<div class="flex flex-wrap justify-center gap-2">
    {#each directions as option (option)}
        <Button variant="secondary" onclick={() => show(option)}>
            {option[0].toUpperCase() + option.slice(1)}
        </Button>
    {/each}
</div>

<Drawer.Root bind:open {direction}>
    <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
            <Drawer.Handle />
            <Drawer.Header>
                <Drawer.Title>Filters</Drawer.Title>
                <Drawer.Description>Choose what appears in your reading list.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body class="flex flex-col gap-4 py-6">
                <Switch bind:checked={unreadOnly} label="Unread only" />
                <Switch bind:checked={showArchived} label="Show archived" />
            </Drawer.Body>
            <Drawer.Footer>
                <Drawer.Close>Close</Drawer.Close>
                <Button
                    onclick={() => {
                        open = false;
                    }}
                >
                    Apply
                </Button>
            </Drawer.Footer>
        </Drawer.Content>
    </Drawer.Portal>
</Drawer.Root>
