<script lang="ts">
    import { PaintBoardIcon, RotateLeft01Icon as RotateCcw } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Select from '@mielui/svelte/components/select';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import Sticker from '#lib/components/shell/sticker.svelte';
    import { getThemeEditor } from './context';

    const editor = getThemeEditor();
    const current = $derived(
        builtInThemePresets.find((preset) => preset.slug === editor.state.selectedPreset) ??
            builtInThemePresets[0]
    );

    /** A sticker mesh drawn from one brand color: a light glow at the top, a deep corner below. */
    function brandMesh(brand: string) {
        return [
            `radial-gradient(circle at 20% 15%, color-mix(in oklab, ${brand} 35%, white) 0, transparent 55%)`,
            `radial-gradient(circle at 85% 85%, color-mix(in oklab, ${brand} 70%, black) 0, transparent 60%)`,
            brand
        ].join(', ');
    }
</script>

<div role="group" aria-label="Theme preset" class="flex items-center gap-1">
    <Select.Root bind:value={editor.state.selectedPreset}>
        <Select.Trigger
            variant="ghost"
            class="h-11 min-w-0 flex-1 gap-3 ps-2 pe-2.5"
            aria-label="Theme starting point"
        >
            <span class="flex min-w-0 items-center gap-3">
                <Sticker icon={PaintBoardIcon} mesh={brandMesh(current.brand)} size={28} />
                <span class="flex min-w-0 flex-col items-start gap-1 text-start leading-none">
                    <span class="text-xs text-foreground-muted">Preset</span>
                    <span class="max-w-full truncate text-sm font-medium text-foreground">
                        {current.name}
                    </span>
                </span>
            </span>
        </Select.Trigger>
        <Select.Content class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]">
            {#each builtInThemePresets as preset (preset.slug)}
                <Select.Item value={preset.slug} label={preset.name}>
                    <span
                        aria-hidden="true"
                        class="grain size-4 shrink-0 rounded-[5px]"
                        style:background={brandMesh(preset.brand)}
                    ></span>
                    {preset.name}
                </Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button
                variant="ghost"
                size="icon"
                class="text-foreground-muted hover:text-foreground"
                onclick={editor.resetTheme}
                aria-label="Reset theme to selected preset"
            >
                <HugeiconsIcon icon={RotateCcw} size={15} />
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Reset to selected preset</Tooltip.Content>
    </Tooltip.Root>
</div>
