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
    import { formatStarCount } from '$lib/github';
    import { usesDocsSidebar } from './page-icon';
    import { getShell } from './shell.svelte';
    import ThemeToggle from './theme-toggle.svelte';

    const { starCount = null }: { starCount?: number | null } = $props();

    const search = getSearch();
    const shell = getShell();
    const pathname = $derived(page.url.pathname);
    const hasSidebar = $derived(usesDocsSidebar(pathname) || pathname.startsWith('/studio'));
    const items = $derived([
        {
            href: resolve('/docs/introduction'),
            label: 'Docs',
            icon: Book,
            current:
                pathname.startsWith('/docs') &&
                !pathname.startsWith('/docs/components') &&
                !pathname.startsWith('/docs/actions') &&
                !pathname.startsWith('/docs/changelog')
        },
        {
            href: resolve('/docs/components'),
            label: 'Components',
            icon: Grid,
            current: pathname.startsWith('/docs/components') || pathname.startsWith('/docs/actions')
        },
        {
            href: resolve('/studio'),
            label: 'Theme Studio',
            icon: Palette,
            current: pathname.startsWith('/studio')
        },
        {
            href: resolve('/themes'),
            label: 'Themes',
            icon: Swatch,
            current: pathname.startsWith('/themes')
        },
        {
            href: resolve('/docs/changelog'),
            label: 'Changelog',
            icon: Clock,
            current: pathname.startsWith('/docs/changelog')
        }
    ]);
    const itemClass =
        'relative grid size-9 place-items-center rounded-[var(--radius-control)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none motion-reduce:transition-none';

    let list = $state<HTMLElement>();
    let pill = $state<{ top: number; height: number }>();
    let ready = $state(false);

    function measure() {
        const current = list?.querySelector<HTMLElement>('[aria-current="page"]');
        pill = current ? { top: current.offsetTop, height: current.offsetHeight } : undefined;
    }

    $effect(() => {
        void pathname;
        measure();
        const frame = requestAnimationFrame(() => {
            ready = true;
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    });

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
        <span
            aria-hidden="true"
            class="mielui-glow pointer-events-none absolute inset-x-0 top-0 -z-10 shadow-[var(--mielui-glow-shadow)] transition-[translate,height,opacity] [transition-duration:var(--motion-duration-item)] ease-[var(--ease-out)] [--mielui-glow-color:var(--color-foreground)] [--mielui-glow-light:0.16] [--mielui-glow-ring:transparent] motion-reduce:transition-none dark:[--mielui-glow-color:color-mix(in_srgb,var(--color-foreground)_16%,var(--color-card))] dark:[--mielui-glow-light:0.12] dark:[--mielui-glow-ring:var(--color-border)]"
            style:translate={`0 ${pill?.top ?? 0}px`}
            style:height={`${pill?.height ?? 0}px`}
            style:opacity={pill ? 1 : 0}
            style:transition={ready ? undefined : 'none'}
        ></span>
        {#each items as item (item.href)}
            <Tooltip.Root placement="right">
                <Tooltip.Trigger>
                    <a
                        href={item.href}
                        aria-label={item.label}
                        aria-current={item.current ? 'page' : undefined}
                        class={`${itemClass} aria-[current=page]:text-card dark:aria-[current=page]:text-foreground`}
                    >
                        <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.8} />
                    </a>
                </Tooltip.Trigger>
                <Tooltip.Content>{item.label}</Tooltip.Content>
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
                    href="https://github.com/mielsense/mielui"
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
