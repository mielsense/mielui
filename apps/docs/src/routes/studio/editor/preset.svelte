<script lang="ts">
    import { RotateLeft01Icon as RotateCcw } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import * as Select from '@mielui/svelte/components/select';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import { getThemeEditor } from './context';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Theme" keywords="preset reset starting point">
    <Row label="Preset" wide>
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
                    </span>
                </Select.Trigger>
                <Select.Content class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]">
                    {#each builtInThemePresets as preset (preset.slug)}
                        <Select.Item value={preset.slug} label={preset.name}>
                            <span
                                aria-hidden="true"
                                class="size-3 shrink-0 rounded-full ring-1 ring-foreground/10 ring-inset"
                                style:background-color={preset.brand}
                            ></span>
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
    </Row>
</EditorSection>
