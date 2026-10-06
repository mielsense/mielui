<script lang="ts">
    import * as FolderCard from '@mielui/svelte/components/folder-card';

    const folders = [
        {
            id: 'invoices',
            index: '001',
            name: 'Invoices',
            detail: 'Sent and paid',
            count: 128,
            tone: 1
        },
        {
            id: 'contracts',
            index: '002',
            name: 'Contracts',
            detail: 'Signed copies',
            count: 42,
            tone: 3
        },
        { id: 'archive', index: '003', name: 'Archive', detail: 'Read only', count: 906, tone: 5 }
    ] as const;

    let selected = $state('Nothing opened yet');
</script>

<div class="flex w-full max-w-2xl flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {#each folders as folder (folder.id)}
            <FolderCard.Root
                tone={folder.tone}
                disabled={folder.id === 'archive'}
                onclick={() => {
                    selected = `Opened ${folder.name}`;
                }}
            >
                <FolderCard.Cover />
                <FolderCard.Tab>
                    <FolderCard.Title>{folder.name}</FolderCard.Title>
                    <FolderCard.Description>{folder.detail}</FolderCard.Description>
                </FolderCard.Tab>
                <FolderCard.Footer>
                    <FolderCard.Index>{folder.index}</FolderCard.Index>
                    <FolderCard.Count value={folder.count} />
                </FolderCard.Footer>
            </FolderCard.Root>
        {/each}
    </div>
    <p role="status" class="text-sm text-foreground-muted">{selected}</p>
</div>
