<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { getCssDuration } from '@mielui/svelte/transition';
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

    function magneticHeadings(node: HTMLElement) {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let timer: ReturnType<typeof setTimeout> | undefined;
        let interacting = false;

        function settle() {
            clearTimeout(timer);
            if (
                interacting ||
                preference.matches ||
                getCssDuration(node, '--motion-duration-panel', 180) === 0
            ) {
                return;
            }
            const top = node.getBoundingClientRect().top;
            const offsets = Array.from(
                node.children,
                (section) => section.getBoundingClientRect().top - top
            );
            const nearest = offsets.reduce(
                (best, offset) => (Math.abs(offset) < Math.abs(best) ? offset : best),
                Infinity
            );
            if (Math.abs(nearest) > 1 && Math.abs(nearest) <= 20) {
                node.scrollBy({ top: nearest, behavior: 'smooth' });
            }
        }

        function schedule() {
            clearTimeout(timer);
            timer = setTimeout(settle, 180);
        }

        function hold() {
            interacting = true;
            clearTimeout(timer);
        }

        function release() {
            if (!interacting) {
                return;
            }
            interacting = false;
            schedule();
        }

        node.addEventListener('scrollend', settle);
        node.addEventListener('scroll', schedule, { passive: true });
        node.addEventListener('pointerdown', hold);
        window.addEventListener('pointerup', release);
        window.addEventListener('pointercancel', release);
        return () => {
            clearTimeout(timer);
            node.removeEventListener('scrollend', settle);
            node.removeEventListener('scroll', schedule);
            node.removeEventListener('pointerdown', hold);
            window.removeEventListener('pointerup', release);
            window.removeEventListener('pointercancel', release);
        };
    }

    function isActive(path: string) {
        return pageName === path;
    }
</script>

<aside
    {@attach magneticHeadings}
    class={`${classProp} hide-scrollbar flex flex-col overflow-y-auto overscroll-none`}
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
