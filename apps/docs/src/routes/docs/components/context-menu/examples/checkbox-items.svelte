<script lang="ts">
    import * as ContextMenu from '@mielui/svelte/components/context-menu';

    let grid = $state(true);
    let rulers = $state(false);
</script>

<ContextMenu.Root>
    <ContextMenu.Trigger
        class="grid h-32 w-72 place-items-center rounded-[var(--radius-xl)] border border-dashed border-border text-sm text-foreground-muted"
    >
        Right-click the canvas. Grid {grid ? 'on' : 'off'}, rulers {rulers ? 'on' : 'off'}.
    </ContextMenu.Trigger>
    <ContextMenu.Content class="min-w-[12rem]">
        <ContextMenu.CheckboxItem value="grid" bind:checked={grid}
            >Show grid</ContextMenu.CheckboxItem
        >
        <ContextMenu.CheckboxItem value="rulers" bind:checked={rulers}>
            Show rulers
        </ContextMenu.CheckboxItem>
        <ContextMenu.Separator />
        <ContextMenu.Item inset>Reset view</ContextMenu.Item>
    </ContextMenu.Content>
</ContextMenu.Root>
