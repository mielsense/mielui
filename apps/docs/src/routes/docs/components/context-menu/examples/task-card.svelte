<script lang="ts">
    import {
        Tick02Icon as Check,
        PencilEdit01Icon as Pencil,
        Share08Icon as Share
    } from '@hugeicons/core-free-icons';
    import * as ContextMenu from '@mielui/svelte/components/context-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center justify-center">
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            <div
                class="flex h-20 w-56 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border bg-secondary/30 text-sm text-foreground-muted"
            >
                Right-click a task
            </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Pencil} size={14} />
                    Edit
                </span>
            </ContextMenu.Item>
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Share} size={14} />
                    Share
                </span>
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Check} size={14} />
                    Mark complete
                </span>
            </ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
</div>
