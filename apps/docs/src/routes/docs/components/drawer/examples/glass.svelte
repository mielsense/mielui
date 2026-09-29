<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Drawer from '@mielui/svelte/components/drawer';
    import { Switch } from '@mielui/svelte/components/switch';

    let open = $state(false);
    let allowComments = $state(false);
    let notifyFollowers = $state(true);
    let shared = $state('');

    function share() {
        const extras = [
            allowComments ? 'comments on' : 'comments off',
            notifyFollowers ? 'followers notified' : 'followers not notified'
        ];
        shared = `Reading list shared with ${extras.join(', ')}.`;
        open = false;
    }
</script>

<div class="flex flex-col items-center gap-3">
    <Drawer.Root bind:open>
        <Drawer.Trigger>Share reading list</Drawer.Trigger>
        <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content surface="glass">
                <Drawer.Handle />
                <Drawer.Header class="mx-auto w-full max-w-xl">
                    <Drawer.Title>Share reading list</Drawer.Title>
                    <Drawer.Description>
                        Choose how others can follow Weekend reading.
                    </Drawer.Description>
                </Drawer.Header>
                <Drawer.Body class="mx-auto flex w-full max-w-xl flex-col gap-4 py-6">
                    <Switch bind:switched={allowComments} label="Allow comments" />
                    <Switch bind:switched={notifyFollowers} label="Notify followers" />
                </Drawer.Body>
                <Drawer.Footer class="mx-auto max-w-xl">
                    <Drawer.Close>Cancel</Drawer.Close>
                    <Button onclick={share}>Share</Button>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer.Portal>
    </Drawer.Root>

    {#if shared}
        <p role="status" class="text-sm text-foreground-muted">{shared}</p>
    {/if}
</div>
