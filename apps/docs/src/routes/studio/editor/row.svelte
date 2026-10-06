<script lang="ts" module>
    /** Whether a setting differs from the preset, and how to put it back. */
    export type SettingReset = {
        changed: boolean;
        run: () => void;
    };
</script>

<script lang="ts">
    import { RotateLeft01Icon as Undo } from '@hugeicons/core-free-icons';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { type Snippet, untrack } from 'svelte';
    import { getSettingFilter, getSettingSection } from './setting-filter.svelte';

    let {
        label,
        wide = false,
        reset,
        below,
        children
    }: {
        label: string;
        wide?: boolean;
        /** Shows a reset button beside the label while the setting differs from the preset. */
        reset?: SettingReset;
        /** Content tied to this setting, such as its slider, shown on its own line. */
        below?: Snippet;
        children: Snippet;
    } = $props();

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

{#if visible}
    <div data-setting-row class="flex min-h-11 items-center justify-between gap-3">
        <span class="flex min-w-0 items-center gap-1">
            <span class="min-w-0 truncate text-sm text-foreground-muted">{label}</span>
            {#if reset?.changed}
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <button
                            type="button"
                            aria-label={`Reset ${label} to the preset`}
                            class="grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-foreground/[0.08] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
                            onclick={reset.run}
                        >
                            <HugeiconsIcon icon={Undo} size={13} />
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Reset to preset</Tooltip.Content>
                </Tooltip.Root>
            {/if}
        </span>
        <div
            class={wide
                ? 'w-44 min-w-0 shrink-0'
                : 'flex min-w-0 shrink-0 items-center justify-end [&>div]:min-h-0 [&>div]:items-center'}
        >
            {@render children()}
        </div>
    </div>
    {@render below?.()}
{/if}
