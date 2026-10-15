<script lang="ts">
    import * as ContextMenu from '@mielui/svelte/components/context-menu';
</script>

<ContextMenu.Root>
    <ContextMenu.Trigger
        class="grid h-32 w-72 place-items-center rounded-[var(--radius-xl)] border border-dashed border-border text-sm text-foreground-muted"
    >
        Right-click or press and hold
    </ContextMenu.Trigger>
    <ContextMenu.Content surface="glass">
        <ContextMenu.Item>Open</ContextMenu.Item>
        <ContextMenu.Item>Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Organize</ContextMenu.SubTrigger>
            <ContextMenu.SubContent surface="glass">
                <ContextMenu.Item>Move to folder</ContextMenu.Item>
                <ContextMenu.Item>Add tag</ContextMenu.Item>
            </ContextMenu.SubContent>
        </ContextMenu.Sub>
    </ContextMenu.Content>
</ContextMenu.Root>
