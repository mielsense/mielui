<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';

    let { open = $bindable(false), error = false } = $props();
</script>

<button type="button" data-testid="trigger" onclick={() => (open = true)}>Open alert dialog</button>

<AlertDialog.Root bind:open {error}>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Delete project?</AlertDialog.Title>
            <AlertDialog.Description>
                This action cannot be undone. The project and all its data will be permanently
                removed.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Close onclick={() => (open = false)}>Cancel</AlertDialog.Close>
            <AlertDialog.Confirm onclick={() => (open = false)}>Delete</AlertDialog.Confirm>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
