<script lang="ts">
    import FloatingInspector from '$lib/components/floating-inspector.svelte';
    import AdvancedDialogs from './editor/advanced-dialogs.svelte';
    import { setThemeEditor } from './editor/context';
    import { createThemeEditor } from './editor/controller.svelte';
    import Inspector from './editor/inspector.svelte';
    import PresetDialog from './editor/preset-dialog.svelte';
    import ThemeSetupDialog from './theme-setup-dialog.svelte';

    const editor = createThemeEditor();
    setThemeEditor(editor);
</script>

<div class="fixed left-5 top-5 z-30">
    <FloatingInspector title="Theme configuration">
        {#snippet children()}
            <Inspector />
        {/snippet}
    </FloatingInspector>
</div>

<ThemeSetupDialog bind:open={editor.state.setupOpen} generatedJson={editor.generatedJson} />

<AdvancedDialogs />
<PresetDialog />
