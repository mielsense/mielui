<script lang="ts">
    import Archive from '@hugeicons/core-free-icons/ArchiveIcon';
    import Trash from '@hugeicons/core-free-icons/Delete02Icon';
    import Copy2 from '@hugeicons/core-free-icons/Files01Icon';
    import MoreHorizontal from '@hugeicons/core-free-icons/MoreHorizontalIcon';
    import Pencil from '@hugeicons/core-free-icons/PencilEdit01Icon';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger variant="ghost" size="icon" aria-label="Row actions">
        <HugeiconsIcon icon={MoreHorizontal} size={14} />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="min-w-[12rem]">
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={Pencil} size={13} />
                Rename
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={Copy2} size={13} />
                Duplicate
            </span>
            <Kbd shortcut="cmd+D" />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <span class="flex items-center gap-2">
                <HugeiconsIcon icon={Archive} size={13} />
                Archive
            </span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <span class="flex items-center gap-2 text-[var(--color-error)]">
                <HugeiconsIcon icon={Trash} size={13} />
                Delete
            </span>
            <Kbd shortcut="backspace" />
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
