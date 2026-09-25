<script lang="ts">
    import {
        ArrowRight01Icon as ChevronRight,
        Home01Icon as Home
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import SearchButton from '$lib/components/search/trigger.svelte';
    import FloatingInspector from '$lib/components/shell/floating-inspector.svelte';
    import HeaderActions from '$lib/components/shell/header-actions.svelte';
    import Logo from '../logo.svelte';
    import { getBreadcrumbs } from './breadcrumbs';
    import Navigation from './navigation.svelte';

    const { starCount = null }: { starCount?: number | null } = $props();

    const breadcrumbs = $derived(getBreadcrumbs(page.url.pathname));
</script>

<div class="min-w-0">
    <header
        class="relative z-20 mx-auto flex h-[calc(var(--docs-row-height)-var(--border-size))] w-full shrink-0 items-center justify-between gap-4 px-2 sm:px-5"
    >
        <div class="mx-auto flex flex-1 min-w-0 items-center justify-between gap-4">
            <div class="flex shrink-0 items-center gap-3 pr-4 border-r border-border/50">
                <FloatingInspector title="Navigation" storageKey="mielui:docs-sidebar-pinned">
                    {#snippet children(close)}
                        <Navigation {close} />
                    {/snippet}
                </FloatingInspector>
                <div class="hidden sm:block"><Logo /></div>
            </div>

            <nav aria-label="Breadcrumb" class="hidden flex-1 min-w-0 sm:block">
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
                    class="border-border/60 h-9 rounded-[var(--radius-md)] px-2.5 text-[0.8125rem]"
                    variant="quiet"
                    href={resolve('/studio')}
                >
                    Studio
                </Button>
            </div>
        </div>
        <HeaderActions {starCount} />
    </header>
</div>
