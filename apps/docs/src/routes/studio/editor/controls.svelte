<script module lang="ts">
    import { Settings01Icon as Settings } from '@hugeicons/core-free-icons';
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { Button } from '@mielui/svelte/components/button';
    import * as ColorPicker from '@mielui/svelte/components/color-picker';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import * as Group from '@mielui/svelte/components/group';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { easingOptions, normalizeEase } from '$lib/studio-advanced-tokens';
    import { type FontWeight, fontWeights, formatChoice } from './config';

    export {
        advancedButton,
        advancedColorField,
        colorPickerControl,
        easeTokenField,
        feelSelect,
        modalDoneFooter,
        sliderTokenField,
        toggleChoice,
        weightControl
    };
</script>

{#snippet advancedButton(label: string, onClick: () => void)}
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button
                variant="outline"
                size="icon"
                class="size-[var(--size-control-md)] shrink-0 rounded-s-none border-s-0 text-foreground-muted"
                onclick={onClick}
                aria-label={label}
            >
                <HugeiconsIcon icon={Settings} size={16} aria-hidden="true" />
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
{/snippet}

{#snippet toggleChoice(
    values: readonly string[],
    value: string,
    label: string,
    onChange: (value: string) => void
)}
    <div role="group" aria-label={label}>
        <ToggleGroup.Root
            type="single"
            bind:value={
                () => value,
                (next) => {
                if (next) {
                    onChange(next);
                }
            }
            }
            class="flex w-full gap-1.5"
        >
            {#each values as option (option)}
                <ToggleGroup.Item
                    value={option}
                    onclickcapture={(event) => {
                        if (value === option) {
                            event.preventDefault();
                        }
                    }}
                    class="min-w-0 flex-1 border border-border bg-background shadow-[var(--elevation-control-edge)] data-[state=on]:border-border-strong data-[state=on]:bg-secondary"
                >
                    {formatChoice(option)}
                </ToggleGroup.Item>
            {/each}
        </ToggleGroup.Root>
    </div>
{/snippet}

{#snippet feelSelect(
        label: string,
        value: string,
        options: readonly string[],
        openAdvanced: () => void,
        onChange: (value: string) => void
    )}
    <div class="flex min-w-0 flex-col gap-2">
        <Typography.Metadata>{label}</Typography.Metadata>
        <Group.Root class="w-full" aria-label={label}>
            <Select.Root {value} onValueChange={onChange}>
                <Select.Trigger
                    class="h-[var(--size-control-md)] min-w-0 flex-1"
                    variant="outline"
                    aria-label={label}
                >
                    <span class="truncate">{formatChoice(value)}</span>
                </Select.Trigger>
                <Select.Content class="min-w-[max(16rem,var(--popover-trigger-width))]">
                    {#each options as option (option)}
                        <Select.Item value={option} label={formatChoice(option)}>
                            {formatChoice(option)}
                        </Select.Item>
                    {/each}
                    {#if !options.includes(value)}
                        <Select.Item {value} label={formatChoice(value)}>
                            {formatChoice(value)}
                        </Select.Item>
                    {/if}
                </Select.Content>
            </Select.Root>
            <Group.Separator />
            {@render advancedButton(`Advanced ${label.toLowerCase()}`, openAdvanced)}
        </Group.Root>
    </div>
{/snippet}

{#snippet weightControl(
        label: string,
        value: FontWeight,
        onChange: (value: FontWeight) => void
    )}
    <div class="flex items-center gap-2" role="group" aria-label={`${label} weight`}>
        <span class="w-[76px] shrink-0 text-[13px] font-medium text-foreground-muted">{label}</span>
        <div class="min-w-0 flex-1">
            {@render toggleChoice(fontWeights, value, `${label} weight`, (next) => {
                if (next === '400' || next === '500' || next === '600' || next === '700') {
                    onChange(next);
                }
            })}
        </div>
    </div>
{/snippet}

{#snippet colorPickerControl(
    label: string,
    value: string,
    options: {
    label: string;
    value: string;
}[],
    onChange: (value: string) => void
)}
    <div class="flex min-w-0 flex-col gap-2" role="group" aria-label={`${label} color`}>
        <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
        <ColorPicker.Root {value} onValueChange={onChange} {options}>
            <ColorPicker.Trigger class="h-[34px] w-full" />
            <ColorPicker.Content />
        </ColorPicker.Root>
    </div>
{/snippet}

{#snippet advancedColorField(label: string, value: string, onChange: (value: string) => void)}
    <div class="flex min-w-0 flex-col gap-2" role="group" aria-label={`${label} color`}>
        <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
        <ColorPicker.Root {value} onValueChange={onChange}>
            <ColorPicker.Trigger class="h-[34px] w-full" />
            <ColorPicker.Content />
        </ColorPicker.Root>
    </div>
{/snippet}

{#snippet sliderTokenField(
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    display: string,
    onChange: (value: number) => void
)}
    <div class="flex min-w-0 flex-col gap-2">
        <div class="flex items-baseline justify-between gap-2">
            <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
            <span
                class="font-mono text-xs tabular-nums text-foreground-muted"
                use:numberShuffle={{ value: Number.parseFloat(display), format: (next) => display.replace(/^-?\d+(?:\.\d+)?/, String(next)) }}
            >
                {display}
            </span>
        </div>
        <Slider {value} {min} {max} {step} {label} class="h-4" onValueChange={onChange} />
    </div>
{/snippet}

{#snippet easeTokenField(label: string, value: string, onChange: (value: string) => void)}
    <div class="flex min-w-0 flex-col gap-2">
        <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
        <Select.Root {value} onValueChange={onChange}>
            <Select.Trigger
                class="h-[34px] min-w-0 px-[9px] text-[13px]"
                variant="outline"
                aria-label={label}
            >
                <span class="truncate">
                    {easingOptions.find((option) => option.value === value)?.label ?? 'Custom'}
                </span>
            </Select.Trigger>
            <Select.Content class="min-w-[max(16rem,var(--popover-trigger-width))]">
                {#each easingOptions as option (option.value)}
                    <Select.Item value={option.value} label={option.label}>
                        {option.label}
                    </Select.Item>
                {/each}
                {#if !easingOptions.some((option) => normalizeEase(option.value) === normalizeEase(value))}
                    <Select.Item {value} label="Custom">Custom</Select.Item>
                {/if}
            </Select.Content>
        </Select.Root>
    </div>
{/snippet}

{#snippet modalDoneFooter()}
    <Dialog.Footer class="shrink-0">
        <Dialog.Close>
            Cancel
            <Kbd shortcut="esc" />
        </Dialog.Close>
        <Dialog.Confirm>
            Done
            <Kbd shortcut="enter" />
        </Dialog.Confirm>
    </Dialog.Footer>
{/snippet}
