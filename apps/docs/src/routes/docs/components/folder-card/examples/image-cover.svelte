<script lang="ts">
    import * as FolderCard from '@mielui/svelte/components/folder-card';
</script>

<div class="w-full max-w-xs">
    <FolderCard.Root href="/docs/installation">
        <FolderCard.Cover src="/og-default.png" />
        <FolderCard.Tab>
            <FolderCard.Title>Launch assets</FolderCard.Title>
            <FolderCard.Description>Social cards and screenshots</FolderCard.Description>
        </FolderCard.Tab>
        <FolderCard.Footer>
            <FolderCard.Count value={48} unit="images" />
        </FolderCard.Footer>
    </FolderCard.Root>
</div>
