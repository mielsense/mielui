<script lang="ts">
    import { densities, radiusScales } from '@mielui/svelte/themes/theme';
    import { spacingTokenGroups } from '$lib/studio-advanced-tokens';
    import { isDensity, isRadiusScale } from './config';
    import { getThemeEditor } from './context';
    import { selectRow, spacingTokenRow } from './controls.svelte';
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

    function tokensOf(label: string) {
        return spacingTokenGroups.find((group) => group.label === label)?.tokens ?? [];
    }

    function resetAxis(axis: 'radius' | 'density') {
        const base = editor.baseline[axis];

        return {
            changed: editor.state.theme[axis] !== base,
            run: () => {
                editor.state.theme = { ...editor.state.theme, [axis]: base };
            }
        };
    }
</script>

{#snippet radiusRow(label: string)}
    {@render selectRow(
        label,
        editor.state.theme.radius,
        radiusScales,
        (value) => {
            if (isRadiusScale(value)) {
                editor.state.theme = { ...editor.state.theme, radius: value };
            }
        },
        resetAxis('radius')
    )}
{/snippet}

{#snippet densityRow()}
    {@render selectRow(
        'Density',
        editor.state.theme.density,
        densities,
        (value) => {
            if (isDensity(value)) {
                editor.state.theme = { ...editor.state.theme, density: value };
            }
        },
        resetAxis('density')
    )}
{/snippet}

{#if essentials}
    {@render radiusRow('Corners')}
    {@render densityRow()}
{:else}
    <EditorSection title="Corners" keywords="radius rounded shape">
        {#if filter.active}
            {@render radiusRow('Radius')}
        {/if}
        {#each tokensOf('Corners') as definition (definition.name)}
            {@render spacingTokenRow(editor.tokens, definition)}
        {/each}
    </EditorSection>

    <EditorSection title="Controls" keywords="size height button input shape">
        {#each tokensOf('Controls') as definition (definition.name)}
            {@render spacingTokenRow(editor.tokens, definition)}
        {/each}
        {#each tokensOf('Stroke') as definition (definition.name)}
            {@render spacingTokenRow(editor.tokens, definition)}
        {/each}
    </EditorSection>

    <EditorSection title="Spacing" keywords="density padding gap size shape">
        {#if filter.active}
            {@render densityRow()}
        {/if}
        {#each tokensOf('Spacing') as definition (definition.name)}
            {@render spacingTokenRow(editor.tokens, definition)}
        {/each}
    </EditorSection>
{/if}
