<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { page } from '$app/state';
    import { navigationGroups } from '$lib/components';
    import NavigationItems from './navigation-items.svelte';
    import RailHeading from './rail-heading.svelte';

    let { class: classProp = '', onNavigate }: { class?: string; onNavigate?: () => void } =
        $props();
    const pageName = $derived(page.url.pathname);

    const gettingStartedItems = [
        { href: '/docs/introduction', label: 'Introduction' },
        { href: '/docs/installation', label: 'Installation' },
        { href: '/docs/theming', label: 'Theming' },
        { href: '/docs/agent-skill', label: 'Agent skill' },
        { href: '/docs/changelog', label: 'Changelog' },
        { href: '/studio', label: 'Studio' },
        { href: '/docs/components', label: 'Components' }
    ];

    function isActive(path: string) {
        return pageName === path;
    }
</script>

<aside
    class={`${classProp} hide-scrollbar flex flex-col overflow-y-auto overscroll-none snap-y snap-proximity motion-safe:scroll-smooth motion-reduce:snap-none [&_[data-rail-heading]]:snap-start`}
>
    <section class="flex shrink-0 flex-col">
        <RailHeading title="Getting started" />
        <div class="isolate flex flex-col px-3 py-3">
            {#each gettingStartedItems as item (item.href)}
                {@const active = isActive(item.href)}
                <Button
                    variant="quiet"
                    size="md"
                    href={item.href}
                    onclick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    class={`w-full justify-start rounded-[var(--radius-md)] px-3 text-left text-sm ${
                        active
                            ? 'text-primary hover:text-primary [font-weight:var(--font-weight-label,500)]'
                            : 'text-foreground-muted hover:text-foreground'
                    }`}
                >
                    {item.label}
                </Button>
            {/each}
        </div>
    </section>

    {#each navigationGroups as group (group.id)}
        <section class="relative flex shrink-0 flex-col">
            <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-x-0 -top-px z-30 border-t-[length:var(--border-size)] border-[var(--docs-rule)]"
            ></span>
            <RailHeading title={group.heading} count={group.items.length} />
            <div class="isolate flex flex-col px-3 py-3">
                <NavigationItems {group} {onNavigate} />
            </div>
            {#if group.items.length === 0}
                <p class="px-2 text-xs text-foreground-muted">No chart components yet.</p>
            {/if}
        </section>
    {/each}
</aside>
