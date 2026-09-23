<script lang="ts">
    import { File01Icon as FileIcon } from '@hugeicons/core-free-icons';
    import * as Command from '@mielui/svelte/components/command';
    import Kbd from '@mielui/svelte/components/kbd';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { afterNavigate } from '$app/navigation';
    import { navigationGroups, sanitizeComponent } from '$lib/components';
    import { componentGuidePages } from '$lib/docs-pages';

    import { getSearch } from './context';

    import { pages } from './pages';

    const search = getSearch();
    let query = $state('');
    const suggestedPages = pages.filter((item) => {
        return [
            '/docs/introduction',
            '/docs/installation',
            '/docs/components',
            '/docs/theming',
            '/studio'
        ].includes(item.href);
    });

    $effect(() => {
        if (!search.open) {
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

    afterNavigate(() => {
        search.open = false;
    });
</script>

<svelte:window onkeydown={handleKeydown} />

<Command.Root bind:open={search.open}>
    <Command.Content
        surface="glass"
        label="Search documentation"
        class="[&>[data-ui=dialog-surface]]:bg-transparent! [&_[role=listbox]]:rounded-[var(--radius-lg)] [&_[role=listbox]]:bg-background/70 [&_[role=listbox]]:border [&_[role=listbox]]:border-border/60 [&_div:has(>input[role=combobox])]:border-0 md:top-[var(--mielui-viewport-center)] max-w-[32rem] max-h-[min(27rem,calc(var(--mielui-viewport-height)-var(--overlay-gutter)))] [&_[role=listbox]]:min-h-0 [&_[role=listbox]]:flex-1 [&_[role=listbox]]:p-1.5 [&_[role=combobox]]:text-sm [&_[role=combobox]]:placeholder:text-foreground-muted/70 [&_div:has(>input[role=combobox])]:h-12 [&_div:has(>input[role=combobox])]:shrink-0 [&_div:has(>input[role=combobox])]:px-4 [&_div:has(>input[role=combobox])>span[aria-hidden]]:hidden"
    >
        <Command.Search
            placeholder="Search documentation…"
            aria-label="Search documentation"
            oninput={(event) => {
                query = event.currentTarget.value;
            }}
        />
        <Command.Results>
            <Command.Group heading={query ? 'Pages' : 'Go to'}>
                {#each query ? pages : suggestedPages as item (item.href)}
                    <Command.Item class="min-h-9 px-2.5 py-1.5" name={item.label} href={item.href}>
                        <HugeiconsIcon
                            icon={FileIcon}
                            size={16}
                            class="shrink-0 text-foreground-muted"
                        />
                        {item.label}
                    </Command.Item>
                {/each}
            </Command.Group>
            {#if query}
                {#each navigationGroups as group (group.id)}
                    <Command.Group heading={group.heading}>
                        {#each group.items as item (item)}
                            <Command.Item
                                class="min-h-9 px-2.5 py-1.5"
                                name={sanitizeComponent(item)}
                                href={`/docs/${group.id === 'actions' ? 'actions' : 'components'}/${item}`}
                            >
                                <HugeiconsIcon
                                    icon={FileIcon}
                                    size={16}
                                    class="shrink-0 text-foreground-muted"
                                />
                                {sanitizeComponent(item)}
                            </Command.Item>
                            {#each componentGuidePages.filter((guide) => guide.component === item) as guide (guide.href)}
                                <Command.Item
                                    class="min-h-9 px-2.5 py-1.5"
                                    name={guide.title}
                                    href={guide.href}
                                >
                                    <HugeiconsIcon
                                        icon={FileIcon}
                                        size={16}
                                        class="shrink-0 text-foreground-muted"
                                    />
                                    {guide.title}
                                </Command.Item>
                            {/each}
                        {/each}
                    </Command.Group>
                {/each}
            {/if}
        </Command.Results>
        <div
            class="flex shrink-0 items-center justify-between px-4 py-2 text-xs text-foreground-muted"
        >
            <span class="flex items-center gap-1.5"><Kbd shortcut="enter" /> Open page</span>
            <span class="flex items-center gap-1.5"><Kbd shortcut="esc" /> Close</span>
        </div>
    </Command.Content>
</Command.Root>
