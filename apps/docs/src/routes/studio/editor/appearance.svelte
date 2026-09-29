<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Typography from '@mielui/svelte/components/typography';
    import { getThemeEditor } from './context';
    import { toggleChoice } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
    const edgePercent = $derived(Math.round(editor.state.edgeHighlight * 100));
</script>

<EditorSection title="Appearance" bodyClass="gap-6">
    <div class="flex flex-col gap-3" role="group" aria-label="Surfaces">
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
        <div class="flex flex-col gap-2">
            <Typography.Metadata>Inset strip</Typography.Metadata>
            {@render toggleChoice(
                ['top', 'bottom'],
                editor.state.insetPosition,
                'Inset strip position',
                (value) => {
                    if (value === 'top' || value === 'bottom') {
                        editor.state.insetPosition = value;
                    }
                }
            )}
        </div>
        <Switch bind:checked={editor.state.glassSurfaces} label="Glass surfaces" />
    </div>
    <div class="flex flex-col gap-3" role="group" aria-label="Edges">
        <Typography.Metadata>Edges</Typography.Metadata>
        <div class="flex items-center justify-between gap-2">
            <Switch
                bind:checked={() => editor.state.edgeHighlight > 0, editor.setEdgeHighlightEnabled}
                label="Edge highlight"
            />
            {#if editor.state.edgeHighlight > 0}
                <span
                    class="font-mono text-xs tabular-nums text-foreground-muted"
                    use:numberShuffle={{
                        value: edgePercent,
                        format: (value) => `${value}%`
                    }}
                >
                    {`${edgePercent}%`}
                </span>
            {/if}
        </div>
        {#if editor.state.edgeHighlight > 0}
            <Slider
                value={edgePercent}
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
    <div class="flex flex-col gap-3" role="group" aria-label="Shadows">
        <Typography.Metadata>Shadows</Typography.Metadata>
        <Switch bind:checked={editor.state.surfaceShadows} label="Cards and menus" />
        <Switch bind:checked={editor.state.controlShadows} label="Controls" />
        <Switch bind:checked={editor.state.dialogShadows} label="Dialogs and sheets" />
    </div>
</EditorSection>
