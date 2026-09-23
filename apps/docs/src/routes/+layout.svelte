<script lang="ts">
    import { InformationCircleIcon as Info } from '@hugeicons/core-free-icons';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { Toaster } from '@mielui/svelte/components/toast';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { getStoredLiveThemeCss, hydrateLiveThemeCss } from '@mielui/svelte/themes/live';
    import { ModeWatcher } from 'mode-watcher';
    import CopyPage from '$lib/components/docs/copy-page.svelte';
    import DocsPager from '$lib/components/docs/docs-pager.svelte';
    import DocsToolbar from '$lib/components/docs/docs-toolbar.svelte';
    import {
        type PageInfoContext,
        setPageInfoContext
    } from '$lib/components/docs/page-info-context';
    import SideNavbar from '$lib/components/docs/side-navbar.svelte';
    import Logo from '$lib/components/logo.svelte';
    import Navbar from '$lib/components/navbar.svelte';
    import { setSearch } from '$lib/components/search/context';
    import SiteSearch from '$lib/components/search/palette.svelte';
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
    const studio = $state({ mode: 'components', width: 'wide' });
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

    let docsScrollEl = $state<HTMLDivElement>();

    afterNavigate(() => {
        if (window.location.hash) {
            return;
        }
        const readingPane =
            docsScrollEl?.querySelector<HTMLElement>('[data-docs-scroll]') ?? docsScrollEl;
        readingPane?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
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

{#snippet gridJunctions()}
    {#each ['top-[var(--docs-row-height)] -translate-y-1/2', 'bottom-[var(--docs-row-height)] translate-y-1/2'] as row}
        <span
            aria-hidden="true"
            class="pointer-events-none absolute left-[18rem] z-50 hidden size-2 -translate-x-1/2 rounded-[2px] border border-[var(--docs-rule)] bg-[var(--docs-chrome)] lg:block {row}"
        ></span>
        <span
            aria-hidden="true"
            class="pointer-events-none absolute right-[18rem] z-50 hidden size-2 translate-x-1/2 rounded-[2px] border border-[var(--docs-rule)] bg-[var(--docs-chrome)] xl:block {row}"
        ></span>
    {/each}
{/snippet}

{#snippet siteFooter()}
    <footer
        class={`relative flex h-[var(--docs-row-height)] shrink-0 items-center justify-between gap-3 border-t-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] px-4 sm:px-5 text-xs text-foreground-muted ${isDocs ? 'xl:grid xl:grid-cols-[18rem_minmax(0,1fr)_18rem] xl:gap-0 xl:px-0' : 'min-[68.75rem]:grid min-[68.75rem]:grid-cols-[18rem_minmax(0,1fr)] min-[68.75rem]:gap-0 min-[68.75rem]:px-0'}`}
    >
        {#if isDocs}
            <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 left-[18rem] hidden border-r border-[var(--docs-rule)] lg:block"
            ></span>
            <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 right-[18rem] hidden border-r border-[var(--docs-rule)] xl:block"
            ></span>
            <div class="flex justify-start xl:px-5"><DocsPager /></div>
            <div class="flex justify-end xl:px-5"><CopyPage /></div>
            <div class="flex min-w-0 items-center gap-2 xl:px-5">
                {#if pageInfo.current}
                    <HoverCard.Root>
                        <HoverCard.Trigger
                            class="size-8 [margin-inline-start:calc((18px-var(--spacing)*8)/2)] items-center justify-center rounded-[var(--radius-md)] text-foreground-muted hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                        >
                            <HugeiconsIcon icon={Info} size={18} />
                            <span class="sr-only">{`About ${pageInfo.current.title}`}</span>
                        </HoverCard.Trigger>
                        <HoverCard.Content
                            side="top"
                            align="start"
                            class="w-80 max-w-[calc(100vw-2rem)]"
                        >
                            <HoverCard.Title>{pageInfo.current.title}</HoverCard.Title>
                            {#if pageInfo.current.description}
                                <div class="mt-2 text-sm leading-6 text-foreground-muted">
                                    {@render pageInfo.current.description()}
                                </div>
                            {/if}
                        </HoverCard.Content>
                    </HoverCard.Root>
                    <span class="hidden truncate sm:inline">{pageInfo.current.title}</span>
                {/if}
            </div>
        {:else}
            <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 left-[calc(18rem-var(--border-size))] hidden border-r-[length:var(--border-size)] border-[var(--docs-rule)] min-[68.75rem]:block"
            ></span>
            <span class="shrink-0 min-[68.75rem]:px-5">Mielui · Theme Studio</span>
            <div
                class="flex min-w-0 flex-1 items-center justify-end gap-4 min-[68.75rem]:justify-between min-[68.75rem]:pl-3 min-[68.75rem]:pr-5"
            >
                <Tabs.Root bind:value={studio.width} variant="ghost" class="hidden md:block">
                    <div role="group" aria-label="Preview width">
                        <Tabs.List>
                            <Tabs.Trigger value="wide">Wide</Tabs.Trigger>
                            <Tabs.Trigger value="narrow">Narrow</Tabs.Trigger>
                        </Tabs.List>
                    </div>
                </Tabs.Root>
                <nav aria-label="Footer" class="flex items-center gap-5">
                    <a
                        class="hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                        href="/docs/changelog"
                    >
                        Changelog
                    </a>
                    <a
                        class="hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                        href="https://github.com/mielsense/mielui"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </nav>
            </div>
        {/if}
    </footer>
{/snippet}

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
        class={`w-screen [--docs-row-height:calc(var(--spacing)*14+var(--border-size))] [--docs-rule:var(--color-border)] dark:[--docs-rule:color-mix(in_oklab,var(--color-border)_50%,transparent)] [--docs-chrome:color-mix(in_oklab,var(--color-background),var(--color-secondary)_20%)] [--docs-content:color-mix(in_oklab,var(--color-background),var(--color-secondary)_10%)] ${isDocs ? 'h-[100svh] overflow-hidden bg-[var(--docs-content)]' : isThemeStudio ? 'h-[100svh] overflow-hidden bg-[var(--docs-content)]' : isHome ? 'h-[100svh] overflow-hidden bg-[var(--docs-content)]' : 'min-h-screen bg-background p-3'}`}
    >
        {#if isHome}
            <div
                class="relative mx-auto flex h-[100svh] w-full max-w-none flex-col overflow-hidden"
            >
                {@render children?.()}
            </div>
        {:else if isDocs}
            <div class="relative flex h-full w-full flex-col">
                {@render gridJunctions()}
                <div
                    class="flex shrink-0 border-b-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)]"
                >
                    <div
                        class="hidden h-[calc(var(--docs-row-height)-var(--border-size))] w-[18rem] shrink-0 items-center border-r-[length:var(--border-size)] border-[var(--docs-rule)] px-5 lg:flex"
                    >
                        <Logo />
                    </div>
                    <div class="min-w-0 flex-1">
                        <DocsToolbar starCount={data?.starCount ?? null} />
                    </div>
                </div>
                <div class="flex min-h-0 flex-1">
                    <SideNavbar
                        class="hidden h-full w-[18rem] shrink-0 border-r-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)] lg:flex"
                    />
                    <div bind:this={docsScrollEl} class="min-h-0 min-w-0 flex-1 overflow-hidden">
                        {@render children?.()}
                    </div>
                </div>
                {@render siteFooter()}
            </div>
        {:else if isThemeStudio}
            <div
                class="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[var(--docs-content)]"
            >
                {#each ['top-[var(--docs-row-height)] -translate-y-1/2', 'bottom-[var(--docs-row-height)] translate-y-1/2'] as row}
                    <span
                        aria-hidden="true"
                        class="pointer-events-none absolute left-[calc(18rem-var(--border-size))] z-50 hidden size-2 -translate-x-1/2 rounded-[2px] border border-[var(--docs-rule)] bg-[var(--docs-chrome)] min-[68.75rem]:block {row}"
                    ></span>
                {/each}
                <div
                    class="shrink-0 border-b-[length:var(--border-size)] border-[var(--docs-rule)] bg-[var(--docs-chrome)]"
                >
                    <Navbar starCount={data?.starCount ?? null} />
                </div>
                <div class="flex min-h-0 flex-1">
                    {@render children?.()}
                </div>
                {@render siteFooter()}
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
