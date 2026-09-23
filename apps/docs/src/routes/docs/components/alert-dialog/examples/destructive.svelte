<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';
</script>

<div class="grid place-items-center">
    <AlertDialog.Root error>
        <AlertDialog.Trigger variant="destructive">Delete project</AlertDialog.Trigger>
        <AlertDialog.Content size="lg">
            <AlertDialog.Header>
                <AlertDialog.Title>Delete this project?</AlertDialog.Title>
                <AlertDialog.Description>
                    All branches, issues, and deploy history will be permanently removed.
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Exit>
                    Cancel
                    <Kbd shortcut="esc" />
                </AlertDialog.Exit>
                <AlertDialog.Confirm>
                    Delete project
                    <Kbd shortcut="enter" />
                </AlertDialog.Confirm>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
</div>
