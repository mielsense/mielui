<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { getSearch } from '$lib/components/search/context';
    import { getShell } from '$lib/components/shell/shell.svelte';
    import TravelingPill from '$lib/components/shell/traveling-pill.svelte';
    import { guides, measurePill, scrollParent, sections, site } from './navigation-items';

    let {
        close,
        siteLinks = false
    }: {
        close?: () => void;
        siteLinks?: boolean;
    } = $props();

    const shell = getShell();
    const search = getSearch();

    const rowClass =
        'group/row flex h-8 w-full min-w-0 items-center gap-3 rounded-[var(--radius-control)] px-3 text-start text-sm text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] aria-[current=page]:font-medium aria-[current=page]:text-foreground [[data-pill-ready]_&]:aria-[current=page]:text-card dark:[[data-pill-ready]_&]:aria-[current=page]:text-foreground motion-reduce:transition-none';
    const labelClass =
        'flex h-8 items-center rounded-[var(--radius-control)] px-3 text-xs font-medium text-foreground-muted transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground aria-[current=page]:text-foreground motion-reduce:transition-none';

    let nav = $state<HTMLElement>();

    function isOpen(href: string) {
        return href !== page.url.pathname && shell.tabs.tabs.some((tab) => tab.href === href);
    }

    let pressedHref: string | undefined;

    function press(event: PointerEvent, href: string) {
        pressedHref = undefined;
        if (
            event.pointerType !== 'mouse' ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            href === page.url.pathname
        ) {
            return;
        }
        pressedHref = href;
        close?.();
        void goto(href);
    }

    function follow(event: MouseEvent, href: string) {
        if (pressedHref === href) {
            event.preventDefault();
            pressedHref = undefined;

            return;
        }
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
    class="relative isolate flex flex-col gap-7 px-3 pt-1 pb-10 lg:pt-0"
>
    <TravelingPill container={nav} measure={measurePill} track={page.url.pathname} axis="both" />
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
                onpointerdown={(event) => press(event, item.href)}
                onclick={(event) => follow(event, item.href)}
            >
                {#if siteLinks}
                    <HugeiconsIcon icon={item.icon} size={16} class="shrink-0" aria-hidden="true" />
                {/if}
                <span data-nav-label class="min-w-0 truncate">{item.label}</span>
                <span class="flex-1"></span>
                {@render openDot(item.href)}
            </a>
        {/each}
        {#if siteLinks}
            {#each site as item (item.href)}
                <a href={item.href} class={rowClass} onclick={close}>
                    <HugeiconsIcon icon={item.icon} size={16} class="shrink-0" aria-hidden="true" />
                    <span data-nav-label class="min-w-0 truncate">{item.label}</span>
                    <span class="flex-1"></span>
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
                    class="pointer-events-none absolute inset-x-0 top-full h-5 bg-linear-to-b from-[var(--docs-side)] to-transparent opacity-0 [mask-image:linear-gradient(to_bottom,black,transparent)] [@container_scroll-state(stuck:top)]:opacity-100"
                ></span>
                <a
                    href={section.href}
                    class={`${labelClass} focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] [@container_scroll-state(stuck:top)]:text-foreground`}
                    aria-current={page.url.pathname === section.href ? 'page' : undefined}
                    onpointerdown={(event) => press(event, section.href)}
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
                    onpointerdown={(event) => press(event, item.href)}
                    onclick={(event) => follow(event, item.href)}
                >
                    <span data-nav-label class="min-w-0 truncate">{item.label}</span>
                    <span class="flex-1"></span>
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
