<script lang="ts">
    import { Toaster } from '@mielui/svelte/components/toast';
    import { getStoredLiveThemeCss, hydrateLiveThemeCss } from '@mielui/svelte/themes/live';
    import { ModeWatcher } from 'mode-watcher';
    import { getBreadcrumbs } from '$lib/components/docs/breadcrumbs';
    import CopyPage from '$lib/components/docs/copy-page.svelte';
    import Navigation from '$lib/components/docs/navigation.svelte';
    import NavigationSheet from '$lib/components/docs/navigation-sheet.svelte';
    import { stayOnPage } from '$lib/components/docs/stay-on-page';
    import { setSearch } from '$lib/components/search/context';
    import SiteSearch from '$lib/components/search/palette.svelte';
    import MobileActions from '$lib/components/shell/mobile-actions.svelte';
    import { pageIcon, usesDocsSidebar } from '$lib/components/shell/page-icon';
    import PageTabs from '$lib/components/shell/page-tabs.svelte';
    import Rail from '$lib/components/shell/rail.svelte';
    import ScrollEdge from '$lib/components/shell/scroll-edge.svelte';
    import { fadeY, scrollFade } from '$lib/components/shell/scroll-fade';
    import SectionTrail from '$lib/components/shell/section-trail.svelte';
    import { createShell, setShell } from '$lib/components/shell/shell.svelte';
    import Sidebar from '$lib/components/shell/sidebar.svelte';
    import SidebarCard from '$lib/components/shell/sidebar-card.svelte';
    import StatusBar from '$lib/components/shell/status-bar.svelte';
    import TabPill from '$lib/components/shell/tab-pill.svelte';
    import Topbar from '$lib/components/shell/topbar.svelte';
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
    const pageLabel = $derived(getBreadcrumbs(page.url.pathname).at(-1)?.label ?? 'mielui');

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
    <main
        class="min-h-dvh w-screen bg-background [--docs-rule:color-mix(in_oklab,var(--color-border)_62%,transparent)] [--docs-soft:color-mix(in_oklab,var(--color-secondary)_55%,var(--color-background))]"
    >
        <div class="relative mx-auto flex min-h-dvh w-full max-w-none flex-col">
            {@render children?.()}
        </div>
    </main>
{:else}
    <main
        class="fixed inset-0 flex overflow-clip bg-[var(--docs-content)] [--docs-row-height:calc(var(--spacing)*14)] [--docs-rule:color-mix(in_oklab,var(--color-border)_62%,transparent)] [--docs-content:var(--color-card)] [--docs-chrome:color-mix(in_oklab,var(--color-secondary)_97%,white)] [--docs-side:var(--color-background)] [--docs-soft:color-mix(in_oklab,var(--color-secondary)_55%,var(--color-background))] [--docs-pill:color-mix(in_oklab,var(--color-secondary)_62%,var(--color-background))] dark:[--docs-content:color-mix(in_oklab,var(--color-card)_60%,var(--color-background))] dark:[--docs-side:var(--docs-content)] dark:[--docs-chrome:color-mix(in_oklab,var(--color-background),var(--color-secondary)_20%)] dark:[--docs-soft:color-mix(in_oklab,var(--color-secondary)_55%,var(--color-card))] dark:[--docs-pill:color-mix(in_oklab,var(--color-secondary)_80%,var(--color-card))]"
    >
        <Rail />
        <div class="flex min-h-0 min-w-0 flex-1 overflow-clip">
            {#if isThemeStudio}
                {@render children?.()}
            {:else}
                {#if hasSidebar}
                    <Sidebar label="Documentation" title="Documentation">
                        <Navigation />
                        {#snippet footer()}
                            <SidebarCard />
                        {/snippet}
                    </Sidebar>
                {/if}
                <div class="flex min-h-0 min-w-0 flex-1 flex-col">
                    <Topbar sidebar={hasSidebar}>
                        {#snippet leading()}
                            <NavigationSheet />
                        {/snippet}
                        {#if hasSidebar}
                            <PageTabs />
                        {:else}
                            <span
                                class="min-w-0 truncate text-sm font-medium text-foreground sm:hidden"
                            >
                                {pageLabel}
                            </span>
                            <div class="hidden sm:block">
                                <TabPill
                                    current
                                    label={pageLabel}
                                    icon={pageIcon(page.url.pathname)}
                                    href={page.url.pathname}
                                />
                            </div>
                        {/if}
                        {#snippet actions()}
                            {#if isDocs && page.status < 400}
                                <div class="hidden min-w-0 md:block">
                                    <SectionTrail />
                                </div>
                                <div class="hidden sm:block">
                                    <CopyPage />
                                </div>
                            {/if}
                            <MobileActions />
                        {/snippet}
                    </Topbar>
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
                                    class="flex w-full flex-col gap-5 px-5 pt-8 pb-16 sm:px-10 lg:flex-row lg:gap-0"
                                >
                                    {@render children?.()}
                                </div>
                            </div>
                            <ScrollEdge edge="top" />
                            <ScrollEdge edge="bottom" />
                        </div>
                    {/if}
                    <StatusBar />
                </div>
            {/if}
        </div>
    </main>
{/if}
