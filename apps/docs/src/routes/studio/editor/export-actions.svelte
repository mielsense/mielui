<script lang="ts">
    import { RotateLeft01Icon as RotateCcw } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Group from '@mielui/svelte/components/group';
    import * as Select from '@mielui/svelte/components/select';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';

    import { getThemeEditor } from './context';

    const editor = getThemeEditor();
</script>

<div
    data-studio-export
    class="relative flex shrink-0 flex-col gap-2 border-0 bg-[var(--docs-chrome,var(--color-card))] p-5"
>
    <Group.Root class="w-full" aria-label="Theme preset">
        <Select.Root bind:value={editor.state.selectedPreset}>
            <Select.Trigger
                class="min-w-0 flex-1"
                variant="outline"
                aria-label="Theme starting point"
            >
                <span class="truncate">
                    {builtInThemePresets.find(
                                    (preset) => preset.slug === editor.state.selectedPreset
                                )?.name ?? 'Default'}
                    · mielui
                </span>
            </Select.Trigger>
            <Select.Content class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]">
                {#each builtInThemePresets as preset (preset.slug)}
                    <Select.Item value={preset.slug} label={preset.name}>
                        {preset.name}
                    </Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
        <Group.Separator />
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button
                    variant="outline"
                    size="icon"
                    class="h-auto w-[calc(var(--size-control-md)-var(--size-hairline))] min-w-0 shrink-0 self-stretch rounded-s-none border-s-0"
                    onclick={editor.resetTheme}
                    aria-label="Reset theme to selected preset"
                >
                    <HugeiconsIcon icon={RotateCcw} size={15} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Reset to selected preset</Tooltip.Content>
        </Tooltip.Root>
    </Group.Root>
    <Button
        onclick={() => {
                    editor.state.setupOpen = true;
                }}
    >
        Use theme
    </Button>
    <Group.Root class="w-full" aria-label="Copy theme">
        <CopyButton
            text={editor.generatedJson}
            label="Copy JSON"
            variant="outline"
            size="md"
            class="min-w-0 flex-1 [&_button]:rounded-e-none [&_button]:border-e-0"
            oncopy={() => editor.acknowledgeCopy('json')}
        >
            {editor.state.copiedKey === 'json' ? 'Copied' : 'Copy JSON'}
        </CopyButton>
        <Group.Separator />
        <CopyButton
            text={editor.generatedCss}
            label="Copy CSS"
            variant="outline"
            size="md"
            class="min-w-0 flex-1 [&_button]:rounded-s-none [&_button]:border-s-0"
            oncopy={() => editor.acknowledgeCopy('css')}
        >
            {editor.state.copiedKey === 'css' ? 'Copied' : 'Copy CSS'}
        </CopyButton>
    </Group.Root>
</div>
