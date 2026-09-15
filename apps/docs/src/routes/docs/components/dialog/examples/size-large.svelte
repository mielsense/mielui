<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Shortcut from '@mielui/svelte/components/shortcut';

    let open = $state(false);
</script>

<Dialog.Root bind:open orientation="vertical">
    <Dialog.Trigger variant="outline">Open large dialog</Dialog.Trigger>
    <Dialog.Content size="lg">
        <Dialog.Header>
            <Dialog.Title>Review your workspace</Dialog.Title>
            <Dialog.Description>
                Use a larger surface when the dialog needs room for supporting details or multiple
                controls.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
            <p class="text-sm text-foreground-muted">
                Invite teammates, configure permissions, and review workspace settings in one place.
            </p>
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Shortcut shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Save changes
                <Shortcut shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
