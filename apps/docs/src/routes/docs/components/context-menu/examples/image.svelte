<script lang="ts">
    import { Copy01Icon as Copy, Download01Icon as Download } from '@hugeicons/core-free-icons';
    import * as ContextMenu from '@mielui/svelte/components/context-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center justify-center">
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            <div
                class="flex h-20 w-56 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border bg-secondary/30 text-sm text-foreground-muted"
            >
                Right-click an image
            </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Download} size={14} />
                    Save image
                </span>
            </ContextMenu.Item>
            <ContextMenu.Item callback={() => {}}>
                <span class="flex items-center gap-2">
                    <HugeiconsIcon icon={Copy} size={14} />
                    Copy image
                </span>
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item callback={() => {}}>Open in new tab</ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
</div>
