<script lang="ts">
    import {
        buildTokenIndex,
        collectRuleInputs,
        type TokenIndex,
        tokensForElement
    } from '$lib/studio/token-usage';
    import {
        animationTokenDefinitions,
        colorTokenDefinitions,
        spacingTokenDefinitions
    } from '$lib/studio-advanced-tokens';
    import { getThemeEditor } from './context';
    import { createElementPicker, describeElement } from './element-picker.svelte';
    import { createSettingFilter, setSettingFilter } from './setting-filter.svelte';
    import TokenPanel, { PANEL_HEIGHT, PANEL_WIDTH } from './token-panel.svelte';

    let {
        active = $bindable(false),
        container
    }: {
        /** Whether clicking the preview selects an element instead of using it. */
        active?: boolean;
        /** The preview that elements are picked from. */
        container: HTMLElement | undefined;
    } = $props();

    const GAP = 8;
    const editor = getThemeEditor();
    const editable = new Set<string>([
        ...colorTokenDefinitions.map((definition) => definition.name),
        ...spacingTokenDefinitions.map((definition) => definition.name),
        ...animationTokenDefinitions.map((definition) => definition.name)
    ]);

    setSettingFilter(createSettingFilter());

    let index: TokenIndex | undefined;
    let view = $state('color');

    const picker = createElementPicker({
        active: () => active,
        container: () => container,
        onStart: () => {
            index ??= buildTokenIndex(collectRuleInputs(document.styleSheets), editable);
        },
        onPick: select,
        onExit: () => {
            active = false;
        }
    });

    const names = $derived.by(() => {
        void editor.state.appliedRevision;
        if (!picker.selected || !index) {
            return new Set<string>();
        }

        return tokensForElement(index, picker.selected);
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
    const activeView = $derived.by(() => {
        if (sections.some((section) => section.value === view)) {
            return view;
        }

        return sections[0]?.value ?? view;
    });
    const resets = $derived([
        ...colors.map((token) => editor.tokens.colorTokenReset(token.name)),
        ...shapes.map((token) => editor.tokens.spacingTokenReset(token.name)),
        ...motions.map((token) => editor.tokens.animationTokenReset(token.name))
    ]);
    const title = $derived(describeElement(picker.selected, container));
    const parentSelectable = $derived.by(() => {
        const parent = picker.selected?.parentElement?.closest('[data-ui]');

        return Boolean(parent && container?.contains(parent));
    });
    const panel = $derived.by(() => {
        const box = picker.selectedBox;
        if (!box) {
            return null;
        }
        const below = box.top + box.height + GAP;
        const above = Math.min(
            box.top - GAP - PANEL_HEIGHT,
            window.innerHeight - PANEL_HEIGHT - GAP
        );
        const fitsBelow = below + PANEL_HEIGHT <= window.innerHeight - GAP;
        const top = fitsBelow ? below : Math.max(GAP, above);
        const left = Math.max(GAP, Math.min(box.left, window.innerWidth - PANEL_WIDTH - GAP));

        return { top, left };
    });

    function select(element: Element | null) {
        view = activeView;
        picker.select(element);
        if (element && !sections.some((section) => section.value === view)) {
            view = sections[0]?.value ?? 'color';
        }
    }

    function selectParent() {
        select(picker.selected?.parentElement?.closest('[data-ui]') ?? null);
    }
</script>

<!--
    @component
    Lets people click an element in the Studio preview and edit the tokens it uses.
-->

{#if active}
    {#if picker.hoverBox && picker.hovered !== picker.selected}
        <div
            aria-hidden="true"
            class="pointer-events-none fixed z-[90] border-[length:var(--size-hairline)] border-primary/50"
            style:top={`${picker.hoverBox.top}px`}
            style:left={`${picker.hoverBox.left}px`}
            style:width={`${picker.hoverBox.width}px`}
            style:height={`${picker.hoverBox.height}px`}
            style:border-radius={picker.hoverBox.radius}
        ></div>
    {/if}
    {#if picker.selectedBox}
        <div
            aria-hidden="true"
            class="pointer-events-none fixed z-[90] border-[length:var(--size-hairline)] border-primary shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
            style:top={`${picker.selectedBox.top}px`}
            style:left={`${picker.selectedBox.left}px`}
            style:width={`${picker.selectedBox.width}px`}
            style:height={`${picker.selectedBox.height}px`}
            style:border-radius={picker.selectedBox.radius}
        ></div>
    {/if}
    {#if picker.selected && panel}
        <TokenPanel
            bind:view={
                () => activeView,
                (value) => {
                    view = value;
                }
            }
            {title}
            position={panel}
            {sections}
            tokens={{ colors, shapes, motions }}
            {resets}
            {parentSelectable}
            onSelectParent={selectParent}
            onClose={picker.close}
        />
    {/if}
{/if}
