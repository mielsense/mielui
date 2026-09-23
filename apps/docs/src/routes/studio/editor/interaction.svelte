<script lang="ts">
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Typography from '@mielui/svelte/components/typography';
    import { cursorChoices, isMotionFeel, movementPresets } from './config';
    import { getThemeEditor } from './context';
    import { feelSelect, toggleChoice } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Interaction" bodyClass="gap-4">
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
    <Switch bind:checked={editor.state.travelingHighlight} label="Traveling highlight" />
    <div class="flex flex-col gap-2 border-t border-border pt-4">
        <Typography.Metadata>Hover cursor</Typography.Metadata>
        {@render toggleChoice(cursorChoices, editor.state.interactiveCursor, 'Hover cursor', (value) => {
            if (value === 'default' || value === 'pointer') {
                editor.state.interactiveCursor = value;
            }
        })}
    </div>
</EditorSection>
