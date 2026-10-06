<script lang="ts">
    import {
        BookOpen01Icon as Book,
        Clock01Icon as Clock,
        GithubIcon as Github,
        GridViewIcon as Grid,
        Moon02Icon as Moon,
        PaintBoardIcon as Palette,
        Search01Icon as Search,
        Sun03Icon as Sun,
        SwatchIcon as Swatch
    } from '@hugeicons/core-free-icons';
    import BrandMark from '@mielui/svelte/brand-mark';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { getSearch } from '$lib/components/search/context';

    const search = getSearch();
    const pathname = $derived(page.url.pathname);
    const items = $derived([
        {
            href: resolve('/docs/introduction'),
            label: 'Documentation',
            icon: Book,
            current:
                pathname.startsWith('/docs') &&
                !pathname.startsWith('/docs/components') &&
                !pathname.startsWith('/docs/changelog')
        },
        {
            href: resolve('/docs/components'),
            label: 'Components',
            icon: Grid,
            current: pathname.startsWith('/docs/components')
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
    const themeLabel = $derived(
        mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
    const itemClass =
        'relative grid size-9 place-items-center rounded-[var(--radius-md)] text-[#d5d5d5] transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none';

    function openSearch() {
        search.open = true;
    }
</script>

<nav
    aria-label="Primary"
    class="dark hidden w-16 shrink-0 flex-col items-center gap-2.5 pt-[17px] pb-0 text-white lg:flex"
>
    <a
        href={resolve('/')}
        aria-label="mielui Home"
        class="mb-2.5 grid size-9 place-items-center rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
    >
        <span
            class="grid size-7 place-items-center rounded-[8px] bg-primary [--color-foreground:white]"
        >
            <BrandMark size={19} />
        </span>
    </a>
    {#each items as item (item.href)}
        <Tooltip.Root placement="right">
            <Tooltip.Trigger>
                <a
                    href={item.href}
                    aria-label={item.label}
                    aria-current={item.current ? 'page' : undefined}
                    class={`${itemClass} aria-[current=page]:bg-white/[0.14] aria-[current=page]:text-white`}
                >
                    <HugeiconsIcon icon={item.icon} size={21} strokeWidth={1.8} />
                </a>
            </Tooltip.Trigger>
            <Tooltip.Content>{item.label}</Tooltip.Content>
        </Tooltip.Root>
    {/each}
    <span aria-hidden="true" class="my-1 h-px w-6 bg-white/15"></span>
    <Tooltip.Root placement="right">
        <Tooltip.Trigger>
            <button
                type="button"
                aria-label="Search documentation"
                class={itemClass}
                onclick={openSearch}
            >
                <HugeiconsIcon icon={Search} size={21} strokeWidth={1.8} />
            </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Search</Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root placement="right">
        <Tooltip.Trigger>
            <a
                href="https://github.com/mielsense/mielui"
                target="_blank"
                rel="noreferrer"
                aria-label="mielui on GitHub"
                class={itemClass}
            >
                <HugeiconsIcon icon={Github} size={21} strokeWidth={1.8} />
            </a>
        </Tooltip.Trigger>
        <Tooltip.Content>GitHub</Tooltip.Content>
    </Tooltip.Root>
    <span aria-hidden="true" class="my-1 h-px w-6 bg-white/15"></span>
    <Tooltip.Root placement="right">
        <Tooltip.Trigger>
            <button type="button" aria-label={themeLabel} class={itemClass} onclick={toggleMode}>
                <HugeiconsIcon
                    icon={mode.current === 'dark' ? Moon : Sun}
                    size={21}
                    strokeWidth={1.8}
                />
            </button>
        </Tooltip.Trigger>
        <Tooltip.Content>{themeLabel}</Tooltip.Content>
    </Tooltip.Root>
</nav>
