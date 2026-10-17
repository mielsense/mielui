<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { colorTokenGroups } from '$lib/studio-advanced-tokens';
    import {
        backgroundSwatches,
        baseSwatches,
        borderSwatches,
        brandSwatches,
        type FoundationPalette,
        foregroundSwatches,
        onPrimarySwatches,
        secondarySwatches
    } from './config';
    import { getThemeEditor } from './context';
    import { colorRow, colorTokenRow } from './controls.svelte';
    import EditorSection from './section.svelte';
    import { getSettingFilter } from './setting-filter.svelte';

    type FoundationRow = {
        key: keyof FoundationPalette;
        label: string;
        swatches: {
            label: string;
            value: string;
        }[];
    };

    const editor = getThemeEditor();
    const filter = getSettingFilter();
    const chartGroup = colorTokenGroups.find((group) => group.label === 'Charts');
    const tokenTitles: Record<string, string> = {
        Palette: 'Palette',
        Brand: 'Brand tokens',
        Text: 'Text tokens',
        Surfaces: 'Surface tokens',
        Borders: 'Border tokens',
        Status: 'Status tokens'
    };
    const tokenGroups = colorTokenGroups.filter((group) => group.label !== 'Charts');
    const tokenCount = tokenGroups.reduce((count, group) => count + group.tokens.length, 0);
    const chartTokens = chartGroup?.tokens ?? [];
    const onBrandRow: FoundationRow = {
        key: 'onPrimary',
        label: 'On brand',
        swatches: onPrimarySwatches
    };
    const backgroundRows: FoundationRow[] = [
        { key: 'background', label: 'Background', swatches: backgroundSwatches },
        { key: 'base', label: 'Base', swatches: baseSwatches },
        { key: 'secondary', label: 'Secondary', swatches: secondarySwatches },
        { key: 'border', label: 'Border', swatches: borderSwatches }
    ];
    const textRows: FoundationRow[] = [
        { key: 'foreground', label: 'Foreground', swatches: foregroundSwatches },
        { key: 'foregroundMuted', label: 'Muted text', swatches: foregroundSwatches },
        { key: 'buttonForeground', label: 'Button text', swatches: foregroundSwatches }
    ];

    let allTokens = $state(false);
    let chartsOpen = $state(false);

    function sameColor(first: string | undefined, second: string | undefined) {
        return (first ?? '').toLowerCase() === (second ?? '').toLowerCase();
    }

    function resetBrand() {
        const base = editor.baseline.brand[editor.appMode];

        return {
            changed: !sameColor(editor.state.brandColors[editor.appMode], base),
            run: () => {
                editor.updateBrand(base);
            }
        };
    }

    function resetFoundation(key: keyof FoundationPalette) {
        const base = editor.baseline.foundation[editor.appMode][key];

        return {
            changed: !sameColor(editor.state.foundationColors[editor.appMode][key], base),
            run: () => {
                if (base !== undefined) {
                    editor.updateFoundationColor(key, base);
                }
            }
        };
    }
</script>

{#snippet foundationRow(row: FoundationRow)}
    {@render colorRow(
        row.label,
        editor.state.foundationColors[editor.appMode][row.key],
        row.swatches,
        (value) => {
            editor.updateFoundationColor(row.key, value);
        },
        resetFoundation(row.key)
    )}
{/snippet}

<EditorSection title="Brand" keywords="color colour palette accent primary">
    {@render colorRow(
        'Brand',
        editor.state.brandColors[editor.appMode],
        brandSwatches,
        editor.updateBrand,
        resetBrand()
    )}
    {@render foundationRow(onBrandRow)}
</EditorSection>

<EditorSection title="Backgrounds" keywords="color colour palette surface fill">
    {#each backgroundRows as row (row.key)}
        {@render foundationRow(row)}
    {/each}
</EditorSection>

<EditorSection title="Text" keywords="color colour palette foreground">
    {#each textRows as row (row.key)}
        {@render foundationRow(row)}
    {/each}
</EditorSection>

{#snippet disclosure(label: string, count: number, open: boolean, toggle: () => void)}
    <button
        type="button"
        aria-expanded={open}
        class="group flex h-9 w-full items-center justify-between gap-2 rounded-[var(--radius-md)] ps-0.5 pe-2 text-[13px] font-medium text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-expanded:text-foreground motion-reduce:transition-none"
        onclick={toggle}
    >
        {label}
        <span class="flex items-center gap-2">
            <span class="font-mono text-xs tabular-nums">{count}</span>
            <HugeiconsIcon
                icon={ChevronDown}
                size={14}
                aria-hidden="true"
                class="shrink-0 transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] group-aria-expanded:rotate-180 motion-reduce:transition-none"
            />
        </span>
    </button>
{/snippet}

<div class="flex flex-col">
    {#if !filter.active}
        {@render disclosure('Chart colors', chartTokens.length, chartsOpen, () => {
            chartsOpen = !chartsOpen;
        })}
    {/if}
    {#if chartsOpen || filter.active}
        <div class="pb-3">
            <EditorSection title="Charts" keywords="color colour palette data series">
                {#each chartTokens as definition (definition.name)}
                    {@render colorTokenRow(editor.tokens, definition)}
                {/each}
            </EditorSection>
        </div>
    {/if}
    {#if !filter.active}
        {@render disclosure('All color tokens', tokenCount, allTokens, () => {
            allTokens = !allTokens;
        })}
    {/if}
</div>

{#if allTokens || filter.active}
    {#each tokenGroups as group (group.label)}
        <EditorSection
            title={tokenTitles[group.label] ?? group.label}
            keywords="color colour token variable"
        >
            {#each group.tokens as definition (definition.name)}
                {@render colorTokenRow(editor.tokens, definition)}
            {/each}
        </EditorSection>
    {/each}
{/if}
