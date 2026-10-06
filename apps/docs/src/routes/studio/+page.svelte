<script lang="ts">
    import {
        Analytics01Icon,
        BrowserIcon,
        GridViewIcon,
        SparklesIcon
    } from '@hugeicons/core-free-icons';
    import * as Select from '@mielui/svelte/components/select';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { cn } from '@mielui/svelte/utils';
    import MobileActions from '$lib/components/shell/mobile-actions.svelte';
    import { fadeX, scrollFade } from '$lib/components/shell/scroll-fade';
    import Sidebar from '$lib/components/shell/sidebar.svelte';
    import TabPill from '$lib/components/shell/tab-pill.svelte';
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
    import ThemeSetupDialog from './theme-setup-dialog.svelte';

    const studio = getStudioContext();
    const editor = createThemeEditor();
    setThemeEditor(editor);

    let inspectorOpen = $state(false);
    const previewTabs = [
        { value: 'components', label: 'Components', icon: GridViewIcon },
        { value: 'charts', label: 'Charts', icon: Analytics01Icon },
        { value: 'ai', label: 'AI components', icon: SparklesIcon },
        { value: 'app', label: 'App preview', icon: BrowserIcon }
    ];
    let appMounted = $state(false);
    $effect(() => {
        if (studio.mode === 'app') {
            appMounted = true;
        }
    });
</script>

<svelte:head>
    <title>Mielui · Theme Studio</title>
    <meta name="description" content="Build, preview, and export a Mielui theme." />
</svelte:head>

<Sidebar label="Theme configuration" title="Theme Studio" wide>
    <Inspector />
</Sidebar>

<div data-docs-page class="flex min-h-0 min-w-0 flex-1 flex-col text-foreground">
    <h1 class="sr-only">Theme Studio</h1>
    <Topbar>
        {#snippet leading()}
            <div class="lg:hidden">
                <Sheet.Root bind:open={inspectorOpen}>
                    <Sheet.Trigger variant="outline">Edit theme</Sheet.Trigger>
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
        <div
            role="group"
            aria-label="Preview content"
            {@attach scrollFade({ axis: 'x', size: 32 })}
            class={`hide-scrollbar-all hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto p-0.5 md:flex ${fadeX}`}
        >
            {#each previewTabs as tab (tab.value)}
                <TabPill
                    label={tab.label}
                    icon={tab.icon}
                    current={studio.mode === tab.value}
                    onclick={() => {
                        studio.mode = tab.value;
                    }}
                />
            {/each}
        </div>
        <div class="md:hidden">
            <Select.Root bind:value={studio.mode}>
                <Select.Trigger aria-label="Preview content" class="w-auto max-w-full">
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
            <div class="hidden items-center gap-3 pe-1 text-[13px] md:flex">
                <Switch bind:checked={studio.glassBackdrop} label="Glass backdrop" />
                <Tabs.Root bind:value={studio.width} variant="ghost">
                    <div role="group" aria-label="Preview width">
                        <Tabs.List>
                            <Tabs.Trigger value="wide">Wide</Tabs.Trigger>
                            <Tabs.Trigger value="narrow">Narrow</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                </Tabs.Root>
            </div>
            <MobileActions />
        {/snippet}
    </Topbar>
    <section
        aria-label="Theme preview"
        class="flex min-h-0 flex-1 justify-center overflow-clip bg-[var(--docs-soft)]"
    >
        <div
            class={cn(
                'h-full min-h-0 w-full overflow-clip bg-background font-[var(--font-sans)] text-foreground',
                studio.width === 'narrow'
                    ? 'max-w-[390px] border-x-[length:var(--border-size)] border-[var(--docs-rule)]'
                    : 'max-w-none',
                studio.glassBackdrop &&
                    'bg-[linear-gradient(135deg,color-mix(in_oklab,var(--chart-1)_28%,transparent),color-mix(in_oklab,var(--chart-2)_22%,transparent)_30%,color-mix(in_oklab,var(--chart-5)_28%,transparent)_65%,color-mix(in_oklab,var(--chart-3)_24%,transparent))]'
            )}
            id="theme-preview"
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

<ThemeSetupDialog bind:open={editor.state.setupOpen} generatedJson={editor.generatedJson} />
<PresetDialog />
<SharedThemeDialog />
