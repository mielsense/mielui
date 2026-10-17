<script lang="ts">
    import {
        CodeIcon as Code,
        HashtagIcon as Hash,
        Moon02Icon as Moon,
        Add01Icon as Plus,
        Sun03Icon as Sun
    } from '@hugeicons/core-free-icons';
    import * as Command from '@mielui/svelte/components/command';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { afterNavigate } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { pageIcon } from '$lib/components/shell/page-icon';
    import { getShell } from '$lib/components/shell/shell.svelte';

    import { getSearch } from './context';
    import { components, guides, matchEntries, type PaletteEntry, places } from './entries';
    import { createSearchIndex } from './search-index.svelte';

    const search = getSearch();
    const shell = getShell();
    const index = createSearchIndex();
    let query = $state('');

    const openTabs = $derived(
        shell.tabs.tabs
            .filter((tab) => tab.id !== shell.tabs.active)
            .map((tab) => ({
                label: tab.label,
                href: tab.href,
                hint: 'Open tab',
                icon: pageIcon(tab.href)
            }))
    );
    const themeLabel = $derived(
        mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );

    const needle = $derived(query.trim().toLowerCase());
    const sectionMatches = $derived(matchEntries(index.current?.sections, needle, 8));
    const propMatches = $derived(matchEntries(index.current?.props, needle, 14));

    $effect(() => {
        if (search.open) {
            void index.load();
        } else {
            query = '';
        }
    });

    function handleKeydown(event: KeyboardEvent) {
        if (
            (event.metaKey || event.ctrlKey) &&
            event.key.toLowerCase() === 'k' &&
            !event.altKey &&
            !event.isComposing
        ) {
            event.preventDefault();
            search.open = !search.open;
        }
    }

    function run(action: () => void) {
        search.open = false;
        action();
    }

    afterNavigate(() => {
        search.open = false;
    });
</script>

<svelte:window onkeydown={handleKeydown} />

<Command.Root bind:open={search.open} labels={{ palette: 'Search documentation' }}>
    <Command.Content
        class="max-h-[min(25rem,calc(var(--mielui-viewport-height)-var(--overlay-gutter)))] max-w-[34rem] [&_[data-collection-item]]:h-8 [&_[data-collection-item]]:text-sm [&_div:has(>input[role=combobox])]:h-13 [&_div:has(>input[role=combobox])]:px-4 [&_input]:text-[15px]"
    >
        <Command.Header class="flex items-center gap-4 px-4 pt-3 pb-3 text-[13px]">
            <span class="flex items-center gap-1.5">
                <Kbd shortcut="up" />
                <Kbd shortcut="down" />
                Navigate
            </span>
            <span class="flex items-center gap-1.5">
                <Kbd shortcut="enter" />
                Open
            </span>
            <span class="ms-auto flex items-center gap-1.5">
                <Kbd shortcut="esc" />
                Close
            </span>
        </Command.Header>
        <Command.Search
            placeholder="Search pages and components…"
            aria-label="Search documentation"
            oninput={(event) => {
                query = event.currentTarget.value;
            }}
        />
        <Command.Results
            class="[mask-image:linear-gradient(to_bottom,transparent,black_calc(var(--spacing)*4),black_calc(100%-var(--spacing)*6),transparent)] px-2 py-2"
        >
            {#if !query && openTabs.length}
                <Command.Group heading="Open tabs">
                    {#each openTabs as entry (entry.href)}
                        {@render row(entry)}
                    {/each}
                </Command.Group>
            {/if}
            <Command.Group heading="Guides">
                {#each guides as entry (entry.href)}
                    {@render row(entry)}
                {/each}
            </Command.Group>
            <Command.Group heading="Go to">
                {#each places as entry (entry.href)}
                    {@render row(entry)}
                {/each}
            </Command.Group>
            <Command.Group heading="Actions">
                <Command.Item name={themeLabel} callback={() => run(toggleMode)}>
                    <HugeiconsIcon
                        icon={mode.current === 'dark' ? Sun : Moon}
                        size={16}
                        class="shrink-0 text-foreground-muted"
                    />
                    <span class="min-w-0 flex-1 truncate">{themeLabel}</span>
                </Command.Item>
                <Command.Item
                    name="Open a new tab"
                    callback={() => run(() => shell.tabs.open(resolve('/docs/components')))}
                >
                    <HugeiconsIcon icon={Plus} size={16} class="shrink-0 text-foreground-muted" />
                    <span class="min-w-0 flex-1 truncate">Open a new tab</span>
                </Command.Item>
            </Command.Group>
            {#if query}
                <Command.Group heading="Components">
                    {#each components as entry (entry.href)}
                        {@render row(entry)}
                    {/each}
                </Command.Group>
            {/if}
            {#if sectionMatches.length}
                <Command.Group heading="Sections">
                    {#each sectionMatches as entry (`${entry.href}:${entry.label}`)}
                        {@render row({ ...entry, icon: Hash })}
                    {/each}
                </Command.Group>
            {/if}
            {#if propMatches.length}
                <Command.Group heading="Props">
                    {#each propMatches as entry (`${entry.href}:${entry.hint}:${entry.label}`)}
                        {@render row({ ...entry, icon: Code })}
                    {/each}
                </Command.Group>
            {/if}
        </Command.Results>
    </Command.Content>
</Command.Root>

{#snippet row(entry: PaletteEntry)}
    <Command.Item name={`${entry.label} ${entry.hint}`} href={entry.href}>
        <HugeiconsIcon icon={entry.icon} size={16} class="shrink-0 text-foreground-muted" />
        <span class="min-w-0 flex-1 truncate">{entry.label}</span>
        {#if entry.hint}
            <span class="shrink-0 text-[13px] text-foreground-muted">{entry.hint}</span>
        {/if}
    </Command.Item>
{/snippet}
