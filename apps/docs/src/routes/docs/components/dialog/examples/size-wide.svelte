<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Shortcut from '@mielui/svelte/components/shortcut';

    let open = $state(false);
</script>

<Dialog.Root bind:open orientation="horizontal">
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
            <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-[var(--radius-md)] border border-border bg-secondary p-4">
                    <p class="font-medium text-foreground">Repositories</p>
                    <p class="mt-1 text-sm text-foreground-muted">
                        Choose which repositories to import.
                    </p>
                </div>
                <div class="rounded-[var(--radius-md)] border border-border bg-secondary p-4">
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
                <Shortcut shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Import
                <Shortcut shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
