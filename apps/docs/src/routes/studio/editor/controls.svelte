<script module lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';
    import * as Select from '@mielui/svelte/components/select';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import { easingOptions, normalizeEase } from '$lib/studio-advanced-tokens';
    import { type FontWeight, fontWeights, formatChoice } from './config';
    import Row, { type SettingReset } from './row.svelte';

    export { colorRow, easeRow, selectRow, toggleChoice, weightRow };

    const selectTrigger = 'h-7 w-auto max-w-44 gap-1.5 px-2';

    function toWeight(value: number) {
        return fontWeights.find((weight) => Number(weight) === value);
    }
</script>

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
                    class="h-7 w-auto max-w-44 flex-row-reverse gap-2 px-2 [&>span:first-child]:size-4"
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
