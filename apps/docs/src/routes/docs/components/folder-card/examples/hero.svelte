<script lang="ts">
    import * as FolderCard from '@mielui/svelte/components/folder-card';
</script>

<div class="w-full max-w-xs">
    <FolderCard.Root href="/docs/components" tone={1}>
        <FolderCard.Cover />
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
