<script lang="ts">
    import {
        Search01Icon as Search,
        SidebarLeft01Icon as SidebarIcon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import Logo from '$lib/components/logo.svelte';
    import { getSearch } from '$lib/components/search/context';
    import { formatStarCount, GITHUB_URL } from '$lib/github';
    import { hasShellSidebar, primaryPages } from './primary-pages';
    import { getShell } from './shell.svelte';
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
    const shell = getShell();
    const pathname = $derived(page.url.pathname);
    const hasSidebar = $derived(hasShellSidebar(pathname));
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
    The site header: brand, the primary pages with one traveling lit pill, search, and theme.
-->

<header class="flex h-13 w-full shrink-0 items-center px-3 lg:ps-8 lg:pe-5">
    <div class="flex w-full min-w-0 items-center gap-3">
        <div class="flex min-w-0 flex-1 items-center gap-1.5">
            {@render leading?.()}
            <Logo />
            {#if hasSidebar}
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={shell.collapsed ? 'Show sidebar' : 'Hide sidebar'}
                            aria-pressed={!shell.collapsed}
                            class="ms-1 hidden size-8 text-foreground-muted hover:text-foreground lg:inline-flex"
                            onclick={shell.toggle}
                        >
                            <HugeiconsIcon icon={SidebarIcon} size={16} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        {shell.collapsed ? 'Show sidebar' : 'Hide sidebar'}
                    </Tooltip.Content>
                </Tooltip.Root>
            {/if}
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
                    class="flex h-8 items-center rounded-[var(--radius-control)] px-3 text-sm font-medium text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none aria-[current=page]:text-card dark:aria-[current=page]:text-foreground motion-reduce:transition-none"
                >
                    {link.label}
                </a>
            {/each}
        </nav>
        <div class="flex min-w-0 flex-1 items-center justify-end gap-1">
            <button
                type="button"
                aria-label="Search documentation"
                class="hidden h-8 w-44 items-center gap-2 rounded-[var(--radius-control)] border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] ps-2.5 pe-1.5 text-start text-sm text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:border-border-strong hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none motion-reduce:transition-none xl:flex"
                onclick={openSearch}
            >
                <HugeiconsIcon icon={Search} size={14} class="shrink-0" aria-hidden="true" />
                <span class="flex-1 truncate">Search</span>
                <Kbd shortcut="cmd+K" />
            </button>
            <Button
                variant="ghost"
                size="icon"
                aria-label="Search documentation"
                class="size-8 text-foreground-muted hover:text-foreground xl:hidden"
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
                <img src={GitHubWhite} alt="" class="hidden size-4 dark:block" />
                <img src={GitHubBlack} alt="" class="size-4 dark:hidden" />
                <span class="text-[13px] tabular-nums">{formatStarCount(starCount)}</span>
            </Button>
            <ThemeToggle />
        </div>
    </div>
</header>
