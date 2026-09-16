<script lang="ts">
    import {
        ArrowRight01Icon as ChevronRight,
        Home01Icon as Home,
        Menu01Icon as Menu,
        Moon02Icon as Moon,
        Sun03Icon as Sun,
        Cancel01Icon as X
    } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import { Button } from '@mielui/svelte/components/button';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import { navigationGroups, sanitizeComponent } from '$lib/components';
    import SearchButton from '$lib/components/search/trigger.svelte';
    import Logo from '../logo.svelte';

    const { starCount = null }: { starCount?: number | null } = $props();
    let mobileMenuOpen = $state(false);

    $effect(() => {
        page.url.pathname;
        mobileMenuOpen = false;
    });

    const navItems = [
        { href: '/docs/introduction', label: 'Docs' },
        { href: '/docs/components', label: 'Components' },
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

    const breadcrumbs = $derived.by(() => {
        const pathnameSegments = page.url.pathname.split('/').filter(Boolean);
        const isDocsPath = pathnameSegments[0] === 'docs';
        const segments = isDocsPath ? pathnameSegments.slice(1) : pathnameSegments;
        const basePath = isDocsPath ? '/docs' : '';
        const category =
            segments[0] === 'components'
                ? navigationGroups.find((group) =>
                      group.items.some((component) => component === segments[1])
                  )
                : undefined;

        return [
            { href: '/', label: 'Home' },
            ...segments.map((segment, index) => ({
                href:
                    index === 0 && category
                        ? `/docs/components#${category.id}`
                        : `${basePath}/${segments.slice(0, index + 1).join('/')}`,
                label: index === 0 && category ? category.heading : formatSegment(segment)
            }))
        ];
    });

    function formatSegment(segment: string): string {
        const labels: Record<string, string> = {
            docs: 'Docs',
            components: 'Components',
            composer: 'Composer'
        };

        if (labels[segment]) {
            return labels[segment];
        }

        return segment
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function closeMobileMenu() {
        mobileMenuOpen = false;
    }

    function formatStarCount(count: number | null): string {
        if (count === null || Number.isNaN(count)) {
            return 'Star';
        }

        if (count >= 1000) {
            const thousands = count / 1000;

            return `${thousands >= 10 ? Math.round(thousands) : thousands.toFixed(1)}k`;
        }

        return String(count);
    }
</script>

<Sheet.Root bind:open={mobileMenuOpen}>
    <header
        class="relative z-20 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-5 after:bg-linear-to-b after:from-background after:to-transparent mx-auto flex h-16 w-full items-center justify-between gap-4 px-3 sm:px-8 lg:px-10 xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-16 xl:pr-14 2xl:gap-20 2xl:pr-16"
    >
        <div class="mx-auto flex w-full min-w-0 max-w-[960px] items-center justify-between gap-4">
            <div class="flex min-w-0 items-center gap-2 sm:hidden">
                <Sheet.Trigger
                    class="size-9 rounded-[var(--radius-md)]"
                    aria-label="Open navigation menu"
                    variant="quiet"
                    size="icon"
                >
                    <HugeiconsIcon icon={Menu} size={18} />
                </Sheet.Trigger>
                <Logo />
            </div>

            <nav
                aria-label="Breadcrumb"
                class="mx-auto hidden w-full min-w-0 max-w-[960px] sm:block"
            >
                <ol
                    class="flex min-w-0 items-center gap-1 overflow-hidden text-sm text-foreground-muted [font-weight:var(--font-weight-label,500)]"
                >
                    {#each breadcrumbs as breadcrumb, index (breadcrumb.href)}
                        <li class="flex min-w-0 items-center gap-1">
                            {#if index < breadcrumbs.length - 1}
                                <a
                                    href={breadcrumb.href}
                                    class="truncate transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                                >
                                    {#if index === 0}
                                        <HugeiconsIcon icon={Home} size={16} />
                                        <span class="sr-only">Home</span>
                                    {:else}
                                        {breadcrumb.label}
                                    {/if}
                                </a>
                            {:else}
                                <span class="truncate text-foreground" aria-current="page">
                                    {breadcrumb.label}
                                </span>
                            {/if}
                            {#if index < breadcrumbs.length - 1}
                                <HugeiconsIcon
                                    icon={ChevronRight}
                                    size={14}
                                    class="shrink-0"
                                    aria-hidden="true"
                                />
                            {/if}
                        </li>
                    {/each}
                </ol>
            </nav>

            <div class="flex shrink-0 items-center justify-end gap-1.5">
                <SearchButton />
                <Button
                    class="h-9 rounded-[var(--radius-md)] px-2.5 text-[0.8125rem]"
                    variant="outline"
                    href={resolve('/studio')}
                >
                    Studio
                </Button>
            </div>
        </div>
        <div class="flex shrink-0 items-center gap-1.5 xl:justify-start">
            <Button
                class="h-9 gap-1.5 rounded-[var(--radius-md)] px-2.5 text-[0.8125rem] tabular-nums"
                variant="outline"
                href="https://github.com/mielsense/mielui"
                target="_blank"
                rel="noreferrer"
                aria-label={starCount === null
                    ? 'Star mielui on GitHub'
                    : `${formatStarCount(starCount)} GitHub stars`}
            >
                <img src={GitHubBlack} alt="" class="size-[0.9375rem] dark:hidden" />
                <img src={GitHubWhite} alt="" class="size-[0.9375rem] hidden dark:block" />
                <span>{formatStarCount(starCount)}</span>
            </Button>

            <Button
                class="size-9 rounded-[var(--radius-md)]"
                variant="outline"
                onclick={() => {
                    toggleMode();
                }}
                size="icon"
                aria-label={mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                <span
                    class="inline-flex size-4"
                    aria-hidden="true"
                    use:morph={{ key: mode.current }}
                >
                    <HugeiconsIcon icon={mode.current === 'dark' ? Moon : Sun} size={16} />
                </span>
            </Button>
        </div>
    </header>

    <Sheet.Content side="left" class="p-0 sm:hidden">
        <Sheet.Title class="sr-only">Browse mielui</Sheet.Title>
        <Sheet.Description class="sr-only">
            Documentation and component categories.
        </Sheet.Description>
        <header class="flex shrink-0 items-center justify-between px-3 py-3">
            <a
                href={resolve('/')}
                class="font-semibold tracking-tight text-foreground no-underline"
            >
                mielui
            </a>
            <Sheet.Close aria-label="Close navigation menu" variant="quiet" size="icon">
                <HugeiconsIcon icon={X} size={18} />
            </Sheet.Close>
        </header>

        <div class="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <section class="flex flex-col gap-2 ">
                <h2 class="mb-2 text-sm text-foreground-muted">Navigate</h2>
                {#each navItems as item (item.href)}
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={closeMobileMenu}
                        href={item.href}
                    >
                        {item.label}
                    </Button>
                {/each}
            </section>

            <section class="flex flex-col gap-2 mt-10">
                <h2 class="mb-2 text-sm text-foreground-muted">Getting Started</h2>
                {#each docsPages as item (item.href)}
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={closeMobileMenu}
                        href={item.href}
                    >
                        {item.title}
                    </Button>
                {/each}
            </section>

            {#each navigationGroups as group (group.id)}
                <section class="mt-10 flex flex-col gap-2">
                    <h2 class="mb-2 text-sm text-foreground-muted">{group.heading}</h2>
                    {#each group.items as component (component)}
                        <Button
                            variant="quiet"
                            class="w-full justify-start"
                            onclick={closeMobileMenu}
                            href={`/docs/${group.id === 'actions' ? 'actions' : 'components'}/${component}`}
                        >
                            {sanitizeComponent(component)}
                        </Button>
                    {/each}
                    {#if group.items.length === 0}
                        <p class="text-sm text-foreground-muted">No chart components yet.</p>
                    {/if}
                </section>
            {/each}
        </div>
    </Sheet.Content>
</Sheet.Root>
