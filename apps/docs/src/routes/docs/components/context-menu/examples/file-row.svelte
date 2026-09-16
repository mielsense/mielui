<script lang="ts">
    import Trash from '@hugeicons/core-free-icons/Delete02Icon';
    import FolderOpen from '@hugeicons/core-free-icons/FolderOpenIcon';
    import Pencil from '@hugeicons/core-free-icons/PencilEdit01Icon';
    import * as ContextMenu from '@mielui/svelte/components/context-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center justify-center">
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            <div
                class="flex h-20 w-56 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border bg-secondary/30 text-sm text-foreground-muted"
            >
                Right-click a file
            </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={FolderOpen} size={14} />
                    Open
                </span>
            </ContextMenu.Item>
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Pencil} size={14} />
                    Rename
                </span>
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2 text-[var(--color-error)]">
                    <HugeiconsIcon icon={Trash} size={14} />
                    Delete
                </span>
            </ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
</div>
