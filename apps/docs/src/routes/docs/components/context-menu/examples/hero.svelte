<script lang="ts">
    import * as ContextMenu from '@mielui/svelte/components/context-menu';
    import Kbd from '@mielui/svelte/components/kbd';
</script>

<div class="flex items-center justify-center">
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            <div
                class="flex h-28 w-64 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border bg-secondary/30 text-sm text-foreground-muted"
            >
                Right-click or tap here
            </div>
        </ContextMenu.Trigger>

        <ContextMenu.Content class="min-w-[13rem]">
            <ContextMenu.Item callback={() => {}}>
                Copy
                <Kbd shortcut="cmd+C" />
            </ContextMenu.Item>
            <ContextMenu.Item callback={() => {}}>
                Paste
                <Kbd shortcut="cmd+V" />
            </ContextMenu.Item>
            <ContextMenu.Item callback={() => {}}>
                Duplicate
                <Kbd shortcut="cmd+D" />
            </ContextMenu.Item>

            <ContextMenu.Separator />

            <ContextMenu.Sub>
                <ContextMenu.SubTrigger>Arrange</ContextMenu.SubTrigger>
                <ContextMenu.SubContent class="min-w-[12rem]">
                    <ContextMenu.Item callback={() => {}}>
                        Bring to front
                        <Kbd shortcut="cmd+]" />
                    </ContextMenu.Item>
                    <ContextMenu.Item callback={() => {}}>
                        Send to back
                        <Kbd shortcut="cmd+[" />
                    </ContextMenu.Item>
                </ContextMenu.SubContent>
            </ContextMenu.Sub>

            <ContextMenu.Separator />

            <ContextMenu.Item callback={() => {}}>
                <span class="text-[var(--color-error)]">Delete</span>
                <Kbd shortcut="backspace" />
            </ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
</div>
