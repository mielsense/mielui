<script lang="ts" module>
    /** Whether a setting differs from the preset, and how to put it back. */
    export type SettingReset = {
        changed: boolean;
        run: () => void;
    };

    /** A numeric setting shown as a bar you drag to scrub. */
    export type SettingSlider = {
        value: number;
        min: number;
        max: number;
        step: number;
        format: (value: number) => string;
        onValueChange: (value: number) => void;
    };
</script>

<script lang="ts">
    import { RotateLeft01Icon as Undo } from '@hugeicons/core-free-icons';
    import { Slider } from '@mielui/svelte/components/slider';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { type Snippet, untrack } from 'svelte';
    import { getSettingFilter, getSettingSection } from './setting-filter.svelte';

    let {
        label,
        reset,
        slider,
        children
    }: {
        label: string;
        /** Shows a reset button beside the label while the setting differs from the preset. */
        reset?: SettingReset;
        /** Turns the whole row into a scrub field instead of rendering a control at its end. */
        slider?: SettingSlider;
        children?: Snippet;
    } = $props();

    const bar =
        'rounded-[var(--radius-md)] bg-[var(--docs-soft,color-mix(in_oklab,var(--color-secondary)_55%,transparent))]';
    const filter = getSettingFilter();
    const section = getSettingSection();
    const visible = $derived(
        section?.labelMatch
            ? filter.matches(label)
            : filter.matches(label, section?.title, section?.keywords)
    );

    $effect(() => {
        const name = label;

        return untrack(() => section?.register(name));
    });
</script>

{#snippet resetButton()}
    {#if reset?.changed}
        <Tooltip.Root>
            <Tooltip.Trigger>
                <button
                    type="button"
                    aria-label={`Reset ${label} to the preset`}
                    class="pointer-events-auto grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-foreground/[0.08] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
                    onclick={reset.run}
                >
                    <HugeiconsIcon icon={Undo} size={13} />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Content>Reset to preset</Tooltip.Content>
        </Tooltip.Root>
    {/if}
{/snippet}

{#if visible}
    {#if slider}
        <div data-setting-row class="relative">
            <Slider
                variant="field"
                editable
                {label}
                value={slider.value}
                min={slider.min}
                max={slider.max}
                step={slider.step}
                format={slider.format}
                onValueChange={slider.onValueChange}
                class={`h-9 ${bar}`}
            />
            <span
                class="pointer-events-none absolute inset-y-0 start-3 z-10 flex max-w-[65%] items-center gap-1"
            >
                <span aria-hidden="true" class="invisible min-w-0 truncate text-sm">{label}</span>
                {@render resetButton()}
            </span>
        </div>
    {:else}
        <div
            data-setting-row
            class={`flex min-h-9 items-center justify-between gap-2 ps-3 pe-1 has-[[role=switch]]:pe-2 ${bar}`}
        >
            <span class="flex min-w-0 items-center gap-1">
                <span class="min-w-0 truncate text-sm text-foreground-muted">{label}</span>
                {@render resetButton()}
            </span>
            <div
                class="flex min-w-0 shrink-0 items-center justify-end [&>div]:min-h-0 [&>div]:items-center"
            >
                {@render children?.()}
            </div>
        </div>
    {/if}
{/if}
