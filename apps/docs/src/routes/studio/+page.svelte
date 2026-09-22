<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import AiPreview from './ai-preview.svelte';
    import AppPreview from './app-preview.svelte';
    import ChartPreview from './chart-preview.svelte';
    import ComponentPreview from './component-preview.svelte';
    import ThemeEditor from './theme-editor.svelte';

    let previewMode = $state('components');
    let previewWidth = $state('wide');
</script>

<svelte:head>
    <title>Mielui · Theme Studio</title>
    <meta name="description" content="Build, preview, and export a Mielui theme." />
</svelte:head>

<div data-docs-page class="flex min-h-0 min-w-0 flex-1 flex-col bg-background text-foreground">
    <section aria-label="Theme workspace" class="flex min-h-0 flex-1 bg-background">
        <ThemeEditor />

        <div class="flex min-h-0 min-w-0 flex-1 flex-col gap-3 px-3 pb-3 min-[1100px]:pl-0">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <Tabs.Root bind:value={previewMode} variant="segmented">
                    <div role="group" aria-label="Preview content">
                        <Tabs.List>
                            <Tabs.Trigger value="components">Components</Tabs.Trigger>
                            <Tabs.Trigger value="charts">Charts</Tabs.Trigger>
                            <Tabs.Trigger value="ai">AI components</Tabs.Trigger>
                            <Tabs.Trigger value="app">App preview</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                </Tabs.Root>
                <Tabs.Root bind:value={previewWidth} variant="segmented">
                    <div role="group" aria-label="Preview width">
                        <Tabs.List>
                            <Tabs.Trigger value="wide">Wide</Tabs.Trigger>
                            <Tabs.Trigger value="narrow">Narrow</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                </Tabs.Root>
            </div>
            <div
                class="flex min-h-0 flex-1 justify-center overflow-hidden rounded-[var(--radius-xl)] bg-secondary/30 p-2 sm:p-4"
            >
                <div
                    class={`h-full min-h-0 w-full overflow-hidden font-[var(--font-sans)] text-foreground ${previewWidth === 'narrow' ? 'max-w-[390px]' : 'max-w-none'}`}
                    id="theme-preview"
                >
                    {#if previewMode === 'components'}
                        <ComponentPreview />
                    {:else if previewMode === 'charts'}
                        <ChartPreview />
                    {:else if previewMode === 'ai'}
                        <AiPreview />
                    {/if}
                    <div hidden={previewMode !== 'app'} class="h-full min-h-0">
                        <AppPreview />
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
