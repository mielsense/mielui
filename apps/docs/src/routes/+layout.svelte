<script lang="ts">
    import { Toaster } from '@mielui/svelte/components/toast';
    import { getStoredLiveThemeCss, hydrateLiveThemeCss } from '@mielui/svelte/themes/live';
    import { ModeWatcher } from 'mode-watcher';
    import CopyPage from '$lib/components/docs/copy-page.svelte';
    import Navigation from '$lib/components/docs/navigation.svelte';
    import NavigationSheet from '$lib/components/docs/navigation-sheet.svelte';
    import { stayOnPage } from '$lib/components/docs/stay-on-page';
    import { setSearch } from '$lib/components/search/context';
    import SiteSearch from '$lib/components/search/palette.svelte';
    import Header from '$lib/components/shell/header.svelte';
    import PageDock from '$lib/components/shell/page-dock.svelte';
    import { usesDocsSidebar } from '$lib/components/shell/page-icon';
    import ScrollEdge from '$lib/components/shell/scroll-edge.svelte';
    import { fadeY, scrollFade } from '$lib/components/shell/scroll-fade';
    import SectionTrail from '$lib/components/shell/section-trail.svelte';
    import { createShell, setShell } from '$lib/components/shell/shell.svelte';
    import Sidebar from '$lib/components/shell/sidebar.svelte';
    import SidebarCard from '$lib/components/shell/sidebar-card.svelte';
    import { setStudioContext } from '$lib/studio-context';
    import '@mielui/svelte/ui.css';
    import '../app.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { onMount, type Snippet } from 'svelte';
    import { dev } from '$app/environment';
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import { createDocsFontState, DEFAULT_FONT, fonts } from '$lib/fonts.svelte';

    import type { LayoutData } from './$types';

    const selectedFont = createDocsFontState();
    const studio = $state({ mode: 'components', width: 'wide', glassBackdrop: false });
    setStudioContext(studio);

    const search = $state({ open: false });
    setSearch(search);
    setShell(createShell());

    injectAnalytics({ mode: dev ? 'development' : 'production' });

    const { children, data }: { children: Snippet; data: LayoutData } = $props();

    const isPreview = $derived(page.url.pathname.startsWith('/preview/'));
    const isHome = $derived(page.url.pathname === '/');
    const isDocs = $derived(page.url.pathname.startsWith('/docs'));
    const isThemeStudio = $derived(page.url.pathname.startsWith('/studio'));
    const hasSidebar = $derived(usesDocsSidebar(page.url.pathname));

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
    {#if isPreview}
        <title>Mielui · Preview</title>
    {/if}
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
        content="The Mielui landing page: Svelte UI, your way, beside a live Composer preview."
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={`${data.origin}/og-default.png`} />
    <meta
        name="twitter:image:alt"
        content="The Mielui landing page: Svelte UI, your way, beside a live Composer preview."
    />
</svelte:head>

<ModeWatcher />
{#if !isPreview}
    <Toaster />
    <SiteSearch />
{/if}

{#if isPreview}
    <main
        data-docs-preview
        onclickcapture={stayOnPage}
        class="min-h-dvh bg-[color-mix(in_oklab,var(--color-background),var(--color-secondary)_10%)]"
    >
        {@render children?.()}
    </main>
{:else if isHome}
    <main class="min-h-dvh w-full bg-background">
        {@render children?.()}
    </main>
{:else}
    <main
        class="fixed inset-0 flex flex-col overflow-clip bg-background [--docs-row-height:calc(var(--spacing)*14)] [--docs-content:var(--color-card)] [--docs-pill:var(--color-wash)] [--docs-rule:var(--color-border)] [--docs-side:var(--color-background)] [--docs-soft:var(--color-wash)]"
    >
        <Header starCount={data.starCount ?? null}>
            {#snippet leading()}
                <NavigationSheet />
            {/snippet}
        </Header>
        <div class="flex min-h-0 min-w-0 flex-1 overflow-clip px-1.5 pb-1.5 sm:px-2 sm:pb-2">
            {#if isThemeStudio}
                {@render children?.()}
            {:else}
                {#if hasSidebar}
                    <Sidebar label="Documentation">
                        <Navigation />
                        {#snippet footer()}
                            <SidebarCard />
                        {/snippet}
                    </Sidebar>
                {/if}
                <div
                    data-shell-plate
                    class="mielui-plate relative flex min-h-0 min-w-0 flex-1 flex-col overflow-clip"
                >
                    {#if isDocs}
                        <div bind:this={docsScrollEl} class="min-h-0 min-w-0 flex-1">
                            {@render children?.()}
                        </div>
                    {:else}
                        <div class="relative min-h-0 min-w-0 flex-1">
                            <div
                                bind:this={docsScrollEl}
                                {@attach scrollFade({ size: 44, target: 'parent' })}
                                class={`h-full overflow-y-auto overscroll-contain ${fadeY}`}
                            >
                                <div
                                    class="flex w-full flex-col gap-5 px-5 pt-8 pb-24 sm:px-10 lg:flex-row lg:gap-0"
                                >
                                    {@render children?.()}
                                </div>
                            </div>
                            <ScrollEdge edge="top" />
                            <ScrollEdge edge="bottom" />
                        </div>
                    {/if}
                    {#if isDocs && page.status < 400}
                        <div
                            class="pointer-events-none absolute end-3 top-3 z-30 hidden items-center gap-1 sm:flex [&>*]:pointer-events-auto"
                        >
                            <div class="hidden min-w-0 lg:block">
                                <SectionTrail />
                            </div>
                            <CopyPage />
                        </div>
                    {/if}
                    {#if hasSidebar}
                        <PageDock />
                    {/if}
                </div>
            {/if}
        </div>
    </main>
{/if}
