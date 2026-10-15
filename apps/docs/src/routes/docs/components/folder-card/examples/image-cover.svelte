<script lang="ts">
    import type { FolderCardLabels } from '@mielui/svelte/components/folder-card';
    import * as FolderCard from '@mielui/svelte/components/folder-card';

    const labels: FolderCardLabels = {
        count: (count, formatted) => {
            return `${formatted} ${count === 1 ? 'image' : 'images'}`;
        }
    };
</script>

<div class="w-full max-w-xs">
    <FolderCard.Root href="/docs/installation" {labels}>
        <FolderCard.Cover src="/og-default.png" />
        <FolderCard.Tab>
            <FolderCard.Title>Launch assets</FolderCard.Title>
            <FolderCard.Description>Social cards and screenshots</FolderCard.Description>
        </FolderCard.Tab>
        <FolderCard.Footer>
            <FolderCard.Count value={48} />
        </FolderCard.Footer>
    </FolderCard.Root>
</div>
