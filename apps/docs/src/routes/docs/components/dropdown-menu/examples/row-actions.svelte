<script lang="ts">
    import {
        ArchiveIcon as Archive,
        Files01Icon as Copy2,
        MoreHorizontalIcon as MoreHorizontal,
        PencilEdit01Icon as Pencil,
        Delete02Icon as Trash
    } from '@hugeicons/core-free-icons';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let fileName = $state('Release notes.md');
    let copies = $state(1);
    let message = $state('');
    function rename() {
        fileName = 'Release notes, final.md';
    }
    function duplicate() {
        copies += 1;
        message = `Created copy ${copies}.`;
    }
    function archive() {
        message = 'File moved to the local archive.';
    }
    function remove() {
        message = 'File removed from this preview.';
    }
</script>

<div class="flex flex-col items-center gap-3">
    <p class="text-sm">{fileName}</p>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger variant="ghost" size="icon" aria-label="Row actions">
            <HugeiconsIcon icon={MoreHorizontal} size={14} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="min-w-[12rem]">
            <DropdownMenu.Item callback={rename}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Pencil} size={13} />
                    Rename
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={duplicate}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Copy2} size={13} />
                    Duplicate
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Item callback={archive}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Archive} size={13} />
                    Archive
                </span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item callback={remove}>
                <span class="flex items-center gap-2 text-[var(--color-error)]">
                    <HugeiconsIcon icon={Trash} size={13} />
                    Delete
                </span>
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>

    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
