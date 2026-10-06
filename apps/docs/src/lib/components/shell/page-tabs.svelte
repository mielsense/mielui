<script lang="ts">
    import { Add01Icon as Plus } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { getBreadcrumbs } from '$lib/components/docs/breadcrumbs';
    import { pageIcon } from './page-icon';
    import { getShell } from './shell.svelte';
    import TabPill from './tab-pill.svelte';

    const shell = getShell();
    const fallback = $derived([
        {
            id: 'current',
            href: page.url.pathname,
            label: getBreadcrumbs(page.url.pathname).at(-1)?.label ?? 'Docs'
        }
    ]);
    const tabs = $derived(shell.tabs.tabs.length ? shell.tabs.tabs : fallback);
    const active = $derived(shell.tabs.tabs.length ? shell.tabs.active : 'current');

    function openNew() {
        shell.tabs.open(resolve('/docs/components'));
    }
</script>

<span class="min-w-0 truncate text-sm font-medium text-foreground sm:hidden">
    {tabs.find((tab) => tab.id === active)?.label}
</span>
<div class="hidden min-w-0 flex-1 items-center gap-1.5 sm:flex">
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button
                variant="ghost"
                size="icon"
                aria-label="Open a new tab"
                class="size-8 shrink-0 rounded-[var(--radius-sm)] text-foreground-muted hover:text-foreground"
                onclick={openNew}
            >
                <HugeiconsIcon icon={Plus} size={16} />
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>New tab</Tooltip.Content>
    </Tooltip.Root>
    <nav
        aria-label="Open pages"
        class="hide-scrollbar-all flex min-w-0 flex-1 items-center gap-1 overflow-x-auto p-0.5"
    >
        {#each tabs as tab (tab.id)}
            <TabPill
                fixed
                label={tab.label}
                icon={pageIcon(tab.href)}
                href={tab.href}
                current={tab.id === active}
                onclose={tabs.length > 1 ? () => shell.tabs.close(tab.id) : undefined}
            />
        {/each}
    </nav>
</div>
