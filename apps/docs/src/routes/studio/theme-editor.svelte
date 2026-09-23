<script lang="ts">
    import { ColorPickerIcon as Palette, Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import AdvancedDialogs from './editor/advanced-dialogs.svelte';
    import { setThemeEditor } from './editor/context';
    import { createThemeEditor } from './editor/controller.svelte';
    import Inspector from './editor/inspector.svelte';
    import PresetDialog from './editor/preset-dialog.svelte';
    import ThemeSetupDialog from './theme-setup-dialog.svelte';

    const editor = createThemeEditor();
    setThemeEditor(editor);
</script>

<aside
    aria-label="Theme configuration"
    class="hidden min-h-0 w-[18rem] shrink-0 bg-[var(--docs-chrome)] border-r-[length:var(--border-size)] border-[var(--docs-rule,var(--color-border))] min-[68.75rem]:flex min-[68.75rem]:flex-col"
>
    <Inspector />
</aside>

<Sheet.Root>
    <Sheet.Trigger
        class="fixed bottom-16 right-5 z-30 shadow-[var(--elevation-float)] min-[68.75rem]:hidden"
    >
        <HugeiconsIcon icon={Palette} size={15} />
        Customize
    </Sheet.Trigger>
    <Sheet.Content
        side="left"
        class="p-0 min-[68.75rem]:hidden [&_[data-ui=sheet-surface]]:gap-0 [&_[data-ui=sheet-surface]]:p-0"
    >
        <div
            class="flex shrink-0 items-center justify-between gap-3 border-b border-border px-5 py-3"
        >
            <Sheet.Title class="text-sm font-medium">Theme configuration</Sheet.Title>
            <Sheet.Description class="sr-only">
                Configure the live Mielui theme preview.
            </Sheet.Description>
            <Sheet.Close variant="ghost" size="icon" aria-label="Close theme configuration">
                <HugeiconsIcon icon={X} size={16} />
            </Sheet.Close>
        </div>
        <div class="min-h-0 flex-1 overflow-hidden">
            <Inspector />
        </div>
    </Sheet.Content>
</Sheet.Root>

<ThemeSetupDialog bind:open={editor.state.setupOpen} generatedJson={editor.generatedJson} />

<AdvancedDialogs />
<PresetDialog />
