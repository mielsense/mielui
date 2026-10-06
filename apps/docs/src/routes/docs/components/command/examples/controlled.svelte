<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Command from '@mielui/svelte/components/command';

    let open = $state(false);
    let picked = $state('Nothing picked yet');
</script>

<div class="flex flex-col items-center gap-3">
    <Button
        variant="outline"
        onclick={() => {
            open = true;
        }}
    >
        Open the palette from a button
    </Button>
    <Command.Root bind:open>
        <Command.Content label="Workspace commands" allowClickOutside={false}>
            <Command.Search placeholder="Try typing invce" threshold={0.5} />
            <Command.Results>
                <Command.Group heading="Create">
                    <Command.Item
                        name="New invoice"
                        callback={() => {
                            picked = 'New invoice';
                        }}
                    >
                        New invoice
                    </Command.Item>
                    <Command.Item
                        name="New customer"
                        callback={() => {
                            picked = 'New customer';
                        }}
                    >
                        New customer
                    </Command.Item>
                </Command.Group>
            </Command.Results>
        </Command.Content>
    </Command.Root>
    <p class="text-sm text-foreground-muted">{picked}</p>
</div>
