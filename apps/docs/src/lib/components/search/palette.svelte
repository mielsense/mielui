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
    <Command.Content surface="glass" label="Search documentation">
        <Command.Header class="flex items-center gap-3 text-sm">
            <span>Documentation</span>
            <span class="ms-auto flex items-center gap-1.5">
                <Kbd shortcut="enter" />
                open
            </span>
            <span class="flex items-center gap-1.5">
                <Kbd shortcut="esc" />
                close
            </span>
        </Command.Header>
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
                    <Command.Item name={item.label} href={item.href}>
                        <HugeiconsIcon icon={FileIcon} size={16} class="text-foreground-muted" />
                        {item.label}
                    </Command.Item>
                {/each}
            </Command.Group>
            {#if query}
                {#each navigationGroups as group (group.id)}
                    <Command.Group heading={group.heading}>
                        {#each group.items as item (item)}
                            <Command.Item
                                name={sanitizeComponent(item)}
                                href={`/docs/${group.id === 'actions' ? 'actions' : 'components'}/${item}`}
                            >
                                <HugeiconsIcon
                                    icon={FileIcon}
                                    size={16}
                                    class="text-foreground-muted"
                                />
                                {sanitizeComponent(item)}
                            </Command.Item>
                            {#each componentGuidePages.filter((guide) => guide.component === item) as guide (guide.href)}
                                <Command.Item name={guide.title} href={guide.href}>
                                    <HugeiconsIcon
                                        icon={FileIcon}
                                        size={16}
                                        class="text-foreground-muted"
                                    />
                                    {guide.title}
                                </Command.Item>
                            {/each}
                        {/each}
                    </Command.Group>
                {/each}
            {/if}
        </Command.Results>
    </Command.Content>
</Command.Root>
