<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Typography from '@mielui/svelte/components/typography';
    import { getThemeEditor } from './context';
    import { toggleChoice } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Appearance" bodyClass="gap-5">
    <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-2">
            <Typography.Metadata>Borders</Typography.Metadata>
            {@render toggleChoice(
                ['single', 'double'],
                editor.state.borders,
                'Borders',
                (value) => {
                    if (value === 'single' || value === 'double') {
                        editor.state.borders = value;
                    }
                }
            )}
        </div>
        <Switch bind:checked={editor.state.glassSurfaces} label="Glass surfaces" />
    </div>
    <div class="flex flex-col gap-3 border-t border-border pt-4">
        <div class="flex items-center justify-between gap-2">
            <Switch
                bind:checked={() => editor.state.edgeHighlight > 0, editor.setEdgeHighlightEnabled}
                label="Edge highlight"
            />
            {#if editor.state.edgeHighlight > 0}
                <span class="font-mono text-xs tabular-nums text-foreground-muted">
                    <span
                        use:numberShuffle={{ value: Math.round(editor.state.edgeHighlight * 100) }}
                    >
                        {Math.round(editor.state.edgeHighlight * 100)}
                    </span>
                    %
                </span>
            {/if}
        </div>
        {#if editor.state.edgeHighlight > 0}
            <Slider
                value={Math.round(editor.state.edgeHighlight * 100)}
                min={1}
                max={100}
                step={1}
                label="Edge highlight strength"
                class="h-4"
                onValueChange={(value: number) => {
                    editor.state.edgeHighlight = value / 100;
                }}
            />
        {/if}
        <Switch bind:checked={editor.state.primaryStroke} label="Primary button border" />
    </div>
    <fieldset
        class="m-0 flex min-w-0 flex-col gap-3 border-0 border-t border-solid border-border p-0 pt-4"
    >
        <legend class="mb-1 px-0 text-xs text-foreground-muted">Shadows</legend>
        <Switch bind:checked={editor.state.surfaceShadows} label="Cards and menus" />
        <Switch bind:checked={editor.state.controlShadows} label="Controls" />
        <Switch bind:checked={editor.state.dialogShadows} label="Dialogs and sheets" />
    </fieldset>
</EditorSection>
