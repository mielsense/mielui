<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as ContextMenu from '@mielui/svelte/components/context-menu';
    import { Input } from '@mielui/svelte/components/input';

    const initialName = 'Release notes.md';
    let name = $state(initialName);
    let draft = $state(initialName);
    let editing = $state(false);
    let message = $state('');

    function rename() {
        draft = name;
        editing = true;
    }
    function save(event: SubmitEvent) {
        event.preventDefault();
        name = draft.trim();
        editing = false;
        message = `Renamed to ${name}.`;
    }
</script>

<div class="flex w-full max-w-sm flex-col gap-3">
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            <div class="rounded-[var(--radius-md)] border border-border bg-card p-4 text-sm">
                {name}
            </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Item callback={rename}>Rename file</ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
    {#if editing}
        <form onsubmit={save} class="flex flex-col gap-3">
            <Input label="File name" bind:value={draft} required />
            <Button type="submit" disabled={!draft.trim()}>Save name</Button>
        </form>
    {/if}
    <p class="text-xs text-foreground-muted">Open the file menu to rename it.</p>
    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
