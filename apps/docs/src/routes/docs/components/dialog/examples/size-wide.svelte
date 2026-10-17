<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Kbd from '@mielui/svelte/components/kbd';

    let open = $state(false);
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger variant="outline">Open wide dialog</Dialog.Trigger>
    <Dialog.Content size="xl">
        <Dialog.Header>
            <Dialog.Title>Import project data</Dialog.Title>
            <Dialog.Description>
                Wide modals work well for previews, tables, and other content that benefits from
                horizontal space.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
            <div class="grid gap-4 sm:grid-cols-2">
                <div>
                    <p class="font-medium text-foreground">Repositories</p>
                    <p class="mt-1 text-sm text-foreground-muted">
                        Choose which repositories to import.
                    </p>
                </div>
                <div>
                    <p class="font-medium text-foreground">Environment</p>
                    <p class="mt-1 text-sm text-foreground-muted">
                        Set the target deployment environment.
                    </p>
                </div>
            </div>
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Kbd shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Import
                <Kbd shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
