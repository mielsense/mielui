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

    type AppearanceKey =
        | 'borders'
        | 'insetPosition'
        | 'glassSurfaces'
        | 'edgeHighlight'
        | 'primaryStroke'
        | 'surfaceShadows'
        | 'controlShadows'
        | 'dialogShadows';

    function resetAppearance<Key extends AppearanceKey>(key: Key) {
        const base = editor.baseline.appearance[key];

        return {
            changed: editor.state[key] !== base,
            run: () => {
                Object.assign(editor.state, { [key]: base });
            }
        };
    }
</script>

<EditorSection title="Surfaces" keywords="glass frame inset">
    <Row label="Borders" wide reset={resetAppearance('borders')}>
        {@render toggleChoice(['single', 'double'], editor.state.borders, 'Borders', (value) => {
            if (value === 'single' || value === 'double') {
                editor.state.borders = value;
            }
        })}
    </Row>
    <Row label="Inset strip" wide reset={resetAppearance('insetPosition')}>
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
    <Row label="Glass surfaces" reset={resetAppearance('glassSurfaces')}>
        <Switch bind:checked={editor.state.glassSurfaces} aria-label="Glass surfaces" />
    </Row>
</EditorSection>

<EditorSection title="Edges" keywords="highlight stroke outline">
    <Row label="Edge highlight" reset={resetAppearance('edgeHighlight')}>
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
            {#snippet below()}
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
            {/snippet}
        </Row>
    {/if}
    <Row label="Primary button border" reset={resetAppearance('primaryStroke')}>
        <Switch bind:checked={editor.state.primaryStroke} aria-label="Primary button border" />
    </Row>
</EditorSection>

<EditorSection title="Shadows" keywords="elevation depth">
    <Row label="Cards and menus" reset={resetAppearance('surfaceShadows')}>
        <Switch bind:checked={editor.state.surfaceShadows} aria-label="Cards and menus" />
    </Row>
    <Row label="Controls" reset={resetAppearance('controlShadows')}>
        <Switch bind:checked={editor.state.controlShadows} aria-label="Controls" />
    </Row>
    <Row label="Dialogs and sheets" reset={resetAppearance('dialogShadows')}>
        <Switch bind:checked={editor.state.dialogShadows} aria-label="Dialogs and sheets" />
    </Row>
</EditorSection>
