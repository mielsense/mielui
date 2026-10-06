<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        Settings01Icon as Settings
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { colorTokenDefinitions } from '$lib/studio-advanced-tokens';
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
    import { colorPickerControl } from './controls.svelte';
    import EditorSection from './section.svelte';
    import { getSettingFilter } from './setting-filter.svelte';

    const editor = getThemeEditor();
    const filter = getSettingFilter();

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

<EditorSection title="Color" keywords="palette colour text chart">
    {#snippet action()}
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Advanced colors"
                    class="shrink-0 text-foreground-muted"
                    onclick={() => {
                        editor.state.colorsModalOpen = true;
                    }}
                >
                    <HugeiconsIcon icon={Settings} size={15} aria-hidden="true" />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Advanced colors</Tooltip.Content>
        </Tooltip.Root>
    {/snippet}
    {@render colorPickerControl(
                        'Brand',
                        editor.state.brandColors[editor.appMode],
                        brandSwatches,
                        editor.updateBrand,
            resetBrand()
        )}
    {@render colorPickerControl(
                        'On brand',
                        editor.state.foundationColors[editor.appMode].onPrimary,
                        onPrimarySwatches,
                        (value) => {
                            editor.updateFoundationColor('onPrimary', value);
                        },
            resetFoundation('onPrimary')
        )}
    {@render colorPickerControl(
                        'Base',
                        editor.state.foundationColors[editor.appMode].base,
                        baseSwatches,
                        (value) => {
                            editor.updateFoundationColor('base', value);
                        },
            resetFoundation('base')
        )}
    {@render colorPickerControl(
                        'Border',
                        editor.state.foundationColors[editor.appMode].border,
                        borderSwatches,
                        (value) => {
                            editor.updateFoundationColor('border', value);
                        },
            resetFoundation('border')
        )}
    {@render colorPickerControl(
                        'Background',
                        editor.state.foundationColors[editor.appMode].background,
                        backgroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('background', value);
                        },
            resetFoundation('background')
        )}
    {@render colorPickerControl(
                        'Secondary',
                        editor.state.foundationColors[editor.appMode].secondary,
                        secondarySwatches,
                        (value) => {
                            editor.updateFoundationColor('secondary', value);
                        },
            resetFoundation('secondary')
        )}
    {#if filter.active}
        {@render textColors()}
    {:else}
        <Collapsible.Root>
            <Collapsible.Trigger
                class="group -mx-2 h-11 w-[calc(100%+var(--spacing)*4)] justify-between text-sm font-normal text-foreground-muted hover:text-foreground data-[state=open]:text-foreground"
            >
                Text colors
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={14}
                    aria-hidden="true"
                    class="shrink-0 transition-transform [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                />
            </Collapsible.Trigger>
            <Collapsible.Content class="flex flex-col">
                {@render textColors()}
            </Collapsible.Content>
        </Collapsible.Root>
    {/if}
    {#if filter.active}
        {@render chartColors()}
    {:else}
        <Collapsible.Root>
            <Collapsible.Trigger
                class="group -mx-2 h-11 w-[calc(100%+var(--spacing)*4)] justify-between text-sm font-normal text-foreground-muted hover:text-foreground data-[state=open]:text-foreground"
            >
                Chart colors
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={14}
                    aria-hidden="true"
                    class="shrink-0 transition-transform [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                />
            </Collapsible.Trigger>
            <Collapsible.Content class="flex flex-col">
                {@render chartColors()}
            </Collapsible.Content>
        </Collapsible.Root>
    {/if}
</EditorSection>

{#snippet textColors()}
    {@render colorPickerControl(
                        'Muted text',
                        editor.state.foundationColors[editor.appMode].foregroundMuted,
                        foregroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('foregroundMuted', value);
                        },
            resetFoundation('foregroundMuted')
        )}
    {@render colorPickerControl(
                        'Foreground',
                        editor.state.foundationColors[editor.appMode].foreground,
                        foregroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('foreground', value);
                        },
            resetFoundation('foreground')
        )}
    {@render colorPickerControl(
                        'Button text',
                        editor.state.foundationColors[editor.appMode].buttonForeground,
                        foregroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('buttonForeground', value);
                        },
            resetFoundation('buttonForeground')
        )}
{/snippet}

{#snippet chartColors()}
    {#each colorTokenDefinitions.filter((definition) => definition.group === 'Charts') as definition (definition.name)}
        {@render colorPickerControl(definition.label, editor.tokens.resolveColorToken(definition).hex, [], (value) => {
                    editor.tokens.updateAdvancedColorToken(definition.name, value);
                })}
    {/each}
{/snippet}
