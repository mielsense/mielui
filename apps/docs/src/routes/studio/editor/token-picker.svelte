<script lang="ts">
    import { Cancel01Icon as Close, ArrowTurnUpIcon as Parent } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';
    import {
        buildTokenIndex,
        collectRuleInputs,
        type TokenIndex,
        tokensForElement
    } from '$lib/studio/token-usage';
    import {
        type AnimationTokenDefinition,
        animationTokenDefinitions,
        type ColorTokenDefinition,
        colorTokenDefinitions,
        formatCssColor,
        formatPx,
        type SpacingTokenDefinition,
        spacingTokenDefinitions
    } from '$lib/studio-advanced-tokens';
    import { getThemeEditor } from './context';
    import { colorRow, easeRow } from './controls.svelte';
    import Row from './row.svelte';
    import { createSettingFilter, setSettingFilter } from './setting-filter.svelte';

    let {
        active = $bindable(false),
        container
    }: {
        /** Whether clicking the preview selects an element instead of using it. */
        active?: boolean;
        /** The preview that elements are picked from. */
        container: HTMLElement | undefined;
    } = $props();

    type Box = {
        top: number;
        left: number;
        width: number;
        height: number;
        radius: string;
    };

    const PANEL_WIDTH = 344;
    const PANEL_HEIGHT = 380;
    const GAP = 8;
    const editor = getThemeEditor();
    const editable = new Set<string>([
        ...colorTokenDefinitions.map((definition) => definition.name),
        ...spacingTokenDefinitions.map((definition) => definition.name),
        ...animationTokenDefinitions.map((definition) => definition.name)
    ]);

    setSettingFilter(createSettingFilter());

    let index: TokenIndex | undefined;
    let hovered = $state<Element | null>(null);
    let selected = $state<Element | null>(null);
    let hoverBox = $state<Box | null>(null);
    let selectedBox = $state<Box | null>(null);
    let view = $state('color');

    const names = $derived.by(() => {
        void editor.state.appliedRevision;
        if (!selected || !index) {
            return new Set<string>();
        }

        return tokensForElement(index, selected);
    });
    const colors = $derived(colorTokenDefinitions.filter((token) => names.has(token.name)));
    const shapes = $derived(spacingTokenDefinitions.filter((token) => names.has(token.name)));
    const motions = $derived(animationTokenDefinitions.filter((token) => names.has(token.name)));
    const sections = $derived(
        [
            { value: 'color', label: 'Color', count: colors.length },
            { value: 'shape', label: 'Shape', count: shapes.length },
            { value: 'motion', label: 'Motion', count: motions.length }
        ].filter((section) => section.count > 0)
    );
    const resets = $derived([
        ...colors.map((token) => editor.tokens.colorTokenReset(token.name)),
        ...shapes.map((token) => editor.tokens.spacingTokenReset(token.name)),
        ...motions.map((token) => editor.tokens.animationTokenReset(token.name))
    ]);
    const overrides = $derived(resets.filter((reset) => reset.changed).length);
    const title = $derived(describe(selected));
    const panel = $derived.by(() => {
        if (!selectedBox) {
            return null;
        }
        const below = selectedBox.top + selectedBox.height + GAP;
        const fitsBelow = below + PANEL_HEIGHT <= window.innerHeight - GAP;
        const top = fitsBelow
            ? below
            : Math.max(
                  GAP,
                  Math.min(
                      selectedBox.top - GAP - PANEL_HEIGHT,
                      window.innerHeight - PANEL_HEIGHT - GAP
                  )
              );
        const left = Math.max(
            GAP,
            Math.min(selectedBox.left, window.innerWidth - PANEL_WIDTH - GAP)
        );

        return { top, left };
    });

    function describe(element: Element | null) {
        if (!(element instanceof HTMLElement)) {
            return { name: '', variant: '', count: 0 };
        }
        const ui = element.dataset.ui ?? '';
        const variant = element.dataset.variant ?? '';
        const words = ui.replaceAll('-', ' ');
        const selector = `[data-ui="${ui}"]${variant ? `[data-variant="${variant}"]` : ''}`;

        return {
            name: words.charAt(0).toUpperCase() + words.slice(1),
            variant,
            count: container?.querySelectorAll(selector).length ?? 0
        };
    }

    function boxOf(element: Element): Box {
        const rect = element.getBoundingClientRect();

        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            radius: getComputedStyle(element).borderRadius
        };
    }

    function pick(target: EventTarget | null) {
        return target instanceof Element ? target.closest('[data-ui]') : null;
    }

    function select(element: Element | null) {
        selected = element;
        if (element && !sections.some((section) => section.value === view)) {
            view = sections[0]?.value ?? 'color';
        }
    }

    function close() {
        selected = null;
        selectedBox = null;
    }

    $effect(() => {
        if (!active || !container) {
            hovered = null;
            close();

            return;
        }
        const preview = container;
        index ??= buildTokenIndex(collectRuleInputs(document.styleSheets), editable);
        let frame = 0;

        function measure() {
            hoverBox = hovered?.isConnected ? boxOf(hovered) : null;
            selectedBox = selected?.isConnected ? boxOf(selected) : null;
            frame = requestAnimationFrame(measure);
        }

        function move(event: PointerEvent) {
            hovered = pick(event.target);
        }

        function leave() {
            hovered = null;
        }

        function block(event: Event) {
            event.preventDefault();
            event.stopPropagation();
        }

        function click(event: MouseEvent) {
            block(event);
            select(pick(event.target));
        }

        function key(event: KeyboardEvent) {
            if (event.key !== 'Escape') {
                return;
            }
            event.preventDefault();
            if (selected) {
                close();
            } else {
                active = false;
            }
        }

        frame = requestAnimationFrame(measure);
        preview.addEventListener('pointermove', move, true);
        preview.addEventListener('pointerleave', leave);
        preview.addEventListener('pointerdown', block, true);
        preview.addEventListener('mousedown', block, true);
        preview.addEventListener('click', click, true);
        window.addEventListener('keydown', key);

        return () => {
            cancelAnimationFrame(frame);
            preview.removeEventListener('pointermove', move, true);
            preview.removeEventListener('pointerleave', leave);
            preview.removeEventListener('pointerdown', block, true);
            preview.removeEventListener('mousedown', block, true);
            preview.removeEventListener('click', click, true);
            window.removeEventListener('keydown', key);
        };
    });

    $effect(() => {
        if (selected && sections.length && !sections.some((section) => section.value === view)) {
            view = sections[0].value;
        }
    });
</script>

<!--
    @component
    Lets people click an element in the Studio preview and edit the tokens it uses.
-->

{#snippet colorToken(definition: ColorTokenDefinition)}
    {const resolved = $derived(editor.tokens.resolveColorToken(definition))}
    {@render colorRow(
        definition.label,
        resolved.hex,
        [],
        (hex) => {
            editor.tokens.updateAdvancedColorToken(
                definition.name,
                formatCssColor(hex, resolved.alpha)
            );
        },
        editor.tokens.colorTokenReset(definition.name)
    )}
{/snippet}

{#snippet shapeToken(definition: SpacingTokenDefinition)}
    <Row
        label={definition.label}
        reset={editor.tokens.spacingTokenReset(definition.name)}
        slider={{
            value: editor.tokens.resolveSpacingToken(definition),
            min: definition.min,
            max: definition.max,
            step: definition.step,
            format: formatPx,
            onValueChange: (value) => {
                editor.tokens.updateAdvancedSpacingToken(definition.name, formatPx(value));
            }
        }}
    />
{/snippet}

{#snippet motionToken(definition: AnimationTokenDefinition)}
    {#if definition.kind === 'ease'}
        {@render easeRow(
            definition.label,
            editor.tokens.animationEaseValue(definition),
            (value) => {
                editor.tokens.updateAdvancedAnimationToken(definition.name, value);
            },
            editor.tokens.animationTokenReset(definition.name)
        )}
    {:else}
        <Row
            label={definition.label}
            reset={editor.tokens.animationTokenReset(definition.name)}
            slider={{
                value: editor.tokens.animationSliderValue(definition),
                min: definition.min,
                max: definition.max,
                step: definition.step,
                format: (value) => editor.tokens.animationSliderDisplay(definition, value),
                onValueChange: (value) => {
                    editor.tokens.commitAnimationSlider(definition, value);
                }
            }}
        />
    {/if}
{/snippet}

{#if active}
    {#if hoverBox && hovered !== selected}
        <div
            aria-hidden="true"
            class="pointer-events-none fixed z-[90] border-[length:var(--size-hairline)] border-primary/50"
            style:top={`${hoverBox.top}px`}
            style:left={`${hoverBox.left}px`}
            style:width={`${hoverBox.width}px`}
            style:height={`${hoverBox.height}px`}
            style:border-radius={hoverBox.radius}
        ></div>
    {/if}
    {#if selectedBox}
        <div
            aria-hidden="true"
            class="pointer-events-none fixed z-[90] border-[length:var(--size-hairline)] border-primary shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
            style:top={`${selectedBox.top}px`}
            style:left={`${selectedBox.left}px`}
            style:width={`${selectedBox.width}px`}
            style:height={`${selectedBox.height}px`}
            style:border-radius={selectedBox.radius}
        ></div>
    {/if}
    {#if selected && panel}
        <section
            aria-label={`${title.name} tokens`}
            class="mielui-inset-frame fixed z-[95] flex max-h-[var(--panel-height)] w-[var(--panel-width)] flex-col shadow-[var(--elevation-float)]"
            style:--panel-width={`${PANEL_WIDTH}px`}
            style:--panel-height={`${PANEL_HEIGHT}px`}
            style:top={`${panel.top}px`}
            style:left={`${panel.left}px`}
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
                                disabled={!selected.parentElement?.closest('[data-ui]') ||
                                    !container?.contains(
                                        selected.parentElement.closest('[data-ui]')
                                    )}
                                onclick={() => {
                                    select(selected?.parentElement?.closest('[data-ui]') ?? null);
                                }}
                            >
                                <HugeiconsIcon icon={Parent} size={15} />
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Select parent</Tooltip.Content>
                    </Tooltip.Root>
                    <Button variant="ghost" size="icon" aria-label="Close" onclick={close}>
                        <HugeiconsIcon icon={Close} size={15} />
                    </Button>
                </header>
                {#if sections.length === 0}
                    <p class="m-0 px-4 pt-2 pb-5 text-sm text-foreground-muted">
                        This part has no tokens of its own. Select its parent to edit the tokens
                        around it.
                    </p>
                {:else}
                    <Tabs.Root
                        bind:value={view}
                        variant="ghost"
                        class="flex min-h-0 flex-1 flex-col"
                    >
                        {#if sections.length > 1}
                            <Tabs.List class="shrink-0 px-3 pt-1">
                                {#each sections as section (section.value)}
                                    <Tabs.Trigger value={section.value}
                                        >{section.label}</Tabs.Trigger
                                    >
                                {/each}
                            </Tabs.List>
                        {/if}
                        <FadeScrollArea class="min-h-0 flex-1" start hideScrollbar>
                            <div class="flex flex-col gap-1.5 px-3 pt-2 pb-3">
                                {#if view === 'color'}
                                    {#each colors as definition (definition.name)}
                                        {@render colorToken(definition)}
                                    {/each}
                                {:else if view === 'shape'}
                                    {#each shapes as definition (definition.name)}
                                        {@render shapeToken(definition)}
                                    {/each}
                                {:else}
                                    {#each motions as definition (definition.name)}
                                        {@render motionToken(definition)}
                                    {/each}
                                {/if}
                            </div>
                        </FadeScrollArea>
                    </Tabs.Root>
                {/if}
            </div>
            <footer class="flex shrink-0 items-center justify-between gap-3 px-3 py-1.5">
                <span class="text-xs text-foreground-muted">
                    {overrides === 0
                        ? 'No overrides'
                        : `${overrides} ${overrides === 1 ? 'override' : 'overrides'}`}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={overrides === 0}
                    onclick={() => {
                        for (const reset of resets) {
                            if (reset.changed) {
                                reset.run();
                            }
                        }
                    }}
                >
                    Reset
                </Button>
            </footer>
        </section>
    {/if}
{/if}
