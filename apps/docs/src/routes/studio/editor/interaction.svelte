<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';
    import { cursorChoices, isMotionFeel, movementPresets } from './config';
    import { getThemeEditor } from './context';
    import { feelSelect, toggleChoice } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();

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

<EditorSection title="Interaction" keywords="motion animation pointer">
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
    <Row label="Hover cursor" wide reset={resetAppearance('interactiveCursor')}>
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
