<script lang="ts">
    import {
        Mortarboard01Icon as Agent,
        BookOpen01Icon as Book,
        PaintBrush01Icon as Brush,
        Clock01Icon as Clock,
        Download04Icon as Download,
        GithubIcon as Github,
        GridViewIcon as Grid,
        PaintBoardIcon as Palette,
        Search01Icon as Search,
        SwatchIcon as Swatch
    } from '@hugeicons/core-free-icons';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import {
        componentTypeHref,
        componentTypes,
        navigationGroups,
        sanitizeComponent
    } from '$lib/components';
    import { getSearch } from '$lib/components/search/context';
    import { getShell } from '$lib/components/shell/shell.svelte';
    import { componentGuidePages } from '$lib/docs-pages';

    const {
        close,
        siteLinks = false
    }: {
        close?: () => void;
        siteLinks?: boolean;
    } = $props();

    const shell = getShell();
    const search = getSearch();

    const rowClass =
        'group/row flex h-8 w-full min-w-0 items-center gap-3 rounded-[var(--radius-control)] px-3 text-start text-sm text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-[current=page]:font-medium aria-[current=page]:text-foreground motion-reduce:transition-none';
    const labelClass =
        'flex h-8 items-center rounded-[var(--radius-control)] px-3 text-xs font-medium text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground aria-[current=page]:text-foreground motion-reduce:transition-none';

    const guides = [
        { label: 'Introduction', href: resolve('/docs/introduction'), icon: Book },
        { label: 'Installation', href: resolve('/docs/installation'), icon: Download },
        { label: 'Theming', href: resolve('/docs/theming'), icon: Brush },
        { label: 'Agent skill', href: resolve('/docs/agent-skill'), icon: Agent },
        { label: 'Components', href: resolve('/docs/components'), icon: Grid }
    ];
    const site = [
        { label: 'Theme Studio', href: resolve('/studio'), icon: Palette },
        { label: 'Themes', href: resolve('/themes'), icon: Swatch },
        { label: 'Changelog', href: resolve('/docs/changelog'), icon: Clock },
        { label: 'GitHub', href: 'https://github.com/mielsense/mielui', icon: Github }
    ];
    const sections = [
        ...componentTypes.map((type) => ({
            id: type.id,
            label: type.heading,
            href: componentTypeHref(type.id),
            items: type.items.map((component) => ({
                href: `/docs/components/${component}`,
                label: sanitizeComponent(component),
                nested: false
            }))
        })),
        ...navigationGroups
            .filter((group) => group.id !== 'components' && group.items.length > 0)
            .map((group) => ({
                id: group.id,
                label: group.heading,
                href: group.id === 'actions' ? '/docs/actions' : componentTypeHref(group.id),
                items: group.items.flatMap((component) => [
                    {
                        href: `/docs/${group.id === 'actions' ? 'actions' : 'components'}/${component}`,
                        label: sanitizeComponent(component),
                        nested: false
                    },
                    ...componentGuidePages
                        .filter((guide) => guide.component === component)
                        .map((guide) => ({
                            href: guide.href,
                            label: guide.title,
                            nested: true
                        }))
                ])
            }))
    ];

    let nav = $state<HTMLElement>();
    let pill = $state<{ top: number; height: number }>();
    let pillReady = $state(false);

    function measurePill() {
        const current = nav?.querySelector<HTMLElement>('[data-nav-row][aria-current="page"]');
        if (!nav || !current) {
            pill = undefined;

            return;
        }
        pill = {
            top: current.getBoundingClientRect().top - nav.getBoundingClientRect().top,
            height: current.offsetHeight
        };
    }

    $effect(() => {
        void page.url.pathname;
        measurePill();
        if (!nav) {
            return;
        }
        const observer = new ResizeObserver(measurePill);
        observer.observe(nav);
        const frame = requestAnimationFrame(() => {
            pillReady = true;
        });

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    });

    function isOpen(href: string) {
        return href !== page.url.pathname && shell.tabs.tabs.some((tab) => tab.href === href);
    }

    function follow(event: MouseEvent, href: string) {
        if (event.button === 0 && (event.metaKey || event.ctrlKey) && href.startsWith('/docs')) {
            event.preventDefault();
            shell.tabs.openInBackground(href);

            return;
        }
        close?.();
    }

    function openSearch() {
        close?.();
        search.open = true;
    }

    function scrollParent(element: HTMLElement) {
        for (let parent = element.parentElement; parent; parent = parent.parentElement) {
            if (parent.scrollHeight > parent.clientHeight + 1) {
                const overflow = getComputedStyle(parent).overflowY;
                if (overflow === 'auto' || overflow === 'scroll') {
                    return parent;
                }
            }
        }
        return undefined;
    }

    $effect(() => {
        void page.url.pathname;
        const current = nav?.querySelector<HTMLElement>('[aria-current="page"]');
        const scroller = current ? scrollParent(current) : undefined;
        if (!current || !scroller) {
            return;
        }
        const item = current.getBoundingClientRect();
        const view = scroller.getBoundingClientRect();
        if (item.top >= view.top && item.bottom <= view.bottom) {
            return;
        }
        scroller.scrollTop += item.top - view.top - (view.height - item.height) / 2;
    });
</script>

<nav
    bind:this={nav}
    aria-label="Documentation"
    class="relative isolate flex flex-col gap-7 px-3 pt-1 pb-10"
>
    <span
        aria-hidden="true"
        class="mielui-glow mielui-glow-neutral pointer-events-none absolute inset-x-3 -z-10 shadow-[var(--mielui-glow-shadow),var(--elevation-1)] transition-[top,height,opacity] [transition-duration:var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none"
        style:top={`${pill?.top ?? 0}px`}
        style:height={`${pill?.height ?? 0}px`}
        style:opacity={pill ? 1 : 0}
        style:transition={pillReady ? undefined : 'none'}
    ></span>
    <div class="flex flex-col gap-0.5">
        {#if siteLinks}
            <button type="button" class={rowClass} onclick={openSearch}>
                <HugeiconsIcon icon={Search} size={16} class="shrink-0" aria-hidden="true" />
                <span class="flex-1 truncate">Search</span>
                <Kbd shortcut="cmd+K" />
            </button>
        {/if}
        {#each guides as item (item.href)}
            <a
                href={item.href}
                data-nav-row
                class={rowClass}
                aria-current={page.url.pathname === item.href ? 'page' : undefined}
                onclick={(event) => follow(event, item.href)}
            >
                {#if siteLinks}
                    <HugeiconsIcon icon={item.icon} size={16} class="shrink-0" aria-hidden="true" />
                {/if}
                <span class="flex-1 truncate">{item.label}</span>
                {@render openDot(item.href)}
            </a>
        {/each}
        {#if siteLinks}
            {#each site as item (item.href)}
                <a href={item.href} class={rowClass} onclick={close}>
                    <HugeiconsIcon icon={item.icon} size={16} class="shrink-0" aria-hidden="true" />
                    <span class="flex-1 truncate">{item.label}</span>
                </a>
            {/each}
        {/if}
    </div>

    {#each sections as section (section.id)}
        <section class="flex flex-col gap-0.5">
            <h2
                class="sticky top-0 z-10 -mx-3 m-0 bg-[var(--docs-side)] px-3 [container-type:scroll-state]"
            >
                <span
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-x-0 top-full h-5 bg-linear-to-b from-[var(--docs-side)] to-transparent opacity-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,black,transparent)] [@container_scroll-state(stuck:top)]:opacity-100"
                ></span>
                <a
                    href={section.href}
                    class={`${labelClass} focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]`}
                    aria-current={page.url.pathname === section.href ? 'page' : undefined}
                    onclick={(event) => follow(event, section.href)}
                >
                    {section.label}
                </a>
            </h2>
            {#each section.items as item (item.href)}
                <a
                    href={item.href}
                    data-nav-row
                    class={`${rowClass} ${item.nested ? 'ps-6' : ''}`}
                    aria-current={page.url.pathname === item.href ? 'page' : undefined}
                    onclick={(event) => follow(event, item.href)}
                >
                    <span class="flex-1 truncate">{item.label}</span>
                    {@render openDot(item.href)}
                </a>
            {/each}
        </section>
    {/each}
</nav>

{#snippet openDot(href: string)}
    {#if isOpen(href)}
        <span class="me-1 size-1.5 shrink-0 rounded-full bg-[var(--color-info)]">
            <span class="sr-only">Open in a tab</span>
        </span>
    {/if}
{/snippet}
