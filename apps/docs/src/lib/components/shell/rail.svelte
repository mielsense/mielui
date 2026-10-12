<script lang="ts">
    import {
        BookOpen01Icon as Book,
        Clock01Icon as Clock,
        GithubIcon as Github,
        GridViewIcon as Grid,
        PaintBoardIcon as Palette,
        Search01Icon as Search,
        SidebarLeft01Icon as SidebarIcon,
        SwatchIcon as Swatch
    } from '@hugeicons/core-free-icons';
    import BrandMark from '@mielui/svelte/brand-mark';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { getSearch } from '$lib/components/search/context';
    import { formatStarCount, GITHUB_URL } from '$lib/github';
    import { hasShellSidebar, primaryPages } from './primary-pages';
    import { getShell } from './shell.svelte';
    import ThemeToggle from './theme-toggle.svelte';
    import TravelingPill from './traveling-pill.svelte';

    let { starCount = null }: { starCount?: number | null } = $props();

    const search = getSearch();
    const shell = getShell();
    const pathname = $derived(page.url.pathname);
    const hasSidebar = $derived(hasShellSidebar(pathname));
    const icons = {
        docs: Book,
        components: Grid,
        studio: Palette,
        themes: Swatch,
        changelog: Clock
    };
    const items = $derived(primaryPages(pathname));
    const itemClass =
        'relative grid size-9 place-items-center rounded-[var(--radius-control)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none motion-reduce:transition-none';

    let list = $state<HTMLElement>();

    function measure(container: HTMLElement) {
        const current = container.querySelector<HTMLElement>('[aria-current="page"]');

        if (!current) {
            return undefined;
        }

        return {
            top: current.offsetTop,
            height: current.offsetHeight
        };
    }

    function openSearch() {
        search.open = true;
    }
</script>

<!--
    @component
    The icon rail: brand and the sidebar toggle at the top, the primary pages with one
    traveling highlight spaced evenly between the groups, and search, the theme toggle, and
    GitHub at the bottom.
    It sits on the dark outer frame in both themes, so it always renders with the dark tokens.
-->

<nav
    aria-label="Primary"
    class="dark hidden w-17 shrink-0 flex-col items-center justify-between py-3 text-foreground lg:flex"
>
    <div class="flex flex-col items-center gap-1">
        <a
            href={resolve('/')}
            aria-label="mielui Home"
            class="mb-1 grid size-9 place-items-center rounded-[var(--radius-control)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
        >
            <span
                class="grid size-7 place-items-center rounded-[8px] bg-primary [--color-foreground:white]"
            >
                <BrandMark size={19} />
            </span>
        </a>
        <Tooltip.Root placement="right">
            <Tooltip.Trigger>
                <button
                    type="button"
                    aria-label={shell.collapsed ? 'Show sidebar' : 'Hide sidebar'}
                    aria-pressed={hasSidebar ? !shell.collapsed : undefined}
                    disabled={!hasSidebar}
                    class={`${itemClass} disabled:pointer-events-none disabled:opacity-60`}
                    onclick={shell.toggle}
                >
                    <HugeiconsIcon icon={SidebarIcon} size={18} strokeWidth={1.8} />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                {shell.collapsed ? 'Show sidebar' : 'Hide sidebar'}
            </Tooltip.Content>
        </Tooltip.Root>
    </div>
    <div bind:this={list} class="relative isolate flex flex-col items-center gap-1">
        <TravelingPill
            container={list}
            {measure}
            track={pathname}
            axis="y"
            class="shadow-[var(--mielui-glow-shadow)]"
        />
        {#each items as item (item.href)}
            <Tooltip.Root placement="right">
                <Tooltip.Trigger>
                    <a
                        href={item.href}
                        aria-label={item.name}
                        aria-current={item.current ? 'page' : undefined}
                        class={`${itemClass} aria-[current=page]:text-card dark:aria-[current=page]:text-foreground`}
                    >
                        <HugeiconsIcon icon={icons[item.id]} size={18} strokeWidth={1.8} />
                    </a>
                </Tooltip.Trigger>
                <Tooltip.Content>{item.name}</Tooltip.Content>
            </Tooltip.Root>
        {/each}
    </div>
    <div class="flex flex-col items-center gap-1">
        <Tooltip.Root placement="right">
            <Tooltip.Trigger>
                <button
                    type="button"
                    aria-label="Search documentation"
                    class={itemClass}
                    onclick={openSearch}
                >
                    <HugeiconsIcon icon={Search} size={18} strokeWidth={1.8} />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Content>Search</Tooltip.Content>
        </Tooltip.Root>
        <ThemeToggle />
        <Tooltip.Root placement="right">
            <Tooltip.Trigger>
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Star mielui on GitHub"
                    class={itemClass}
                >
                    <HugeiconsIcon icon={Github} size={18} strokeWidth={1.8} />
                </a>
            </Tooltip.Trigger>
            <Tooltip.Content>
                <span class="tabular-nums">GitHub · {formatStarCount(starCount)}</span>
            </Tooltip.Content>
        </Tooltip.Root>
    </div>
</nav>
