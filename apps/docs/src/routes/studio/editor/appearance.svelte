<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';
    import { getThemeEditor } from './context';
    import { toggleChoice } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';
    import { getSettingFilter } from './setting-filter.svelte';

    let {
        essentials = false
    }: {
        /** Renders only the rows shown before All settings. */
        essentials?: boolean;
    } = $props();

    const editor = getThemeEditor();
    const filter = getSettingFilter();
    const edgePercent = $derived(Math.round(editor.state.edgeHighlight * 100));
</script>

{#snippet glassRow()}
    <Row label="Glass surfaces" reset={editor.appearanceReset('glassSurfaces')}>
        <Switch bind:checked={editor.state.glassSurfaces} aria-label="Glass surfaces" />
    </Row>
{/snippet}

{#if essentials}
    {@render glassRow()}
{:else}
    <EditorSection title="Surfaces" keywords="glass frame inset">
        <Row label="Borders" reset={editor.appearanceReset('borders')}>
            {@render toggleChoice(['single', 'double'], editor.state.borders, 'Borders', (value) => {
                if (value === 'single' || value === 'double') {
                    editor.state.borders = value;
                }
            })}
        </Row>
        <Row label="Inset strip" reset={editor.appearanceReset('insetPosition')}>
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
        {#if filter.active}
            {@render glassRow()}
        {/if}
    </EditorSection>

    <EditorSection title="Edges" keywords="highlight light rim">
        <Row label="Edge highlight" reset={editor.appearanceReset('edgeHighlight')}>
            <Switch
                bind:checked={() => editor.state.edgeHighlight > 0, editor.setEdgeHighlightEnabled}
                aria-label="Edge highlight"
            />
        </Row>
        {#if editor.state.edgeHighlight > 0}
            <Row
                label="Strength"
                slider={{
                    value: edgePercent,
                    min: 1,
                    max: 100,
                    step: 1,
                    format: (value) => `${value}%`,
                    onValueChange: (value) => {
                        editor.state.edgeHighlight = value / 100;
                    }
                }}
            />
        {/if}
    </EditorSection>

    <EditorSection title="Shadows" keywords="elevation depth">
        <Row label="Cards and menus" reset={editor.appearanceReset('surfaceShadows')}>
            <Switch bind:checked={editor.state.surfaceShadows} aria-label="Cards and menus" />
        </Row>
        <Row label="Controls" reset={editor.appearanceReset('controlShadows')}>
            <Switch bind:checked={editor.state.controlShadows} aria-label="Controls" />
        </Row>
        <Row label="Dialogs and sheets" reset={editor.appearanceReset('dialogShadows')}>
            <Switch bind:checked={editor.state.dialogShadows} aria-label="Dialogs and sheets" />
        </Row>
    </EditorSection>
{/if}
