<script lang="ts">
    import {
        Clock01Icon as Clock,
        CodeIcon as Code,
        HashtagIcon as Hash,
        Moon02Icon as Moon,
        PaintBoardIcon as Palette,
        Add01Icon as Plus,
        Sun03Icon as Sun,
        SwatchIcon as Swatch
    } from '@hugeicons/core-free-icons';
    import * as Command from '@mielui/svelte/components/command';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { afterNavigate } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { componentTypes, navigationGroups, sanitizeComponent } from '$lib/components';
    import { pageIcon, type ShellIcon } from '$lib/components/shell/page-icon';
    import { getShell } from '$lib/components/shell/shell.svelte';
    import { componentGuidePages } from '$lib/docs-pages';

    import { getSearch } from './context';
    import type { SearchEntry, SearchIndex } from './types';

    type Entry = {
        label: string;
        href: string;
        hint: string;
        icon: ShellIcon;
    };

    const search = getSearch();
    const shell = getShell();
    let query = $state('');

    const guides: Entry[] = [
        { label: 'Introduction', href: resolve('/docs/introduction') },
        { label: 'Installation', href: resolve('/docs/installation') },
        { label: 'Theming', href: resolve('/docs/theming') },
        { label: 'All components', href: resolve('/docs/components') },
        { label: 'Agent skill', href: resolve('/docs/agent-skill') }
    ].map((entry) => ({ ...entry, hint: '', icon: pageIcon(entry.href) }));

    const places: Entry[] = [
        { label: 'Theme Studio', href: resolve('/studio'), hint: 'Workspace', icon: Palette },
        { label: 'Themes', href: resolve('/themes'), hint: 'Presets', icon: Swatch },
        { label: 'Changelog', href: resolve('/docs/changelog'), hint: 'Releases', icon: Clock }
    ];

    function typeOf(component: string) {
        return componentTypes.find((type) => type.items.includes(component))?.heading;
    }

    const components: Entry[] = navigationGroups.flatMap((group) =>
        group.items.flatMap((item) => {
            const href = `/docs/${group.id === 'actions' ? 'actions' : 'components'}/${item}`;

            return [
                {
                    label: sanitizeComponent(item),
                    href,
                    hint: typeOf(item) ?? group.heading,
                    icon: pageIcon(href)
                },
                ...componentGuidePages
                    .filter((guide) => guide.component === item)
                    .map((guide) => ({
                        label: guide.title,
                        href: guide.href,
                        hint: sanitizeComponent(item),
                        icon: pageIcon(guide.href)
                    }))
            ];
        })
    );

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

    let index = $state<SearchIndex>();
    let indexRequested = false;

    const needle = $derived(query.trim().toLowerCase());
    const sectionMatches = $derived(matchEntries(index?.sections, 8));
    const propMatches = $derived(matchEntries(index?.props, 14));

    function matchEntries(entries: SearchEntry[] | undefined, limit: number) {
        if (!entries || needle.length < 2) {
            return [];
        }
        const starts = entries.filter((entry) => entry.label.toLowerCase().startsWith(needle));
        const contains = entries.filter((entry) => {
            const label = entry.label.toLowerCase();

            return !label.startsWith(needle) && label.includes(needle);
        });

        return [...starts, ...contains].slice(0, limit);
    }

    async function loadIndex() {
        if (indexRequested) {
            return;
        }
        indexRequested = true;
        try {
            const response = await fetch(resolve('/api/search-index.json'));
            if (response.ok) {
                index = await response.json();
            }
        } catch {
            indexRequested = false;
        }
    }

    $effect(() => {
        if (search.open) {
            void loadIndex();
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

<Command.Root bind:open={search.open}>
    <Command.Content
        label="Search documentation"
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

{#snippet row(entry: Entry)}
    <Command.Item name={`${entry.label} ${entry.hint}`} href={entry.href}>
        <HugeiconsIcon icon={entry.icon} size={16} class="shrink-0 text-foreground-muted" />
        <span class="min-w-0 flex-1 truncate">{entry.label}</span>
        {#if entry.hint}
            <span class="shrink-0 text-[13px] text-foreground-muted">{entry.hint}</span>
        {/if}
    </Command.Item>
{/snippet}
