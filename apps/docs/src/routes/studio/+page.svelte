<script lang="ts">
    import { getStudioContext } from '$lib/studio-context';
    import AiPreview from './ai-preview.svelte';
    import AppPreview from './app-preview.svelte';
    import ChartPreview from './chart-preview.svelte';
    import ComponentPreview from './component-preview.svelte';
    import ThemeEditor from './theme-editor.svelte';

    const studio = getStudioContext();
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

<div
    data-docs-page
    class="flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--docs-content)] text-foreground"
>
    <section aria-label="Theme workspace" class="flex min-h-0 flex-1 bg-[var(--docs-content)]">
        <ThemeEditor />

        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <div
                class="flex min-h-0 flex-1 justify-center overflow-hidden bg-[var(--docs-content)]"
            >
                <div
                    class={`h-full min-h-0 w-full overflow-hidden font-[var(--font-sans)] text-foreground ${studio.width === 'narrow' ? 'max-w-[390px] border-x-[length:var(--border-size)] border-[var(--docs-rule)] bg-background' : 'max-w-none'}`}
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
            </div>
        </div>
    </section>
</div>
