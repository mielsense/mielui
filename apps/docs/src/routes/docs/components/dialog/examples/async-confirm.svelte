<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';

    let open = $state(false);
    let saving = $state(false);

    function save(event: MouseEvent) {
        event.preventDefault();
        saving = true;
        setTimeout(() => {
            saving = false;
            open = false;
        }, 1200);
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger>Rename project</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Rename to Northwind API?</Dialog.Title>
            <Dialog.Description>The dialog stays open until the save finishes.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
            <Dialog.Close disabled={saving}>Cancel</Dialog.Close>
            <Dialog.Confirm loading={saving} loadingLabel="Saving" onclick={save}>
                Rename
            </Dialog.Confirm>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
