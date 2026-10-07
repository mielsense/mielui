<script lang="ts">
    import { densities, radiusScales } from '@mielui/svelte/themes/theme';
    import {
        formatPx,
        type SpacingTokenDefinition,
        spacingTokenGroups
    } from '$lib/studio-advanced-tokens';
    import { isDensity, isRadiusScale } from './config';
    import { getThemeEditor } from './context';
    import { selectRow } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();

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

{#snippet tokenRow(definition: SpacingTokenDefinition)}
    <Row
        label={definition.label}
        reset={editor.tokens.spacingTokenReset(definition.name)}
        slider={{
            value: editor.tokens.resolveSpacingToken(definition),
            min: definition.min,
            max: definition.max,
            step: definition.step,
            format: formatPx,
            onValueChange: (value) => {
                editor.tokens.updateAdvancedSpacingToken(definition.name, formatPx(value));
            }
        }}
    />
{/snippet}

<EditorSection title="Corners" keywords="radius rounded shape">
    {@render selectRow(
        'Radius',
        editor.state.theme.radius,
        radiusScales,
        (value) => {
            if (isRadiusScale(value)) {
                editor.state.theme = { ...editor.state.theme, radius: value };
            }
        },
        resetAxis('radius')
    )}
    {#each tokensOf('Corners') as definition (definition.name)}
        {@render tokenRow(definition)}
    {/each}
</EditorSection>

<EditorSection title="Controls" keywords="size height button input shape">
    {#each tokensOf('Controls') as definition (definition.name)}
        {@render tokenRow(definition)}
    {/each}
    {#each tokensOf('Stroke') as definition (definition.name)}
        {@render tokenRow(definition)}
    {/each}
</EditorSection>

<EditorSection title="Spacing" keywords="density padding gap size shape">
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
    {#each tokensOf('Spacing') as definition (definition.name)}
        {@render tokenRow(definition)}
    {/each}
</EditorSection>
