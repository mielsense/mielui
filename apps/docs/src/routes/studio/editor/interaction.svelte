<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';
    import { animationTokenGroups } from '$lib/studio-advanced-tokens';
    import { cursorChoices, isMotionFeel, movementPresets } from './config';
    import { getThemeEditor } from './context';
    import { animationTokenRow, selectRow, toggleChoice } from './controls.svelte';
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
    const sectionTitles: Record<string, string> = {
        Speed: 'Speed',
        Movement: 'Entrance',
        Easing: 'Easing'
    };
</script>

{#snippet movementRow(label: string)}
    {@render selectRow(
        label,
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
{/snippet}

{#if essentials}
    {@render movementRow('Motion')}
{:else}
    <EditorSection title="Interaction" keywords="motion animation pointer">
        {#if filter.active}
            {@render movementRow('Movement')}
        {/if}
        <Row label="Traveling highlight" reset={editor.appearanceReset('travelingHighlight')}>
            <Switch
                bind:checked={editor.state.travelingHighlight}
                aria-label="Traveling highlight"
            />
        </Row>
        <Row label="Hover cursor" reset={editor.appearanceReset('interactiveCursor')}>
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
                {@render animationTokenRow(editor.tokens, definition)}
            {/each}
        </EditorSection>
    {/each}
{/if}
