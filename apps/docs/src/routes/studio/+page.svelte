<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
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

<div data-docs-page class="flex min-h-0 min-w-0 flex-1 flex-col text-foreground">
    <section aria-label="Theme workspace" class="flex min-h-0 flex-1 gap-3">
        <ThemeEditor />

        <div
            class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-[var(--docs-rule)]"
        >
            <div
                class="flex min-h-0 flex-1 justify-center overflow-hidden bg-[var(--docs-content)]"
            >
                <div
                    class={cn('h-full min-h-0 w-full overflow-hidden font-[var(--font-sans)] text-foreground', studio.width === 'narrow' ? 'max-w-[390px] border-x-[length:var(--border-size)] border-[var(--docs-rule)] bg-background' : 'max-w-none', studio.glassBackdrop && 'bg-[linear-gradient(135deg,color-mix(in_oklab,var(--chart-1)_28%,transparent),color-mix(in_oklab,var(--chart-2)_22%,transparent)_30%,color-mix(in_oklab,var(--chart-5)_28%,transparent)_65%,color-mix(in_oklab,var(--chart-3)_24%,transparent))]')}
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
