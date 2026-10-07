<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
</script>

<Dialog.Root error>
    <Dialog.Trigger variant="outline">Remove member</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Remove Sam from the workspace?</Dialog.Title>
            <Dialog.Description>Sam loses access to every project right away.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
            <Dialog.Close>Cancel</Dialog.Close>
            <Dialog.Confirm>Remove member</Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
