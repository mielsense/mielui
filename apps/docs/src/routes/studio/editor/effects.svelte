<script lang="ts">
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import * as Typography from '@mielui/svelte/components/typography';
    import { cursorChoices } from './config';
    import { getThemeEditor } from './context';
    import { tabChoice } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Effects" bodyClass="gap-3">
    <div class="flex flex-col gap-2">
        <Typography.Metadata>Borders</Typography.Metadata>
        <div role="group" aria-label="Borders">
            <ToggleGroup.Root
                type="single"
                bind:value={
                    () => editor.state.borders,
                    (value) => {
                    if (value === 'single' || value === 'double') {
                        editor.state.borders = value;
                    }
                }
                }
                class="flex w-full gap-1.5"
            >
                {#each ['single', 'double'] as value (value)}
                    <ToggleGroup.Item
                        {value}
                        onclickcapture={(event) => {
                            if (editor.state.borders === value) {
                                event.preventDefault();
                            }
                        }}
                        class="min-w-0 flex-1 border border-border bg-background shadow-[var(--elevation-control-edge)] data-[state=on]:border-border-strong data-[state=on]:bg-secondary"
                    >
                        {value === 'single' ? 'Single' : 'Double'}
                    </ToggleGroup.Item>
                {/each}
            </ToggleGroup.Root>
        </div>
    </div>
    <Switch bind:checked={editor.state.glassSurfaces} label="Glass surfaces" />
    <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between gap-2">
            <Switch
                bind:checked={() => editor.state.edgeHighlight > 0, editor.setEdgeHighlightEnabled}
                label="Edge highlight"
            />
            {#if editor.state.edgeHighlight > 0}
                <span class="font-mono text-xs tabular-nums text-foreground-muted">
                    {Math.round(editor.state.edgeHighlight * 100)}
                    %
                </span>
            {/if}
        </div>
        {#if editor.state.edgeHighlight > 0}
            <div class="ps-[calc(var(--spacing)*13.5)]">
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
            </div>
        {/if}
    </div>
    <Switch bind:checked={editor.state.surfaceShadows} label="Card & menu shadows" />
    <Switch bind:checked={editor.state.controlShadows} label="Control shadows" />
    <Switch bind:checked={editor.state.dialogShadows} label="Dialog shadows" />
    <Switch bind:checked={editor.state.travelingHighlight} label="Traveling highlight" />
    <Switch bind:checked={editor.state.primaryStroke} label="Primary stroke" />
    <div class="flex flex-col gap-2">
        <Typography.Metadata>Hover cursor</Typography.Metadata>
        {@render tabChoice(
                        cursorChoices,
                        editor.state.interactiveCursor,
                        'Hover cursor',
                        (value) => {
                            if (value === 'default' || value === 'pointer') {
                                editor.state.interactiveCursor = value;
                            }
                        }
                    )}
    </div>
</EditorSection>
