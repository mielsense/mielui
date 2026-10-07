<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Group from '@mielui/svelte/components/group';
    import { getThemeEditor } from './context';

    const editor = getThemeEditor();
</script>

<div data-studio-export class="flex shrink-0 flex-col gap-2 px-3 pt-3 pb-4">
    <Button
        onclick={() => {
                    editor.state.setupOpen = true;
                }}
    >
        Export theme
    </Button>
    <Group.Root class="w-full" aria-label="Copy theme">
        <CopyButton
            text={editor.generatedJson}
            label="Copy JSON"
            variant="outline"
            size="md"
            class="min-w-0 flex-1 [&_button]:rounded-e-none [&_button]:border-e-0"
            oncopy={() => editor.acknowledgeCopy('json')}
        >
            {editor.state.copiedKey === 'json' ? 'Copied' : 'Copy JSON'}
        </CopyButton>
        <Group.Separator />
        <CopyButton
            text={editor.generatedCss}
            label="Copy CSS"
            variant="outline"
            size="md"
            class="min-w-0 flex-1 [&_button]:rounded-s-none [&_button]:border-s-0"
            oncopy={() => editor.acknowledgeCopy('css')}
        >
            {editor.state.copiedKey === 'css' ? 'Copied' : 'Copy CSS'}
        </CopyButton>
    </Group.Root>
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
</div>
