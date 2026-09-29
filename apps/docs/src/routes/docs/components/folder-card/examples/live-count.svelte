<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as FolderCard from '@mielui/svelte/components/folder-card';

    let files = $state(465);

    function addFiles() {
        files += 24;
    }

    function reset() {
        files = 465;
    }
</script>

<div class="flex w-full max-w-xs flex-col gap-3">
    <FolderCard.Root tone={4}>
        <FolderCard.Cover />
        <FolderCard.Tab>
            <FolderCard.Title>Uploads</FolderCard.Title>
            <FolderCard.Description>Shared with the design team</FolderCard.Description>
        </FolderCard.Tab>
        <FolderCard.Footer>
            <FolderCard.Index>004</FolderCard.Index>
            <FolderCard.Count value={files} />
        </FolderCard.Footer>
    </FolderCard.Root>
    <div class="flex gap-2">
        <Button variant="outline" size="sm" onclick={addFiles}>Add 24 files</Button>
        <Button variant="ghost" size="sm" onclick={reset}>Reset</Button>
    </div>
</div>
