<script lang="ts">
    import { Home01Icon as Home } from '@hugeicons/core-free-icons';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import { Button } from '@mielui/svelte/components/button';
    import { Separator } from '@mielui/svelte/components/separator';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import SearchButton from '$lib/components/search/trigger.svelte';
    import FloatingInspector from '$lib/components/shell/floating-inspector.svelte';
    import HeaderActions from '$lib/components/shell/header-actions.svelte';
    import { getBreadcrumbs } from './breadcrumbs';
    import Navigation from './navigation.svelte';

    const { starCount = null }: { starCount?: number | null } = $props();

    const breadcrumbs = $derived(getBreadcrumbs(page.url.pathname));
</script>

<header
    class="relative z-20 flex h-[calc(var(--docs-row-height)-var(--border-size))] w-full min-w-0 items-center gap-3 px-[var(--docs-icon-inset)]"
>
    <FloatingInspector title="Navigation" storageKey="mielui:docs-sidebar-pinned">
        {#snippet children(close)}
            <Navigation {close} />
        {/snippet}
    </FloatingInspector>

    <Separator orientation="vertical" class="hidden h-5! sm:block" />

    <div class="hidden min-w-0 flex-1 sm:block">
        <Breadcrumb.Root class="min-w-0">
            {#each breadcrumbs as breadcrumb, index (breadcrumb.href)}
                {const current = $derived(index === breadcrumbs.length - 1)}
                <Breadcrumb.Item
                    href={current ? undefined : breadcrumb.href}
                    {current}
                    class={`${index === 0 ? 'shrink-0' : 'min-w-0 truncate'} -mx-1 rounded-[var(--radius-sm)] px-1 py-0.5 transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]`}
                >
                    {#if index === 0}
                        <HugeiconsIcon icon={Home} size={16} class="block" />
                        <span class="sr-only">{breadcrumb.label}</span>
                    {:else}
                        {breadcrumb.label}
                    {/if}
                </Breadcrumb.Item>
                {#if !current}
                    <Breadcrumb.Separator class="shrink-0" />
                {/if}
            {/each}
        </Breadcrumb.Root>
    </div>

    <div class="ms-auto flex shrink-0 items-center gap-1">
        <SearchButton />
        <Button variant="ghost" href={resolve('/studio')}>Studio</Button>
        <HeaderActions {starCount} />
    </div>
</header>
