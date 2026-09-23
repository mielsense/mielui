<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import {
        animationTokenGroups,
        colorTokenGroups,
        formatCssColor,
        formatPx,
        spacingTokenGroups
    } from '$lib/studio-advanced-tokens';
    import { formatChoice } from './config';
    import { getThemeEditor } from './context';
    import { advancedColorField, easeTokenField, sliderTokenField } from './controls.svelte';
    import TokenDialog from './token-dialog.svelte';

    const editor = getThemeEditor();
</script>

<TokenDialog
    bind:open={editor.state.colorsModalOpen}
    title="Colors"
    description="Fine-tune every color token. Changes override the sidebar controls and the selected preset."
>
    <Dialog.Body class="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
        <div class="flex shrink-0 items-center justify-between gap-3">
            <p class="text-sm text-foreground-muted">
                Editing{' '}
                {formatChoice(editor.appMode)} mode
            </p>
            <Tabs.Root bind:value={editor.appModeBinding.value} variant="ghost">
                <Tabs.List>
                    <Tabs.Trigger value="light" class="min-h-7 px-2 py-0 text-xs">
                        Light
                    </Tabs.Trigger>
                    <Tabs.Trigger value="dark" class="min-h-7 px-2 py-0 text-xs">Dark</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
        </div>
        <ScrollArea class="min-h-0 flex-1 pr-2">
            <div class="flex flex-col gap-5 pb-2">
                {#each colorTokenGroups as group (group.label)}
                    <div class="flex flex-col gap-3">
                        <h3 class="text-sm font-semibold tracking-[-0.015em]">
                            {group.label}
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                            {#each group.tokens as definition (definition.name)}
                                {@const resolved = editor.tokens.resolveColorToken(definition)}
                                {@render advancedColorField(
                                            definition.label,
                                            resolved.hex,
                                            (hex) => {
                                                editor.tokens.updateAdvancedColorToken(
                                                    definition.name,
                                                    formatCssColor(hex, resolved.alpha)
                                                );
                                            }
                                        )}
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </ScrollArea>
    </Dialog.Body>
</TokenDialog>
<TokenDialog
    bind:open={editor.state.spacingModalOpen}
    title="Spacing"
    description="Fine-tune spacing, controls, corners, and borders. Changes override the sidebar controls and the selected preset."
>
    <Dialog.Body class="min-h-0 flex-1 overflow-hidden">
        <ScrollArea class="min-h-0 flex-1 pr-2">
            <div class="flex flex-col gap-5 pb-2">
                {#each spacingTokenGroups as group (group.label)}
                    <div class="flex flex-col gap-3">
                        <h3 class="text-sm font-semibold tracking-[-0.015em]">
                            {group.label}
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                            {#each group.tokens as definition (definition.name)}
                                {@const spacingValue =
                                            editor.tokens.resolveSpacingToken(definition)}
                                {@render sliderTokenField(
                                            definition.label,
                                            spacingValue,
                                            definition.min,
                                            definition.max,
                                            definition.step,
                                            formatPx(spacingValue),
                                            (value) => {
                                                editor.tokens.updateAdvancedSpacingToken(
                                                    definition.name,
                                                    formatPx(value)
                                                );
                                            }
                                        )}
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </ScrollArea>
    </Dialog.Body>
</TokenDialog>
<TokenDialog
    bind:open={editor.state.animationModalOpen}
    title="Motion"
    description="Fine-tune speeds and menu versus dialog movement. Changes override the sidebar controls and the selected preset."
>
    <Dialog.Body class="min-h-0 flex-1 overflow-hidden">
        <ScrollArea class="min-h-0 flex-1 pr-2">
            <div class="flex flex-col gap-5 pb-2">
                {#each animationTokenGroups as group (group.label)}
                    <div class="flex flex-col gap-3">
                        <h3 class="text-sm font-semibold tracking-[-0.015em]">
                            {group.label}
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                            {#each group.tokens as definition (definition.name)}
                                {#if definition.kind === 'ease'}
                                    {@render easeTokenField(
                                                definition.label,
                                                editor.tokens.animationEaseValue(definition),
                                                (value) => {
                                                    editor.tokens.updateAdvancedAnimationToken(
                                                        definition.name,
                                                        value
                                                    );
                                                }
                                            )}
                                {:else}
                                    {@const motionValue =
                                                editor.tokens.animationSliderValue(definition)}
                                    {@render sliderTokenField(
                                                definition.label,
                                                motionValue,
                                                definition.min,
                                                definition.max,
                                                definition.step,
                                                editor.tokens.animationSliderDisplay(
                                                    definition,
                                                    motionValue
                                                ),
                                                (value) => {
                                                    editor.tokens.commitAnimationSlider(
                                                        definition,
                                                        value
                                                    );
                                                }
                                            )}
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </ScrollArea>
    </Dialog.Body>
</TokenDialog>
