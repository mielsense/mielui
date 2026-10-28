<script lang="ts">
    import { getStoredLiveThemeCss, hydrateLiveThemeCss } from '@mielui/svelte/themes/live';
    import { ModeWatcher } from 'mode-watcher';
    import CopyPage from '$lib/components/docs/copy-page.svelte';
    import Navigation from '$lib/components/docs/navigation.svelte';
    import { stayOnPage } from '$lib/components/docs/stay-on-page';
    import { setSearch } from '$lib/components/search/context';
    import Header from '$lib/components/shell/header.svelte';
    import { floatingCluster } from '$lib/components/shell/look';
    import ScrollEdge from '$lib/components/shell/scroll-edge.svelte';
    import { fadeYStart, scrollFade } from '$lib/components/shell/scroll-fade';
    import SectionTrail from '$lib/components/shell/section-trail.svelte';
    import { createShell, setShell } from '$lib/components/shell/shell.svelte';
    import Sidebar from '$lib/components/shell/sidebar.svelte';
    import SidebarCard from '$lib/components/shell/sidebar-card.svelte';
    import SidebarTop from '$lib/components/shell/sidebar-top.svelte';
    import { setStudioContext } from '$lib/studio-context';
    import '@mielui/svelte/ui.css';
    import '../app.css';
    import { inject as injectAnalytics } from '@vercel/analytics';
    import { onMount, type Snippet, untrack } from 'svelte';
    import { dev } from '$app/environment';
    import { beforeNavigate, onNavigate } from '$app/navigation';
    import { page, updated } from '$app/state';
    import { createDocsFontState, DEFAULT_FONT, fonts } from '$lib/fonts.svelte';
    import { themeBootScript } from '$lib/theme-boot';

    import type { LayoutData } from './$types';

    const selectedFont = createDocsFontState();
    const studio = $state({ mode: 'components', width: 'wide', glassBackdrop: false });
    setStudioContext(studio);

    const search = $state({ open: false });
    setSearch(search);
    setShell(createShell());

    injectAnalytics({
        mode: dev ? 'development' : 'production',
        framework: 'sveltekit'
    });

    let { children, data }: { children: Snippet; data: LayoutData } = $props();

    const isPreview = $derived(page.url.pathname.startsWith('/preview/'));
    const isHome = $derived(page.url.pathname === '/');
    const isDocs = $derived(page.url.pathname.startsWith('/docs'));
    const isThemeStudio = $derived(page.url.pathname.startsWith('/studio'));

    // `--font-header` defaults to `var(--font-sans)`, so one custom property re-skins every page.
    // Reading `isThemeStudio` re-applies the font after an untouched Studio clears its theme.
    $effect(() => {
        if (isThemeStudio || getStoredLiveThemeCss()) {
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

    let Toaster = $state<typeof import('@mielui/svelte/components/toast').Toaster>();
    let SiteSearch = $state<typeof import('$lib/components/search/palette.svelte').default>();

    function loadSearch() {
        void import('$lib/components/search/palette.svelte').then((module) => {
            SiteSearch = module.default;
        });
    }

    $effect(() => {
        if (search.open) {
            loadSearch();
        }
    });

    function toggleSearch(event: KeyboardEvent) {
        if (
            (event.metaKey || event.ctrlKey) &&
            event.key.toLowerCase() === 'k' &&
            !event.altKey &&
            !event.isComposing
        ) {
            event.preventDefault();
            search.open = !search.open;
        }
    }

    onMount(() => {
        hydrateLiveThemeCss();
    });

    // The browser chrome takes the page color the visitor sees: their chosen mode and any
    // live theme, not only the system preference the static tags in app.html follow.
    $effect(() => {
        const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
        function syncThemeColor() {
            const color = getComputedStyle(document.documentElement).backgroundColor;
            for (const meta of metas) {
                meta.content = color;
            }
        }
        syncThemeColor();
        const observer = new MutationObserver(syncThemeColor);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        observer.observe(document.head, {
            childList: true,
            subtree: true,
            characterData: true
        });
        return () => {
            observer.disconnect();
        };
    });

    // Toasts and search are never needed for the first paint, so they load once the page is idle.
    $effect(() => {
        if (isPreview) {
            return;
        }
        const whenIdle =
            window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, 200));
        whenIdle(() => {
            loadSearch();
            void import('@mielui/svelte/components/toast').then((module) => {
                Toaster = module.Toaster;
            });
        });
    });

    let docsScrollEl = $state<HTMLDivElement>();

    // An open tab keeps running the build it loaded; load the next page in full after a deploy.
    beforeNavigate(({ willUnload, to }) => {
        if (updated.current && !willUnload && to?.url) {
            location.href = to.url.href;
        }
    });

    // The landing page's reveal runs on the first load only; after that pages just appear.
    beforeNavigate(() => {
        document.documentElement.classList.add('revealed');
    });

    // Between the landing page and the docs, the old page fades back, the new one rises, and
    // the brand glides between the header and the sidebar. Docs pages swap without a transition.
    onNavigate((navigation) => {
        const from = navigation.from?.url.pathname;
        const to = navigation.to?.url.pathname;
        const crossesHome = (from === '/') !== (to === '/');
        if (
            !crossesHome ||
            !document.startViewTransition ||
            matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    let scrolledPath = page.url.pathname;

    // Resets before the new page reaches the DOM, so it never paints at the old position.
    $effect.pre(() => {
        const path = page.url.pathname;
        if (path === scrolledPath) {
            return;
        }
        scrolledPath = path;
        if (page.url.hash) {
            return;
        }
        untrack(() => {
            const readingPane =
                docsScrollEl?.querySelector<HTMLElement>('[data-docs-scroll]') ?? docsScrollEl;
            readingPane?.scrollTo({ top: 0, behavior: 'instant' });
        });
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
</script>

<svelte:head>
    <!-- Trusted, built from constants: applies the saved theme before the first paint. -->
    {@html themeBootScript}
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

<svelte:window onkeydown={isPreview ? undefined : toggleSearch} />

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
        {@render children()}
    </main>
{:else if isHome}
    <div class="flex min-h-dvh flex-col bg-background">
        {@render children()}
    </div>
{:else}
    <div
        class="fixed inset-0 isolate flex flex-col overflow-clip bg-background [--docs-content:var(--color-background)] [--docs-pill:var(--color-wash)] [--docs-row-height:calc(var(--spacing)*14)] [--docs-rule:var(--color-border)] [--docs-side:var(--color-background)] [--docs-soft:var(--color-wash)]"
    >
        <div class="lg:hidden">
            <Header starCount={data.starCount ?? null} />
        </div>
        <div class="flex min-h-0 min-w-0 flex-1">
            <Sidebar label="Documentation">
                {#snippet header()}
                    <SidebarTop starCount={data.starCount ?? null} />
                {/snippet}
                <Navigation />
                {#snippet footer()}
                    <SidebarCard />
                {/snippet}
            </Sidebar>
            {#if isThemeStudio}
                {@render children()}
            {:else}
                <main class="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-clip">
                    {#if isDocs}
                        <div bind:this={docsScrollEl} class="min-h-0 min-w-0 flex-1">
                            {@render children()}
                        </div>
                    {:else}
                        <div class="relative min-h-0 min-w-0 flex-1">
                            <div
                                bind:this={docsScrollEl}
                                {@attach scrollFade({ size: 44, target: 'parent' })}
                                class={`h-full overflow-y-auto overscroll-contain ${fadeYStart}`}
                            >
                                <div class="flex justify-center px-5 pt-8 pb-24 sm:px-10 lg:pt-14">
                                    <div
                                        class="flex min-w-0 flex-[0_1_60rem] flex-col gap-5 lg:flex-row lg:gap-0"
                                    >
                                        {@render children()}
                                    </div>
                                    <div
                                        aria-hidden="true"
                                        class="hidden flex-[0_1000_16.5rem] lg:block"
                                    ></div>
                                </div>
                            </div>
                            <ScrollEdge edge="top" />
                            <ScrollEdge edge="bottom" fill />
                        </div>
                    {/if}
                    {#if isDocs && page.status < 400}
                        <div
                            class={`absolute end-4 top-4 z-30 hidden items-center rounded-[calc(var(--radius-control)+var(--spacing)*0.5)] bg-card/80 p-0.5 sm:flex [@media(prefers-reduced-transparency:reduce)]:bg-card ${floatingCluster}`}
                        >
                            <div class="hidden min-w-0 lg:block">
                                <SectionTrail />
                            </div>
                            <CopyPage />
                        </div>
                    {/if}
                </main>
            {/if}
        </div>
    </div>
{/if}
