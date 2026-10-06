<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';
    import {
        type AnimationTokenDefinition,
        animationTokenGroups
    } from '$lib/studio-advanced-tokens';
    import { cursorChoices, isMotionFeel, movementPresets } from './config';
    import { getThemeEditor } from './context';
    import { easeRow, selectRow, toggleChoice } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
    const sectionTitles: Record<string, string> = {
        Speed: 'Speed',
        Movement: 'Entrance',
        Easing: 'Easing'
    };

    function resetAppearance(key: 'travelingHighlight' | 'interactiveCursor') {
        const base = editor.baseline.appearance[key];

        return {
            changed: editor.state[key] !== base,
            run: () => {
                Object.assign(editor.state, { [key]: base });
            }
        };
    }
</script>

{#snippet tokenRow(definition: AnimationTokenDefinition)}
    {#if definition.kind === 'ease'}
        {@render easeRow(
            definition.label,
            editor.tokens.animationEaseValue(definition),
            (value) => {
                editor.tokens.updateAdvancedAnimationToken(definition.name, value);
            },
            editor.tokens.animationTokenReset(definition.name)
        )}
    {:else}
        <Row
            label={definition.label}
            reset={editor.tokens.animationTokenReset(definition.name)}
            slider={{
                value: editor.tokens.animationSliderValue(definition),
                min: definition.min,
                max: definition.max,
                step: definition.step,
                format: (value) => editor.tokens.animationSliderDisplay(definition, value),
                onValueChange: (value) => {
                    editor.tokens.commitAnimationSlider(definition, value);
                }
            }}
        />
    {/if}
{/snippet}

<EditorSection title="Interaction" keywords="motion animation pointer">
    {@render selectRow(
        'Movement',
        editor.state.theme.motion,
        movementPresets,
        (value) => {
            if (isMotionFeel(value)) {
                editor.state.theme = { ...editor.state.theme, motion: value };
            }
        },
        {
            changed: editor.state.theme.motion !== editor.baseline.motion,
            run: () => {
                editor.state.theme = { ...editor.state.theme, motion: editor.baseline.motion };
            }
        }
    )}
    <Row label="Traveling highlight" reset={resetAppearance('travelingHighlight')}>
        <Switch bind:checked={editor.state.travelingHighlight} aria-label="Traveling highlight" />
    </Row>
    <Row label="Hover cursor" reset={resetAppearance('interactiveCursor')}>
        {@render toggleChoice(
            cursorChoices,
            editor.state.interactiveCursor,
            'Hover cursor',
            (value) => {
                if (value === 'default' || value === 'pointer') {
                    editor.state.interactiveCursor = value;
                }
            }
        )}
    </Row>
</EditorSection>

{#each animationTokenGroups as group (group.label)}
    <EditorSection
        title={sectionTitles[group.label] ?? group.label}
        keywords="motion animation duration transition"
    >
        {#each group.tokens as definition (definition.name)}
            {@render tokenRow(definition)}
        {/each}
    </EditorSection>
{/each}
