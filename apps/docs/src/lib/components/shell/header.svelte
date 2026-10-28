<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        Download04Icon as Download,
        GithubIcon as Github,
        Search01Icon as Search
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import Navigation from '#lib/components/docs/navigation.svelte';
    import { guideGroup, sections, siteLinks } from '#lib/components/docs/navigation-items.js';
    import Logo from '#lib/components/logo.svelte';
    import { getSearch } from '#lib/components/search/context.js';
    import { GITHUB_URL, githubLabel } from '#lib/github.js';
    import { afterNavigate } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import ThemeToggle from './theme-toggle.svelte';

    let { starCount = null }: { starCount?: number | null } = $props();

    const search = getSearch();
    const links = [
        ...siteLinks,
        ...guideGroup.items,
        ...sections.flatMap((section) => [
            {
                href: section.href,
                label: section.label
            },
            ...section.items
        ])
    ];
    const current = $derived(
        links.find((link) => link.href === page.url.pathname)?.label ?? 'Docs'
    );

    let open = $state(false);

    afterNavigate(() => {
        open = false;
    });
</script>

<!--
    @component
    The slim row that stands in for the sidebar below the large breakpoint: the brand, search,
    and a button named after the current page that unfolds the navigation in place. The fold
    scrolls inside itself, so part of the page stays in view below it.
-->

<header class="shrink-0">
    <div class="flex h-14 w-full items-center gap-1 px-3 sm:px-4">
        <div class="me-auto flex min-w-0 items-center">
            <Logo />
        </div>
        <Button
            variant="ghost"
            size="icon"
            aria-label="Search the docs"
            class="size-8 text-foreground-muted hover:text-foreground"
            onclick={() => {
                search.open = true;
            }}
        >
            <HugeiconsIcon icon={Search} size={16} />
        </Button>
        <button
            type="button"
            aria-expanded={open}
            aria-controls="docs-menu"
            onclick={() => {
                open = !open;
            }}
            class="press flex h-8 max-w-[11rem] items-center gap-1.5 rounded-[var(--radius-control)] px-2.5 text-[13px] text-foreground hover:bg-[var(--color-wash)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
        >
            <span class="truncate">{current}</span>
            <HugeiconsIcon
                icon={ChevronDown}
                size={14}
                class={`shrink-0 text-foreground-muted transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
            />
        </button>
    </div>
    <div
        id="docs-menu"
        inert={!open}
        class={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
    >
        <div class="min-h-0 overflow-hidden">
            <div
                class={`flex max-h-[72dvh] flex-col transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
            >
                <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain pt-1">
                    <Navigation
                        close={() => {
                            open = false;
                        }}
                    />
                </div>
                <div class="flex shrink-0 items-center gap-1 px-3 pt-2 pb-3">
                    <Button
                        href={resolve('/docs/installation')}
                        variant="glow"
                        size="sm"
                        class="me-1 h-8 flex-1 text-[#1a1a1a] [--mielui-glow-color:#fff] dark:[--mielui-glow-light:0.6]"
                    >
                        <HugeiconsIcon icon={Download} size={14} />
                        Get started
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={githubLabel(starCount)}
                        class="size-8 text-foreground-muted hover:text-foreground"
                    >
                        <HugeiconsIcon icon={Github} size={16} />
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    </div>
</header>
