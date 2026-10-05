<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { navigationGroups } from '$lib/components';
    import NavigationItems from './navigation-items.svelte';

    const { close }: { close: () => void } = $props();

    const navItems = [
        { href: '/docs/introduction', label: 'Docs' },
        { href: '/studio', label: 'Studio' }
    ];
    const docsPages = [
        { title: 'Introduction', href: resolve('/docs/introduction') },
        { title: 'Installation', href: resolve('/docs/installation') },
        { title: 'Theming', href: resolve('/docs/theming') },
        { title: 'Agent skill', href: resolve('/docs/agent-skill') },
        { title: 'Changelog', href: resolve('/docs/changelog') },
        { title: 'Components', href: resolve('/docs/components') }
    ];

    let nav = $state<HTMLElement>();

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

<nav bind:this={nav} aria-label="Documentation" class="min-h-0 flex-1 overflow-y-auto px-5 py-4">
    <section class="flex flex-col gap-2">
        <h2 class="mb-2 text-sm text-foreground-muted">Navigate</h2>
        {#each navItems as item (item.href)}
            <Button
                variant="quiet"
                class="w-full justify-start rounded-[var(--radius-md)] aria-[current=page]:bg-primary/15 aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-[current=page]:hover:bg-primary/20 aria-[current=page]:hover:text-foreground"
                aria-current={page.url.pathname === item.href ? 'page' : undefined}
                onclick={close}
                href={item.href}
            >
                {item.label}
            </Button>
        {/each}
    </section>

    <section class="flex flex-col gap-2 mt-10">
        <h2 class="mb-2 text-sm text-foreground-muted">Getting started</h2>
        {#each docsPages as item (item.href)}
            <Button
                variant="quiet"
                class="w-full justify-start rounded-[var(--radius-md)] aria-[current=page]:bg-primary/15 aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-[current=page]:hover:bg-primary/20 aria-[current=page]:hover:text-foreground"
                aria-current={page.url.pathname === item.href ? 'page' : undefined}
                onclick={close}
                href={item.href}
            >
                {item.title}
            </Button>
        {/each}
    </section>

    {#each navigationGroups as group (group.id)}
        <section class="mt-10 flex flex-col gap-2">
            <h2 class="mb-2 text-sm text-foreground-muted">
                {group.heading}
            </h2>
            <NavigationItems {group} onNavigate={close} />
            {#if group.items.length === 0}
                <p class="text-sm text-foreground-muted">No chart components yet.</p>
            {/if}
        </section>
    {/each}
</nav>
