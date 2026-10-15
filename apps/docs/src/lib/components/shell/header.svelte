<script lang="ts">
    import { GithubIcon as Github, Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import Logo from '$lib/components/logo.svelte';
    import { getSearch } from '$lib/components/search/context';
    import { formatStarCount, GITHUB_URL } from '$lib/github';
    import { primaryPages } from './primary-pages';
    import ThemeToggle from './theme-toggle.svelte';
    import TravelingPill from './traveling-pill.svelte';

    let {
        starCount = null,
        leading
    }: {
        starCount?: number | null;
        leading?: Snippet;
    } = $props();

    const search = getSearch();
    const pathname = $derived(page.url.pathname);
    const links = $derived(primaryPages(pathname));

    let nav = $state<HTMLElement>();

    function measure(container: HTMLElement) {
        const current = container.querySelector<HTMLElement>('[aria-current="page"]');

        if (!current) {
            return undefined;
        }

        return {
            left: current.offsetLeft,
            width: current.offsetWidth
        };
    }

    function openSearch() {
        search.open = true;
    }
</script>

<!--
    @component
    The slim header that replaces the rail below the large breakpoint: the menu button, the
    brand, the primary pages with one traveling lit pill, search, GitHub, and the theme toggle.
    It sits on the dark frame, so the layout renders it with the dark tokens.
-->

<header class="flex h-13 w-full shrink-0 items-center px-3">
    <div class="flex w-full min-w-0 items-center gap-3">
        <div class="flex min-w-0 flex-1 items-center gap-1.5">
            {@render leading?.()}
            <Logo />
        </div>
        <nav
            bind:this={nav}
            aria-label="Primary"
            class="relative isolate hidden shrink-0 items-center gap-0.5 md:flex"
        >
            <TravelingPill container={nav} {measure} track={pathname} axis="x" />
            {#each links as link (link.href)}
                <a
                    href={link.href}
                    aria-current={link.current ? 'page' : undefined}
                    class="flex h-8 items-center rounded-[var(--radius-control)] px-3 text-sm font-medium text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none aria-[current=page]:text-foreground motion-reduce:transition-none"
                >
                    {link.label}
                </a>
            {/each}
        </nav>
        <div class="flex min-w-0 flex-1 items-center justify-end gap-1">
            <Button
                variant="ghost"
                size="icon"
                aria-label="Search documentation"
                class="size-8 text-foreground-muted hover:text-foreground"
                onclick={openSearch}
            >
                <HugeiconsIcon icon={Search} size={16} />
            </Button>
            <Button
                variant="ghost"
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Star mielui on GitHub"
                class="hidden h-8 gap-2 px-2.5 text-foreground-muted hover:text-foreground sm:inline-flex"
            >
                <HugeiconsIcon icon={Github} size={16} />
                <span class="text-[13px] tabular-nums">{formatStarCount(starCount)}</span>
            </Button>
            <ThemeToggle />
        </div>
    </div>
</header>
