<script lang="ts">
    import * as FolderCard from '@mielui/svelte/components/folder-card';

    const sheets = [
        {
            lines: ['w-3/5', 'w-4/5', 'w-2/5'],
            class: 'left-[41%] translate-y-[44%] -rotate-6 group-hover/folder-card:translate-y-[20%] group-hover/folder-card:-rotate-10 group-focus-visible/folder-card:translate-y-[20%] group-focus-visible/folder-card:-rotate-10'
        },
        {
            lines: ['w-2/5', 'w-4/5', 'w-3/5'],
            class: 'left-[53%] translate-y-[34%] rotate-2 delay-[30ms] group-hover/folder-card:translate-y-[6%] group-hover/folder-card:rotate-1 group-focus-visible/folder-card:translate-y-[6%] group-focus-visible/folder-card:rotate-1'
        },
        {
            lines: ['w-4/5', 'w-3/5', 'w-4/5'],
            class: 'left-[66%] translate-y-[48%] rotate-8 delay-[60ms] group-hover/folder-card:translate-y-[24%] group-hover/folder-card:rotate-14 group-focus-visible/folder-card:translate-y-[24%] group-focus-visible/folder-card:rotate-14'
        }
    ];
</script>

<div class="w-full max-w-xs">
    <FolderCard.Root href="/docs/components" tone={1}>
        <FolderCard.Cover>
            {#each sheets as sheet, index (index)}
                <span
                    aria-hidden="true"
                    class={`absolute bottom-0 flex aspect-3/4 w-[30%] flex-col gap-1.5 rounded-t-[var(--radius-sm)] bg-[color-mix(in_oklab,var(--folder-card-tone)_8%,white)] px-2.5 pt-3 shadow-[0_2px_6px_rgb(0_0_0/0.16)] ring-1 ring-black/[0.06] transition-[translate,rotate] duration-[var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none ${sheet.class}`}
                >
                    {#each sheet.lines as line, row (row)}
                        <span class={`h-1 rounded-full bg-black/10 ${line}`}></span>
                    {/each}
                </span>
            {/each}
        </FolderCard.Cover>
        <FolderCard.Tab>
            <FolderCard.Title>Client projects</FolderCard.Title>
            <FolderCard.Description>Brand, web, and product</FolderCard.Description>
        </FolderCard.Tab>
        <FolderCard.Footer>
            <FolderCard.Index>001</FolderCard.Index>
            <FolderCard.Count value={3957} />
        </FolderCard.Footer>
    </FolderCard.Root>
</div>
