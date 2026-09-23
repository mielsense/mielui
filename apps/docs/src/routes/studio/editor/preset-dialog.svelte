<script lang="ts">
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import Kbd from '@mielui/svelte/components/kbd';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';

    import { getThemeEditor } from './context';

    const editor = getThemeEditor();
</script>

<AlertDialog.Root bind:open={editor.state.presetDialogOpen} orientation="vertical">
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Replace your current draft?</AlertDialog.Title>
            <AlertDialog.Description>
                Switching to
                {builtInThemePresets.find((preset) => preset.slug === editor.state.pendingPreset)
                        ?.name ?? 'this preset'}
                resets every changed color, type, shape, and motion value.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Exit onclick={() => (editor.state.pendingPreset = null)}>
                Keep draft
                <Kbd shortcut="esc" />
            </AlertDialog.Exit>
            <AlertDialog.Confirm onclick={editor.confirmPresetChange}>
                Replace draft
                <Kbd shortcut="enter" />
            </AlertDialog.Confirm>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
