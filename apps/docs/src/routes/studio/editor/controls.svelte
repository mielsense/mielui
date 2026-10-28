<script lang="ts" module>
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import * as ColorPicker from '@mielui/svelte/components/color-picker';
    import * as Select from '@mielui/svelte/components/select';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import {
        type AnimationTokenDefinition,
        type ColorTokenDefinition,
        easingOptions,
        formatCssColor,
        formatPx,
        normalizeEase,
        type SpacingTokenDefinition
    } from '#lib/studio-advanced-tokens.js';
    import { type FontWeight, fontWeights, formatChoice } from './config';
    import Row, { type SettingReset } from './row.svelte';
    import type { ThemeTokenEditor } from './tokens';

    export {
        animationTokenRow,
        colorRow,
        colorTokenRow,
        disclosure,
        easeRow,
        selectRow,
        spacingTokenRow,
        toggleChoice,
        weightRow
    };

    export const selectTrigger = 'h-7 w-auto max-w-44 gap-1.5 px-2 font-medium';

    function toWeight(value: number) {
        return fontWeights.find((weight) => Number(weight) === value);
    }
</script>

{#snippet disclosure(
    label: string,
    open: boolean,
    toggle: () => void,
    count: number | undefined = undefined
)}
    <button
        type="button"
        aria-expanded={open}
        class="group flex h-9 w-full items-center justify-between gap-2 rounded-[var(--radius-md)] ps-3 pe-2 text-[13px] font-medium text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-expanded:text-foreground motion-reduce:transition-none"
        onclick={toggle}
    >
        {label}
        <span class="flex items-center gap-2">
            {#if count !== undefined}
                <span class="font-mono text-xs tabular-nums">{count}</span>
            {/if}
            <HugeiconsIcon
                icon={ChevronDown}
                size={14}
                aria-hidden="true"
                class="shrink-0 transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] group-aria-expanded:rotate-180 motion-reduce:transition-none"
            />
        </span>
    </button>
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
            class="flex gap-0.5"
        >
            {#each values as option (option)}
                <ToggleGroup.Item
                    value={option}
                    onclickcapture={(event) => {
                        if (value === option) {
                            event.preventDefault();
                        }
                    }}
                    class="h-7 min-w-0 px-2.5"
                >
                    {formatChoice(option)}
                </ToggleGroup.Item>
            {/each}
        </ToggleGroup.Root>
    </div>
{/snippet}

{#snippet selectRow(
    label: string,
    value: string,
    options: readonly string[],
    onChange: (value: string) => void,
    reset: SettingReset | undefined = undefined
)}
    <Row {label} {reset}>
        <Select.Root {value} onValueChange={onChange}>
            <Select.Trigger class={selectTrigger} variant="ghost" aria-label={label}>
                <span class="truncate">{formatChoice(value)}</span>
            </Select.Trigger>
            <Select.Content class="min-w-[max(12rem,var(--popover-trigger-width))]">
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
    </Row>
{/snippet}

{#snippet weightRow(
    label: string,
    value: FontWeight,
    onChange: (value: FontWeight) => void,
    reset: SettingReset | undefined = undefined
)}
    <Row
        {label}
        {reset}
        slider={{
            value: Number(value),
            min: 400,
            max: 700,
            step: 100,
            format: String,
            onValueChange: (next) => {
                const weight = toWeight(next);
                if (weight) {
                    onChange(weight);
                }
            }
        }}
    />
{/snippet}

{#snippet colorRow(
    label: string,
    value: string,
    options: {
        label: string;
        value: string;
    }[],
    onChange: (value: string) => void,
    reset: SettingReset | undefined = undefined
)}
    <Row {label} {reset}>
        <div class="min-w-0" role="group" aria-label={`${label} color`}>
            <ColorPicker.Root {value} onValueChange={onChange} {options}>
                <ColorPicker.Trigger
                    variant="ghost"
                    class="h-7 w-auto max-w-44 flex-row-reverse gap-2 px-2 font-medium [&>span:first-child]:size-4"
                />
                <ColorPicker.Content />
            </ColorPicker.Root>
        </div>
    </Row>
{/snippet}

{#snippet easeRow(
    label: string,
    value: string,
    onChange: (value: string) => void,
    reset: SettingReset | undefined = undefined
)}
    <Row {label} {reset}>
        <Select.Root {value} onValueChange={onChange}>
            <Select.Trigger class={selectTrigger} variant="ghost" aria-label={label}>
                <span class="truncate">
                    {easingOptions.find((option) => option.value === value)?.label ?? 'Custom'}
                </span>
            </Select.Trigger>
            <Select.Content class="min-w-[max(12rem,var(--popover-trigger-width))]">
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
    </Row>
{/snippet}

{#snippet colorTokenRow(tokens: ThemeTokenEditor, definition: ColorTokenDefinition)}
    {const resolved = $derived(tokens.resolveColorToken(definition))}
    {@render colorRow(
        definition.label,
        resolved.hex,
        [],
        (hex) => {
            tokens.updateAdvancedColorToken(definition.name, formatCssColor(hex, resolved.alpha));
        },
        tokens.colorTokenReset(definition.name)
    )}
{/snippet}

{#snippet spacingTokenRow(tokens: ThemeTokenEditor, definition: SpacingTokenDefinition)}
    <Row
        label={definition.label}
        reset={tokens.spacingTokenReset(definition.name)}
        slider={{
            value: tokens.resolveSpacingToken(definition),
            min: definition.min,
            max: definition.max,
            step: definition.step,
            format: formatPx,
            onValueChange: (value) => {
                tokens.updateAdvancedSpacingToken(definition.name, formatPx(value));
            }
        }}
    />
{/snippet}

{#snippet animationTokenRow(tokens: ThemeTokenEditor, definition: AnimationTokenDefinition)}
    {#if definition.kind === 'ease'}
        {@render easeRow(
            definition.label,
            tokens.animationEaseValue(definition),
            (value) => {
                tokens.updateAdvancedAnimationToken(definition.name, value);
            },
            tokens.animationTokenReset(definition.name)
        )}
    {:else}
        <Row
            label={definition.label}
            reset={tokens.animationTokenReset(definition.name)}
            slider={{
                value: tokens.animationSliderValue(definition),
                min: definition.min,
                max: definition.max,
                step: definition.step,
                format: (value) => tokens.animationSliderDisplay(definition, value),
                onValueChange: (value) => {
                    tokens.commitAnimationSlider(definition, value);
                }
            }}
        />
    {/if}
{/snippet}
