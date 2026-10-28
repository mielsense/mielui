<script lang="ts">
    import { GithubIcon as Github, Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { Snippet } from 'svelte';
    import Logo from '$lib/components/logo.svelte';
    import { getSearch } from '$lib/components/search/context';
    import { formatStarCount, GITHUB_URL } from '$lib/github';
    import ThemeToggle from './theme-toggle.svelte';

    let {
        starCount = null,
        leading
    }: {
        starCount?: number | null;
        leading?: Snippet;
    } = $props();

    const search = getSearch();
</script>

<!--
    @component
    The slim row that stands in for the sidebar below the large breakpoint: the menu button,
    the brand, search, GitHub, and the theme toggle, on the page color.
-->

<header class="flex h-14 w-full shrink-0 items-center gap-1 px-3 sm:px-4">
    <div class="flex min-w-0 flex-1 items-center gap-1.5">
        {@render leading?.()}
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
    <Button
        variant="ghost"
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Mielui on GitHub"
        class="hidden h-8 gap-2 px-2.5 text-foreground-muted hover:text-foreground sm:inline-flex"
    >
        <HugeiconsIcon icon={Github} size={16} />
        <span class="text-[13px] tabular-nums">{formatStarCount(starCount)}</span>
    </Button>
    <ThemeToggle />
</header>
