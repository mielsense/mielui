<script lang="ts">
    import {
        Mortarboard01Icon as Agent,
        BookOpen01Icon as Book,
        Clock01Icon as Clock,
        GithubIcon as Github,
        GridViewIcon as Grid,
        PaintBoardIcon as Palette,
        Search01Icon as Search,
        SwatchIcon as Swatch
    } from '@hugeicons/core-free-icons';
    import BrandMark from '@mielui/svelte/brand-mark';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { getSearch } from '$lib/components/search/context';
    import { usesDocsSidebar } from './page-icon';

    const search = getSearch();
    const pathname = $derived(page.url.pathname);
    const items = $derived([
        {
            href: resolve('/docs/introduction'),
            label: 'Documentation',
            icon: Book,
            current: usesDocsSidebar(pathname) && !pathname.startsWith('/docs/components')
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
        },
        {
            href: resolve('/docs/agent-skill'),
            label: 'Agent skill',
            icon: Agent,
            current: pathname.startsWith('/docs/agent-skill')
        }
    ]);
    const itemClass =
        'relative grid size-9 place-items-center rounded-[var(--radius-md)] text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-[var(--docs-pill)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-[current=page]:bg-[var(--docs-pill)] aria-[current=page]:text-foreground motion-reduce:transition-none';

    function openSearch() {
        search.open = true;
    }
</script>

<nav
    aria-label="Primary"
    class="hidden w-16 shrink-0 flex-col items-center border-e-[length:var(--border-size)] border-border bg-[var(--docs-side)] lg:flex"
>
    <div class="flex h-[50px] shrink-0 items-center">
        <a
            href={resolve('/')}
            aria-label="mielui Home"
            class="grid size-9 place-items-center rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        >
            <span
                class="grid size-7 place-items-center rounded-[8px] bg-primary [--color-foreground:white]"
            >
                <BrandMark size={19} />
            </span>
        </a>
    </div>
    <div class="flex flex-col items-center gap-1.5 pt-2">
        {#each items as item (item.href)}
            <Tooltip.Root placement="right">
                <Tooltip.Trigger>
                    <a
                        href={item.href}
                        aria-label={item.label}
                        aria-current={item.current ? 'page' : undefined}
                        class={itemClass}
                    >
                        <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.8} />
                    </a>
                </Tooltip.Trigger>
                <Tooltip.Content>{item.label}</Tooltip.Content>
            </Tooltip.Root>
        {/each}
        <span aria-hidden="true" class="my-1 h-px w-6 bg-[var(--docs-rule)]"></span>
        <Tooltip.Root placement="right">
            <Tooltip.Trigger>
                <button
                    type="button"
                    aria-label="Search documentation"
                    class={itemClass}
                    onclick={openSearch}
                >
                    <HugeiconsIcon icon={Search} size={20} strokeWidth={1.8} />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Content>Search</Tooltip.Content>
        </Tooltip.Root>
    </div>
    <div class="mt-auto flex h-[50px] shrink-0 items-center">
        <Tooltip.Root placement="right">
            <Tooltip.Trigger>
                <a
                    href="https://github.com/mielsense/mielui"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="mielui on GitHub"
                    class={itemClass}
                >
                    <HugeiconsIcon icon={Github} size={20} strokeWidth={1.8} />
                </a>
            </Tooltip.Trigger>
            <Tooltip.Content>GitHub</Tooltip.Content>
        </Tooltip.Root>
    </div>
</nav>
