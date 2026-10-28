<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import { getThemeEditor } from './context';

    const editor = getThemeEditor();
    const changeLabel = $derived.by(() => {
        if (editor.changes === 0) {
            return 'No changes';
        }

        return editor.changes === 1 ? '1 change' : `${editor.changes} changes`;
    });
</script>

<!--
    @component
    The strip pinned under the Studio settings, like the docs sidebar's page meter: how many
    settings differ from the preset, the share link, and Export theme.
-->

<div data-studio-export class="flex h-14 shrink-0 items-center gap-1 px-3">
    <span class="me-auto ps-3 text-xs text-foreground-muted tabular-nums">{changeLabel}</span>
    <CopyButton
        text={editor.shareLink}
        labels={{ copy: 'Copy a link that opens this theme in the Studio', copied: 'Link copied' }}
        variant="ghost"
        size="sm"
        disabled={!editor.shareLink}
    >
        Copy link
    </CopyButton>
    <Button
        size="sm"
        onclick={() => {
            editor.state.setupOpen = true;
        }}
    >
        Export theme
    </Button>
</div>
