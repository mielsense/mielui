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

    const sheets = [
        {
            lines: ['w-3/5', 'w-4/5', 'w-2/5'],
            class: 'left-[41%] translate-y-[36%] -rotate-6'
        },
        {
            lines: ['w-2/5', 'w-4/5', 'w-3/5'],
            class: 'left-[53%] translate-y-[24%] rotate-2'
        },
        {
            lines: ['w-4/5', 'w-3/5', 'w-4/5'],
            class: 'left-[66%] translate-y-[40%] rotate-8'
        }
    ];
</script>

<div class="@container w-full">
    <ul class="grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
        {#each folders as folder (folder.index)}
            <li class="flex">
                <FolderCard.Root href={folder.href} tone={folder.tone} class="w-full">
                    <FolderCard.Cover>
                        {#each sheets as sheet, index (index)}
                            <span
                                aria-hidden="true"
                                class={`absolute bottom-0 flex aspect-3/4 w-[30%] flex-col gap-1.5 rounded-t-[var(--radius-sm)] bg-[color-mix(in_oklab,var(--folder-card-tone)_8%,white)] px-2.5 pt-3 shadow-[var(--elevation-1)] ring-1 ring-border ${sheet.class}`}
                            >
                                {#each sheet.lines as line, row (row)}
                                    <span class={`h-1 rounded-full bg-border ${line}`}></span>
                                {/each}
                            </span>
                        {/each}
                    </FolderCard.Cover>
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
