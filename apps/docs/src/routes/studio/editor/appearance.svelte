<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import { getThemeEditor } from './context';
    import { toggleChoice } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
    const edgePercent = $derived(Math.round(editor.state.edgeHighlight * 100));
</script>

<EditorSection title="Surfaces">
    <Row label="Borders" wide>
        {@render toggleChoice(['single', 'double'], editor.state.borders, 'Borders', (value) => {
            if (value === 'single' || value === 'double') {
                editor.state.borders = value;
            }
        })}
    </Row>
    <Row label="Inset strip" wide>
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
    </Row>
    <Row label="Glass surfaces">
        <Switch bind:checked={editor.state.glassSurfaces} aria-label="Glass surfaces" />
    </Row>
</EditorSection>

<EditorSection title="Edges">
    <Row label="Edge highlight">
        <Switch
            bind:checked={() => editor.state.edgeHighlight > 0, editor.setEdgeHighlightEnabled}
            aria-label="Edge highlight"
        />
    </Row>
    {#if editor.state.edgeHighlight > 0}
        <Row label="Strength">
            <span
                class="text-sm tabular-nums text-foreground"
                use:numberShuffle={{
                    value: edgePercent,
                    format: (value) => `${value}%`
                }}
            >
                {`${edgePercent}%`}
            </span>
        </Row>
        <div class="pb-3">
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
        </div>
    {/if}
    <Row label="Primary button border">
        <Switch bind:checked={editor.state.primaryStroke} aria-label="Primary button border" />
    </Row>
</EditorSection>

<EditorSection title="Shadows">
    <Row label="Cards and menus">
        <Switch bind:checked={editor.state.surfaceShadows} aria-label="Cards and menus" />
    </Row>
    <Row label="Controls">
        <Switch bind:checked={editor.state.controlShadows} aria-label="Controls" />
    </Row>
    <Row label="Dialogs and sheets">
        <Switch bind:checked={editor.state.dialogShadows} aria-label="Dialogs and sheets" />
    </Row>
</EditorSection>
