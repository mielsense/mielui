<script lang="ts">
    import FloatingInspector from '$lib/components/shell/floating-inspector.svelte';
    import AdvancedDialogs from './editor/advanced-dialogs.svelte';
    import { setThemeEditor } from './editor/context';
    import { createThemeEditor } from './editor/controller.svelte';
    import Inspector from './editor/inspector.svelte';
    import PresetDialog from './editor/preset-dialog.svelte';
    import ThemeSetupDialog from './theme-setup-dialog.svelte';

    const editor = createThemeEditor();
    setThemeEditor(editor);
</script>

<div
    class="absolute left-2 top-0 z-30 flex h-[calc(var(--docs-row-height)-var(--border-size))] items-center sm:left-5"
>
    <FloatingInspector title="Theme configuration" storageKey="mielui:studio-sidebar-pinned">
        {#snippet children()}
            <Inspector />
        {/snippet}
    </FloatingInspector>
</div>

<ThemeSetupDialog bind:open={editor.state.setupOpen} generatedJson={editor.generatedJson} />

<AdvancedDialogs />
<PresetDialog />
