<script lang="ts">
    import { Delete02Icon as Trash } from '@hugeicons/core-free-icons';
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let deleted = $state(false);
    function confirmDeletion() {
        deleted = true;
    }
</script>

<div class="flex flex-col items-center gap-3">
    <div class="grid place-items-center">
        <AlertDialog.Root error orientation="vertical">
            <AlertDialog.Trigger variant="destructive">
                <HugeiconsIcon icon={Trash} size={14} />
                Delete workspace
            </AlertDialog.Trigger>
            <AlertDialog.Content size="lg">
                <AlertDialog.Header>
                    <div class="flex items-center gap-2.5">
                        <HugeiconsIcon icon={Trash} size={18} class="text-[var(--color-error)]" />
                        <AlertDialog.Title>Delete this workspace?</AlertDialog.Title>
                    </div>
                    <AlertDialog.Description>
                        This preview will mark the sample workspace as deleted. Your actual
                        workspaces are unaffected.
                    </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                    <AlertDialog.Exit>
                        Cancel
                        <Kbd shortcut="esc" />
                    </AlertDialog.Exit>
                    <AlertDialog.Confirm onclick={confirmDeletion}>
                        Delete
                        <Kbd shortcut="enter" />
                    </AlertDialog.Confirm>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </div>

    <p role="status" class="text-sm text-foreground-muted">
        {deleted ? 'Sample workspace deleted.' : 'Sample workspace is active.'}
    </p>
</div>
