<script lang="ts">
    import { Toaster } from '@mielui/svelte/components/toast';
    import { getStoredLiveThemeCss, hydrateLiveThemeCss } from '@mielui/svelte/themes/live';
    import { ModeWatcher } from 'mode-watcher';
    import DocsToolbar from '$lib/components/docs/docs-toolbar.svelte';
    import {
        type PageInfoContext,
        setPageInfoContext
    } from '$lib/components/docs/page-info-context';
    import { setSearch } from '$lib/components/search/context';
    import SiteSearch from '$lib/components/search/palette.svelte';
    import SiteFooter from '$lib/components/shell/footer.svelte';
    import StudioHeader from '$lib/components/studio/header.svelte';
    import { setStudioContext } from '$lib/studio-context';
    import '@mielui/svelte/ui.css';
    import '../app.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { onMount, type Snippet } from 'svelte';
    import { dev } from '$app/environment';
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import { createDocsFontState, DEFAULT_FONT, fonts } from '$lib/fonts.svelte';
    import { setupPageTransition } from '$lib/navigation/page-transition';

    import type { LayoutData } from './$types';

    const selectedFont = createDocsFontState();
    const studio = $state({ mode: 'components', width: 'wide', glassBackdrop: false });
    setStudioContext(studio);

    const pageInfo = $state<PageInfoContext>({ current: null });
    setPageInfoContext(pageInfo);
    const search = $state({ open: false });
    setSearch(search);

    injectAnalytics({ mode: dev ? 'development' : 'production' });

    const { children, data }: { children: Snippet; data: LayoutData } = $props();

    const isPreview = $derived(page.url.pathname.startsWith('/preview/'));
    const isHome = $derived(page.url.pathname === '/');
    const isDocs = $derived(page.url.pathname.startsWith('/docs'));
    const isThemeStudio = $derived(page.url.pathname.startsWith('/studio'));

    // `--font-header` defaults to `var(--font-sans)`, so one custom property re-skins every page.
    $effect(() => {
        if (getStoredLiveThemeCss()) {
            document.documentElement.style.removeProperty('--font-sans');
            return;
        }
        const font =
            fonts.find((entry) => entry.name === selectedFont.current) ??
            fonts.find((entry) => entry.name === DEFAULT_FONT);
        if (font) {
            document.documentElement.style.setProperty('--font-sans', font.family);
        }
    });

    onMount(() => {
        hydrateLiveThemeCss();
    });

    setupPageTransition();

    let docsScrollEl = $state<HTMLDivElement>();

    afterNavigate(() => {
        if (window.location.hash) {
            return;
        }
        const readingPane =
            docsScrollEl?.querySelector<HTMLElement>('[data-docs-scroll]') ?? docsScrollEl;
        readingPane?.scrollTo({ top: 0, behavior: 'instant' });
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
</script>

<svelte:head>
    <title>{dev ? 'mielui - Dev' : 'mielui'}</title>
    <link rel="canonical" href={`${data.origin}${page.url.pathname}`} />
    <meta property="og:site_name" content="mielui" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${data.origin}${page.url.pathname}`} />
    <meta property="og:image" content={`${data.origin}/og-default.png`} />
    <meta property="og:image:secure_url" content={`${data.origin}/og-default.png`} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
        property="og:image:alt"
        content="mielui social card showing a polished component library preview."
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={`${data.origin}/og-default.png`} />
    <meta
        name="twitter:image:alt"
        content="mielui social card showing a polished component library preview."
    />
</svelte:head>

<ModeWatcher />
{#if !isPreview}
    <Toaster />
    <SiteSearch />
{/if}

{#if isPreview}
    <main
        class="min-h-dvh bg-[color-mix(in_oklab,var(--color-background),var(--color-secondary)_10%)]"
    >
        {@render children?.()}
    </main>
{:else}
    <main
        class={`w-screen [&:has([data-inspector-pinned=true])]:lg:pl-[calc(var(--spacing)*80+24px)] [--docs-shell:#000000] [--docs-row-height:calc(var(--spacing)*14+var(--border-size))] [--docs-rule:var(--color-border)] dark:[--docs-rule:color-mix(in_oklab,var(--color-border)_50%,transparent)] [--docs-chrome:color-mix(in_oklab,var(--color-secondary)_97%,white)] dark:[--docs-chrome:color-mix(in_oklab,var(--color-background),var(--color-secondary)_20%)] [--docs-content:color-mix(in_oklab,var(--color-background),var(--color-secondary)_10%)] ${isDocs || isThemeStudio ? 'h-[100svh] overflow-hidden bg-[var(--docs-shell)] p-2 sm:p-3' : isHome ? 'min-h-dvh bg-background' : 'min-h-screen bg-background p-3'}`}
    >
        {#if isHome}
            <div class="relative mx-auto flex min-h-dvh w-full max-w-none flex-col">
                {@render children?.()}
            </div>
        {:else if isDocs}
            <div data-docs-shell class="relative flex h-full w-full gap-3">
                <div
                    class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-content)]"
                >
                    <div
                        class="relative z-40 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-linear-to-b after:from-[var(--docs-content)] after:to-transparent flex shrink-0 items-center gap-2 bg-[var(--docs-content)] pr-3"
                    >
                        <div class="min-w-0 flex-1">
                            <DocsToolbar starCount={data?.starCount ?? null} />
                        </div>
                    </div>
                    <div bind:this={docsScrollEl} class="min-h-0 min-w-0 flex-1 overflow-hidden">
                        {@render children?.()}
                    </div>
                    <div class="shrink-0 bg-[var(--docs-content)]">
                        <SiteFooter {isDocs} />
                    </div>
                </div>
            </div>
        {:else if isThemeStudio}
            <div
                data-studio-shell
                class="relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--docs-rule)] bg-[var(--docs-content)]"
            >
                <div class="shrink-0">
                    <StudioHeader starCount={data?.starCount ?? null} />
                </div>
                <div class="flex min-h-0 flex-1">
                    {@render children?.()}
                </div>
                <SiteFooter {isDocs} />
            </div>
        {:else}
            <div class="flex min-h-[calc(100svh-1.5rem)] w-full gap-3">
                <div
                    class="flex min-w-0 flex-1 flex-col overflow-clip rounded-[calc(var(--radius-lg)+0.5rem)] border border-border bg-background"
                >
                    <DocsToolbar starCount={data?.starCount ?? null} />
                    <div
                        bind:this={docsScrollEl}
                        class="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-5 px-4 md:px-6 lg:flex-row lg:gap-0"
                    >
                        {@render children?.()}
                    </div>
                </div>
            </div>
        {/if}
    </main>
{/if}
