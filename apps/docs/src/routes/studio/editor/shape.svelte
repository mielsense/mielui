<script lang="ts">
    import { densities, radiusScales } from '@mielui/svelte/themes/theme';
    import { isDensity, isRadiusScale } from './config';
    import { getThemeEditor } from './context';
    import { feelSelect } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();

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

<EditorSection title="Shape and spacing" keywords="corners rounded size padding">
    {@render feelSelect(
                    'Radius',
                    editor.state.theme.radius,
                    radiusScales,
                    () => {
                        editor.state.spacingModalOpen = true;
                    },
                    (value) => {
                        if (isRadiusScale(value)) {
                            editor.state.theme = { ...editor.state.theme, radius: value };
                        }
                    },
        resetAxis('radius')
    )}
    {@render feelSelect(
                    'Density',
                    editor.state.theme.density,
                    densities,
                    () => {
                        editor.state.spacingModalOpen = true;
                    },
                    (value) => {
                        if (isDensity(value)) {
                            editor.state.theme = { ...editor.state.theme, density: value };
                        }
                    },
        resetAxis('density')
    )}
</EditorSection>
