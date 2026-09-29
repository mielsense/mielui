<script lang="ts">
    import * as FolderCard from '@mielui/svelte/components/folder-card';

    const folders = [
        {
            index: '001',
            title: 'Client projects',
            description: 'Brand, web, and product',
            href: '/docs/components',
            tone: 1,
            files: 3957
        },
        {
            index: '002',
            title: 'Internal work',
            description: 'Processes and workflows',
            href: '/docs/installation',
            tone: 2,
            files: 465
        },
        {
            index: '003',
            title: 'Archive',
            description: 'Retired and unused files',
            href: '/studio',
            tone: 3,
            files: 164
        }
    ] as const;
</script>

<div class="@container w-full">
    <ul class="grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
        {#each folders as folder (folder.index)}
            <li class="flex">
                <FolderCard.Root href={folder.href} tone={folder.tone} class="w-full">
                    <FolderCard.Cover />
                    <FolderCard.Tab>
                        <FolderCard.Title>{folder.title}</FolderCard.Title>
                        <FolderCard.Description>{folder.description}</FolderCard.Description>
                    </FolderCard.Tab>
                    <FolderCard.Footer>
                        <FolderCard.Index>{folder.index}</FolderCard.Index>
                        <FolderCard.Count value={folder.files} />
                    </FolderCard.Footer>
                </FolderCard.Root>
            </li>
        {/each}
    </ul>
</div>
