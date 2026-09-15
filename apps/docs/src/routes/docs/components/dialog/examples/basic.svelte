<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import Shortcut from '@mielui/svelte/components/shortcut';

    let open = $state(false);
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger>Open dialog</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Dialog title</Dialog.Title>
            <Dialog.Description>Describe what happens here.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
            <Dialog.Close>
                Cancel
                <Shortcut shortcut="esc" />
            </Dialog.Close>
            <Dialog.Confirm>
                Confirm
                <Shortcut shortcut="enter" />
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
