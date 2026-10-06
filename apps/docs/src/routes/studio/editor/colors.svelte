<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import {
        type ColorTokenDefinition,
        colorTokenGroups,
        formatCssColor
    } from '$lib/studio-advanced-tokens';
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
    import { colorRow } from './controls.svelte';
    import EditorSection from './section.svelte';
    import { getSettingFilter } from './setting-filter.svelte';

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

    let allTokens = $state(false);

    function sameColor(first: string | undefined, second: string | undefined) {
        return (first ?? '').toLowerCase() === (second ?? '').toLowerCase();
    }

    function resetBrand() {
        const base = editor.baseline.brand[editor.appMode];

        return {
            changed: !sameColor(editor.state.brandColors[editor.appMode], base),
            run: () => editor.updateBrand(base)
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

{#snippet tokenRow(definition: ColorTokenDefinition)}
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

<EditorSection title="Brand" keywords="color colour palette accent primary">
    {@render colorRow(
        'Brand',
        editor.state.brandColors[editor.appMode],
        brandSwatches,
        editor.updateBrand,
        resetBrand()
    )}
    {@render colorRow(
        'On brand',
        editor.state.foundationColors[editor.appMode].onPrimary,
        onPrimarySwatches,
        (value) => {
            editor.updateFoundationColor('onPrimary', value);
        },
        resetFoundation('onPrimary')
    )}
</EditorSection>

<EditorSection title="Backgrounds" keywords="color colour palette surface fill">
    {@render colorRow(
        'Background',
        editor.state.foundationColors[editor.appMode].background,
        backgroundSwatches,
        (value) => {
            editor.updateFoundationColor('background', value);
        },
        resetFoundation('background')
    )}
    {@render colorRow(
        'Base',
        editor.state.foundationColors[editor.appMode].base,
        baseSwatches,
        (value) => {
            editor.updateFoundationColor('base', value);
        },
        resetFoundation('base')
    )}
    {@render colorRow(
        'Secondary',
        editor.state.foundationColors[editor.appMode].secondary,
        secondarySwatches,
        (value) => {
            editor.updateFoundationColor('secondary', value);
        },
        resetFoundation('secondary')
    )}
    {@render colorRow(
        'Border',
        editor.state.foundationColors[editor.appMode].border,
        borderSwatches,
        (value) => {
            editor.updateFoundationColor('border', value);
        },
        resetFoundation('border')
    )}
</EditorSection>

<EditorSection title="Text" keywords="color colour palette foreground">
    {@render colorRow(
        'Foreground',
        editor.state.foundationColors[editor.appMode].foreground,
        foregroundSwatches,
        (value) => {
            editor.updateFoundationColor('foreground', value);
        },
        resetFoundation('foreground')
    )}
    {@render colorRow(
        'Muted text',
        editor.state.foundationColors[editor.appMode].foregroundMuted,
        foregroundSwatches,
        (value) => {
            editor.updateFoundationColor('foregroundMuted', value);
        },
        resetFoundation('foregroundMuted')
    )}
    {@render colorRow(
        'Button text',
        editor.state.foundationColors[editor.appMode].buttonForeground,
        foregroundSwatches,
        (value) => {
            editor.updateFoundationColor('buttonForeground', value);
        },
        resetFoundation('buttonForeground')
    )}
</EditorSection>

<EditorSection title="Charts" keywords="color colour palette data series">
    {#each chartGroup?.tokens ?? [] as definition (definition.name)}
        {@render tokenRow(definition)}
    {/each}
</EditorSection>

{#if !filter.active}
    <button
        type="button"
        aria-expanded={allTokens}
        class="group flex h-9 w-full items-center justify-between gap-2 rounded-[var(--radius-md)] ps-0.5 pe-2 text-[13px] font-medium text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-expanded:text-foreground motion-reduce:transition-none"
        onclick={() => {
            allTokens = !allTokens;
        }}
    >
        All color tokens
        <span class="flex items-center gap-2">
            <span class="font-mono text-xs tabular-nums">{tokenCount}</span>
            <HugeiconsIcon
                icon={ChevronDown}
                size={14}
                aria-hidden="true"
                class="shrink-0 transition-transform [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] group-aria-expanded:rotate-180 motion-reduce:transition-none"
            />
        </span>
    </button>
{/if}

{#if allTokens || filter.active}
    {#each tokenGroups as group (group.label)}
        <EditorSection
            title={tokenTitles[group.label] ?? group.label}
            keywords="color colour token variable"
        >
            {#each group.tokens as definition (definition.name)}
                {@render tokenRow(definition)}
            {/each}
        </EditorSection>
    {/each}
{/if}
