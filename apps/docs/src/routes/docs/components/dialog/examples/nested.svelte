<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Kbd from '@mielui/svelte/components/kbd';

    let open = $state(false);
    let nestedOpen = $state(false);
</script>

<Dialog.Root bind:open orientation="vertical">
    <Dialog.Trigger>Edit project</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Edit project</Dialog.Title>
            <Dialog.Description>
                Change the name, or transfer this project to someone else.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
            <Dialog.Root bind:open={nestedOpen} orientation="vertical">
                <Dialog.Trigger variant="outline">Transfer ownership</Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Transfer ownership</Dialog.Title>
                        <Dialog.Description>
                            The new owner gets full control. You will remain a member.
                        </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Footer>
                        <Dialog.Close>
                            Cancel
                            <Kbd shortcut="esc" />
                        </Dialog.Close>
                        <Dialog.Confirm>
                            Transfer
                            <Kbd shortcut="enter" />
                        </Dialog.Confirm>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </Dialog.Body>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Kbd shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Save
                <Kbd shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
