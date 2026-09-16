<script lang="ts">
    import Trash from '@hugeicons/core-free-icons/Delete02Icon';
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="grid place-items-center">
    <AlertDialog.Root error orientation="vertical">
        <AlertDialog.Trigger variant="destructive">
            <HugeiconsIcon icon={Trash} size={14} />
            Delete workspace
        </AlertDialog.Trigger>
        <AlertDialog.Content surface="glass" size="lg">
            <AlertDialog.Header>
                <div class="flex items-center gap-2.5">
                    <HugeiconsIcon icon={Trash} size={18} class="text-[var(--color-error)]" />
                    <AlertDialog.Title>Delete this workspace?</AlertDialog.Title>
                </div>
                <AlertDialog.Description>
                    All projects, comments, and exports will be removed. This action cannot be
                    undone.
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Exit>
                    Cancel
                    <Kbd shortcut="esc" />
                </AlertDialog.Exit>
                <AlertDialog.Confirm>
                    Delete
                    <Kbd shortcut="enter" />
                </AlertDialog.Confirm>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
</div>
