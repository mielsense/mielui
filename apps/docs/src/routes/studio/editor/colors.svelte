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
        foregroundSwatches,
        onPrimarySwatches,
        secondarySwatches
    } from './config';
    import { getThemeEditor } from './context';
    import { colorPickerControl } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Color" open bodyClass="gap-4">
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
    <div class="grid grid-cols-2 gap-2">
        {@render colorPickerControl(
                        'Brand',
                        editor.state.brandColors[editor.appMode],
                        brandSwatches,
                        editor.updateBrand
                    )}
        {@render colorPickerControl(
                        'On brand',
                        editor.state.foundationColors[editor.appMode].onPrimary,
                        onPrimarySwatches,
                        (value) => {
                            editor.updateFoundationColor('onPrimary', value);
                        }
                    )}
    </div>
    <div class="grid grid-cols-2 gap-2">
        {@render colorPickerControl(
                        'Base',
                        editor.state.foundationColors[editor.appMode].base,
                        baseSwatches,
                        (value) => {
                            editor.updateFoundationColor('base', value);
                        }
                    )}
        {@render colorPickerControl(
                        'Border',
                        editor.state.foundationColors[editor.appMode].border,
                        borderSwatches,
                        (value) => {
                            editor.updateFoundationColor('border', value);
                        }
                    )}
    </div>
    <div class="grid grid-cols-2 gap-2">
        {@render colorPickerControl(
                        'Background',
                        editor.state.foundationColors[editor.appMode].background,
                        backgroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('background', value);
                        }
                    )}
        {@render colorPickerControl(
                        'Secondary',
                        editor.state.foundationColors[editor.appMode].secondary,
                        secondarySwatches,
                        (value) => {
                            editor.updateFoundationColor('secondary', value);
                        }
                    )}
    </div>
    <Collapsible.Root>
        <Collapsible.Trigger
            class="group -mx-2 w-[calc(100%+var(--spacing)*4)] justify-between text-sm text-foreground-muted hover:text-foreground data-[state=open]:text-foreground"
        >
            Text colors
            <HugeiconsIcon
                icon={ChevronDown}
                size={14}
                aria-hidden="true"
                class="shrink-0 transition-transform [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
            />
        </Collapsible.Trigger>
        <Collapsible.Content class="flex flex-col gap-4 pt-3">
            <div class="grid grid-cols-2 gap-2">
                {@render colorPickerControl(
                        'Muted text',
                        editor.state.foundationColors[editor.appMode].foregroundMuted,
                        foregroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('foregroundMuted', value);
                        }
                    )}
                {@render colorPickerControl(
                        'Foreground',
                        editor.state.foundationColors[editor.appMode].foreground,
                        foregroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('foreground', value);
                        }
                    )}
            </div>
            <div class="grid grid-cols-2 gap-2">
                {@render colorPickerControl(
                        'Button text',
                        editor.state.foundationColors[editor.appMode].buttonForeground,
                        foregroundSwatches,
                        (value) => {
                            editor.updateFoundationColor('buttonForeground', value);
                        }
                    )}
            </div>
        </Collapsible.Content>
    </Collapsible.Root>
    <Collapsible.Root>
        <Collapsible.Trigger
            class="group -mx-2 w-[calc(100%+var(--spacing)*4)] justify-between text-sm text-foreground-muted hover:text-foreground data-[state=open]:text-foreground"
        >
            Chart colors
            <HugeiconsIcon
                icon={ChevronDown}
                size={14}
                aria-hidden="true"
                class="shrink-0 transition-transform [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
            />
        </Collapsible.Trigger>
        <Collapsible.Content class="grid grid-cols-2 gap-x-2 gap-y-4 pt-3">
            {#each colorTokenDefinitions.filter((definition) => definition.group === 'Charts') as definition (definition.name)}
                {@render colorPickerControl(definition.label, editor.tokens.resolveColorToken(definition).hex, [], (value) => {
                    editor.tokens.updateAdvancedColorToken(definition.name, value);
                })}
            {/each}
        </Collapsible.Content>
    </Collapsible.Root>
</EditorSection>
