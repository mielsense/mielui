<script lang="ts">
    import { densities, radiusScales } from '@mielui/svelte/themes/theme';
    import { isDensity, isRadiusScale } from './config';
    import { getThemeEditor } from './context';
    import { feelSelect } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Shape & spacing" bodyClass="gap-4">
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
                    }
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
                    }
                )}
</EditorSection>
