<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import { getThemeEditor } from './context';

    const editor = getThemeEditor();
</script>

<div data-studio-export class="flex shrink-0 flex-col gap-2 px-3 pt-3 pb-4">
    <CopyButton
        text={editor.shareLink}
        label="Copy a link that opens this theme in the Studio"
        copiedLabel="Link copied"
        variant="ghost"
        size="md"
        class="w-full"
        disabled={!editor.shareLink}
    >
        Copy share link
    </CopyButton>
    <Button
        onclick={() => {
            editor.state.setupOpen = true;
        }}
    >
        Export theme
    </Button>
</div>
