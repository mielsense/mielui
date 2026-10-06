<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';
    import { cursorChoices, isMotionFeel, movementPresets } from './config';
    import { getThemeEditor } from './context';
    import { feelSelect, toggleChoice } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Interaction">
    {@render feelSelect(
        'Movement',
        editor.state.theme.motion,
        movementPresets,
        () => {
            editor.state.animationModalOpen = true;
        },
        (value) => {
            if (isMotionFeel(value)) {
                editor.state.theme = { ...editor.state.theme, motion: value };
            }
        }
    )}
    <Row label="Traveling highlight">
        <Switch bind:checked={editor.state.travelingHighlight} aria-label="Traveling highlight" />
    </Row>
    <Row label="Hover cursor" wide>
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
