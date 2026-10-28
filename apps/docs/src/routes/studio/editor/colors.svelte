<script lang="ts">
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
    import { colorRow, colorTokenRow, disclosure } from './controls.svelte';
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

    let {
        essentials = false
    }: {
        /** Renders only the rows shown before All settings. */
        essentials?: boolean;
    } = $props();

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

{#snippet brandRow()}
    {@render colorRow(
        'Brand',
        editor.state.brandColors[editor.appMode],
        brandSwatches,
        editor.updateBrand,
        resetBrand()
    )}
{/snippet}

{#if essentials}
    {@render brandRow()}
{:else}
    <EditorSection title="Brand" keywords="color colour palette accent primary">
        {#if filter.active}
            {@render brandRow()}
        {/if}
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

    <div class="flex flex-col">
        {#if !filter.active}
            {@render disclosure('Chart colors', chartsOpen, () => {
                chartsOpen = !chartsOpen;
            }, chartTokens.length)}
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
            {@render disclosure('All color tokens', allTokens, () => {
                allTokens = !allTokens;
            }, tokenCount)}
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
{/if}
