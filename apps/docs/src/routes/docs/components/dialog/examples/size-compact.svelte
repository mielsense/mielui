<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Kbd from '@mielui/svelte/components/kbd';

    let open = $state(false);
</script>

<Dialog.Root bind:open orientation="vertical">
    <Dialog.Trigger variant="outline">Open compact dialog</Dialog.Trigger>
    <Dialog.Content size="sm">
        <Dialog.Header>
            <Dialog.Title>Quick action</Dialog.Title>
            <Dialog.Description
                >Keep short confirmations focused with the compact size.</Dialog.Description
            >
        </Dialog.Header>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Kbd shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Continue
                <Kbd shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
