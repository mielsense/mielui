<script lang="ts" module>
    export const PANEL_WIDTH = 344;
    export const PANEL_HEIGHT = 380;
</script>

<script lang="ts">
    import { Cancel01Icon as Close, ArrowTurnUpIcon as Parent } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import FadeScrollArea from '#lib/components/shell/fade-scroll-area.svelte';
    import type {
        AnimationTokenDefinition,
        ColorTokenDefinition,
        SpacingTokenDefinition
    } from '#lib/studio-advanced-tokens.js';
    import { getThemeEditor } from './context';
    import { animationTokenRow, colorTokenRow, spacingTokenRow } from './controls.svelte';
    import type { SettingReset } from './row.svelte';

    let {
        view = $bindable(),
        title,
        position,
        sections,
        tokens,
        resets,
        parentSelectable,
        onSelectParent,
        onClose
    }: {
        /** The open token group: `color`, `shape`, or `motion`. */
        view: string;
        title: {
            name: string;
            variant: string;
            count: number;
        };
        position: {
            top: number;
            left: number;
        };
        /** The token groups the selected part uses, which become tabs when there are several. */
        sections: {
            value: string;
            label: string;
        }[];
        tokens: {
            colors: ColorTokenDefinition[];
            shapes: SpacingTokenDefinition[];
            motions: AnimationTokenDefinition[];
        };
        resets: SettingReset[];
        parentSelectable: boolean;
        onSelectParent: () => void;
        onClose: () => void;
    } = $props();

    const editor = getThemeEditor();

    const overrides = $derived(resets.filter((reset) => reset.changed).length);
    const overridesLabel = $derived.by(() => {
        if (overrides === 0) {
            return 'No overrides';
        }
        if (overrides === 1) {
            return '1 override';
        }

        return `${overrides} overrides`;
    });

    function resetAll() {
        for (const reset of resets) {
            if (reset.changed) {
                reset.run();
            }
        }
    }
</script>

<!--
    @component
    The floating panel that edits the tokens used by the part picked in the Studio preview.
-->

<section
    aria-label={`${title.name} tokens`}
    class="mielui-inset-frame fixed z-[95] flex max-h-[var(--panel-height)] w-[var(--panel-width)] flex-col shadow-[var(--elevation-float)]"
    style:--panel-width={`${PANEL_WIDTH}px`}
    style:--panel-height={`${PANEL_HEIGHT}px`}
    style:top={`${position.top}px`}
    style:left={`${position.left}px`}
>
    <div class="mielui-inset-surface flex min-h-0 flex-1 flex-col overflow-hidden">
        <header class="flex shrink-0 items-center gap-2 ps-4 pe-2 pt-2">
            <div class="flex min-w-0 flex-1 items-baseline gap-2">
                <h3 class="m-0 truncate text-[15px] font-medium text-foreground">
                    {title.name}
                </h3>
                <p class="m-0 truncate text-xs text-foreground-muted">
                    {title.variant ? `${title.variant} · ` : ''}{title.count}
                    on screen
                </p>
            </div>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Select parent"
                        disabled={!parentSelectable}
                        onclick={onSelectParent}
                    >
                        <HugeiconsIcon icon={Parent} size={15} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Select parent</Tooltip.Content>
            </Tooltip.Root>
            <Button variant="ghost" size="icon" aria-label="Close" onclick={onClose}>
                <HugeiconsIcon icon={Close} size={15} />
            </Button>
        </header>
        {#if sections.length === 0}
            <p class="m-0 px-4 pt-2 pb-5 text-sm text-foreground-muted">
                This part has no tokens of its own. Select its parent to edit the tokens around it.
            </p>
        {:else}
            <Tabs.Root bind:value={view} variant="ghost" class="flex min-h-0 flex-1 flex-col">
                {#if sections.length > 1}
                    <Tabs.List class="shrink-0 px-3 pt-1">
                        {#each sections as section (section.value)}
                            <Tabs.Trigger value={section.value}>{section.label}</Tabs.Trigger>
                        {/each}
                    </Tabs.List>
                {/if}
                <FadeScrollArea class="min-h-0 flex-1" start hideScrollbar>
                    <div class="flex flex-col gap-1.5 px-3 pt-2 pb-3">
                        {#if view === 'color'}
                            {#each tokens.colors as definition (definition.name)}
                                {@render colorTokenRow(editor.tokens, definition)}
                            {/each}
                        {:else if view === 'shape'}
                            {#each tokens.shapes as definition (definition.name)}
                                {@render spacingTokenRow(editor.tokens, definition)}
                            {/each}
                        {:else}
                            {#each tokens.motions as definition (definition.name)}
                                {@render animationTokenRow(editor.tokens, definition)}
                            {/each}
                        {/if}
                    </div>
                </FadeScrollArea>
            </Tabs.Root>
        {/if}
    </div>
    <footer class="flex shrink-0 items-center justify-between gap-3 px-3 py-1.5">
        <span class="text-xs text-foreground-muted">
            {overridesLabel}
        </span>
        <Button variant="ghost" size="sm" disabled={overrides === 0} onclick={resetAll}>
            Reset
        </Button>
    </footer>
</section>
