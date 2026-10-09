<script lang="ts">
    import {
        CursorPointer02Icon,
        Redo02Icon,
        SlidersHorizontalIcon,
        Undo02Icon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Popover from '@mielui/svelte/components/popover';
    import * as Select from '@mielui/svelte/components/select';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { cn } from '@mielui/svelte/utils';
    import Sidebar from '$lib/components/shell/sidebar.svelte';
    import Topbar from '$lib/components/shell/topbar.svelte';
    import { getStudioContext } from '$lib/studio-context';
    import AiPreview from './ai-preview.svelte';
    import AppPreview from './app-preview.svelte';
    import ChartPreview from './chart-preview.svelte';
    import ComponentPreview from './component-preview.svelte';
    import { setThemeEditor } from './editor/context';
    import { createThemeEditor } from './editor/controller.svelte';
    import Inspector from './editor/inspector.svelte';
    import PresetDialog from './editor/preset-dialog.svelte';
    import SharedThemeDialog from './editor/shared-theme-dialog.svelte';
    import TokenPicker from './editor/token-picker.svelte';
    import ExportPanel from './export-panel.svelte';

    const studio = getStudioContext();
    const editor = createThemeEditor();
    setThemeEditor(editor);

    let inspectorOpen = $state(false);
    let picking = $state(false);
    let preview = $state<HTMLDivElement>();
    const previewTabs = [
        { value: 'components', label: 'Components' },
        { value: 'charts', label: 'Charts' },
        { value: 'ai', label: 'AI components' },
        { value: 'app', label: 'App preview' }
    ];
    let appMounted = $state(false);
    $effect(() => {
        if (studio.mode === 'app') {
            appMounted = true;
        }
    });
</script>

<svelte:window
    onkeydown={(event) => {
        const target = event.target;
        const typing =
            target instanceof HTMLElement &&
            (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
        if (typing || !(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'z') {
            return;
        }
        event.preventDefault();
        if (event.shiftKey) {
            editor.history.redo();
        } else {
            editor.history.undo();
        }
    }}
/>

<svelte:head>
    <title>Mielui · Theme Studio</title>
    <meta name="description" content="Build, preview, and export a Mielui theme." />
</svelte:head>

<Sidebar label="Theme configuration" wide>
    <Inspector />
</Sidebar>

<div
    data-docs-page
    class="mielui-inset-frame flex min-h-0 min-w-0 flex-1 flex-col text-foreground shadow-[var(--elevation-1)] [--docs-content:var(--color-background)]"
>
    <h1 class="sr-only">Theme Studio</h1>
    <Topbar>
        {#snippet leading()}
            <div class="lg:hidden">
                <Sheet.Root bind:open={inspectorOpen}>
                    <Sheet.Trigger variant="outline" aria-label="Edit theme">
                        Edit
                        <span class="hidden sm:inline">theme</span>
                    </Sheet.Trigger>
                    <Sheet.Content side="left">
                        <Sheet.Header>
                            <Sheet.Title>Edit theme</Sheet.Title>
                        </Sheet.Header>
                        <div class="-mx-3 flex min-h-0 flex-1 flex-col">
                            <Inspector />
                        </div>
                    </Sheet.Content>
                </Sheet.Root>
            </div>
        {/snippet}
        <div class="min-w-0 flex-1 md:hidden">
            <Select.Root bind:value={studio.mode}>
                <Select.Trigger aria-label="Preview content" class="w-auto max-w-full min-w-0">
                    <span class="truncate">
                        {previewTabs.find((tab) => tab.value === studio.mode)?.label}
                    </span>
                </Select.Trigger>
                <Select.Content>
                    {#each previewTabs as tab (tab.value)}
                        <Select.Item value={tab.value}>{tab.label}</Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
        </div>
        {#snippet actions()}
            <div class="hidden md:block">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            variant={picking ? 'secondary' : 'ghost'}
                            size="icon"
                            aria-label="Edit tokens by clicking an element"
                            aria-pressed={picking}
                            onclick={() => {
                                picking = !picking;
                            }}
                        >
                            <HugeiconsIcon icon={CursorPointer02Icon} size={16} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        {picking ? 'Stop editing tokens' : 'Click an element to edit its tokens'}
                    </Tooltip.Content>
                </Tooltip.Root>
            </div>
            <div role="group" aria-label="History" class="flex items-center">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Undo"
                            disabled={!editor.history.canUndo}
                            onclick={editor.history.undo}
                        >
                            <HugeiconsIcon icon={Undo02Icon} size={16} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        Undo
                        <Kbd shortcut="cmd+Z" />
                    </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Redo"
                            disabled={!editor.history.canRedo}
                            onclick={editor.history.redo}
                        >
                            <HugeiconsIcon icon={Redo02Icon} size={16} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        Redo
                        <Kbd shortcut="shift+cmd+Z" />
                    </Tooltip.Content>
                </Tooltip.Root>
            </div>
            <div class="hidden md:block">
                <Popover.Root placement="bottom-end">
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Popover.Trigger
                                variant="ghost"
                                size="icon"
                                icon={false}
                                aria-label="Preview options"
                            >
                                <HugeiconsIcon icon={SlidersHorizontalIcon} size={16} />
                            </Popover.Trigger>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Preview options</Tooltip.Content>
                    </Tooltip.Root>
                    <Popover.Content class="w-64" surfaceClass="flex flex-col gap-4 p-4">
                        <Popover.Title>Preview</Popover.Title>
                        <div class="flex items-center justify-between gap-3">
                            <span id="studio-preview-width" class="text-sm">Width</span>
                            <Tabs.Root bind:value={studio.width} variant="segmented">
                                <div role="group" aria-labelledby="studio-preview-width">
                                    <Tabs.List>
                                        <Tabs.Trigger value="wide">Wide</Tabs.Trigger>
                                        <Tabs.Trigger value="narrow">Narrow</Tabs.Trigger>
                                    </Tabs.List>
                                </div>
                            </Tabs.Root>
                        </div>
                        <Switch
                            bind:checked={studio.glassBackdrop}
                            label="Glass backdrop"
                            description="A gradient behind the preview, to judge glass surfaces."
                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
        {/snippet}
    </Topbar>
    <section
        aria-label="Theme preview"
        class="mielui-inset-surface relative flex min-h-0 flex-1 justify-center overflow-clip"
    >
        <div
            class="pointer-events-none absolute inset-x-0 bottom-5 z-30 hidden justify-center md:flex"
        >
            <ToggleGroup.Root
                type="single"
                aria-label="Preview content"
                bind:value={
                    () => studio.mode,
                    (next) => {
                        if (next) {
                            studio.mode = next;
                        }
                    }
                }
                class="pointer-events-auto flex gap-0.5 rounded-full border-[length:var(--border-size)] border-border bg-background p-1 shadow-[var(--elevation-float)]"
            >
                {#each previewTabs as tab (tab.value)}
                    <ToggleGroup.Item
                        value={tab.value}
                        onclickcapture={(event) => {
                            if (studio.mode === tab.value) {
                                event.preventDefault();
                            }
                        }}
                        class="h-8 rounded-full px-3.5 text-foreground-muted data-[state=on]:bg-foreground/[0.1] data-[state=on]:text-foreground"
                    >
                        {tab.label}
                    </ToggleGroup.Item>
                {/each}
            </ToggleGroup.Root>
        </div>
        <div
            class={cn(
                'h-full min-h-0 w-full overflow-clip font-[var(--font-sans)] text-foreground [&[data-picking]_*]:cursor-crosshair!',
                studio.width === 'narrow'
                    ? 'max-w-[390px] border-x-[length:var(--border-size)] border-[var(--docs-rule)]'
                    : 'max-w-none',
                studio.glassBackdrop &&
                    'bg-[linear-gradient(135deg,color-mix(in_oklab,var(--chart-1)_28%,transparent),color-mix(in_oklab,var(--chart-2)_22%,transparent)_30%,color-mix(in_oklab,var(--chart-5)_28%,transparent)_65%,color-mix(in_oklab,var(--chart-3)_24%,transparent))]'
            )}
            id="theme-preview"
            bind:this={preview}
            data-picking={picking || undefined}
        >
            {#if studio.mode === 'components'}
                <ComponentPreview />
            {:else if studio.mode === 'charts'}
                <ChartPreview />
            {:else if studio.mode === 'ai'}
                <AiPreview />
            {/if}
            {#if appMounted}
                <div hidden={studio.mode !== 'app'} class="h-full min-h-0">
                    <AppPreview />
                </div>
            {/if}
        </div>
    </section>
</div>

<ExportPanel
    bind:open={editor.state.setupOpen}
    name={editor.state.theme.name}
    css={editor.generatedCss}
    json={editor.generatedJson}
    changes={editor.changes}
/>
<PresetDialog />
<TokenPicker bind:active={picking} container={preview} />
<SharedThemeDialog />
