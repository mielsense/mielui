<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as ContextMenu from '@mielui/svelte/components/context-menu';

    const initialName = 'Release checklist';
    const actions = ['Open', 'Mark complete', 'Duplicate', 'Delete'] as const;
    let fileName = $state(initialName);
    let copies = $state(1);
    let deleted = $state(false);
    let complete = $state(false);
    let message = $state('');

    function apply(action: string) {
        if (action === 'Open') {
            message = `Opened ${fileName} in this preview.`;
        } else if (action === 'Rename') {
            fileName = `Updated ${initialName.toLowerCase()}`;
            message = 'Name updated.';
        } else if (action === 'Duplicate') {
            copies += 1;
            message = `Created copy ${copies}.`;
        } else if (action === 'Mark complete') {
            complete = !complete;
            message = complete ? 'Task completed.' : 'Task reopened.';
        } else {
            deleted = true;
            message = 'Removed from this preview. Restore it to try again.';
        }
    }

    function restore() {
        deleted = false;
        copies = 1;
        fileName = initialName;
        complete = false;
        message = '';
    }
</script>

<div class="flex w-full max-w-sm flex-col gap-3">
    {#if deleted}
        <Button variant="secondary" onclick={restore}>Restore item</Button>
    {:else}
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <div
                    class="flex min-h-28 flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-border p-5 text-center"
                >
                    <span class="text-sm">{fileName}</span>
                    <span class="text-xs text-foreground-muted">
                        {complete ? 'Completed' : `${copies} ${copies === 1 ? 'item' : 'items'}`}
                    </span>
                    <span class="text-xs text-foreground-muted">Right-click or press and hold</span>
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                {#each actions as action (action)}
                    <ContextMenu.Item callback={() => apply(action)}>
                        {action === 'Mark complete' && complete ? 'Reopen task' : action}
                    </ContextMenu.Item>
                {/each}
            </ContextMenu.Content>
        </ContextMenu.Root>
    {/if}
    <p role="status" class="text-sm text-foreground-muted">{message}</p>
</div>
