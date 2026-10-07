<script lang="ts">
    import { Add01Icon as Plus } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { getBreadcrumbs } from '$lib/components/docs/breadcrumbs';
    import { pageIcon } from './page-icon';
    import { fadeX, scrollFade } from './scroll-fade';
    import { getShell } from './shell.svelte';
    import TabPill from './tab-pill.svelte';

    const shell = getShell();
    const fallback = $derived([
        {
            id: 'current',
            href: page.url.pathname,
            label:
                page.status >= 400
                    ? 'Page not found'
                    : (getBreadcrumbs(page.url.pathname).at(-1)?.label ?? 'Docs')
        }
    ]);
    const tabs = $derived(shell.tabs.tabs.length ? shell.tabs.tabs : fallback);
    const active = $derived(shell.tabs.tabs.length ? shell.tabs.active : 'current');

    let dragged = $state<string | null>(null);
    let target = $state<string | null>(null);

    function startDrag(event: DragEvent, id: string) {
        dragged = id;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', id);
        }
    }

    function dragOver(event: DragEvent, id: string) {
        if (dragged === null || dragged === id) {
            return;
        }
        event.preventDefault();
        target = id;
    }

    function place(id: string, onto: string) {
        const order = tabs.map((tab) => tab.id);
        const from = order.indexOf(id);
        const to = order.indexOf(onto);
        if (from < 0 || to < 0) {
            return;
        }
        shell.tabs.move(id, from < to ? (order[to + 1] ?? null) : onto);
    }

    function drop(event: DragEvent, id: string) {
        event.preventDefault();
        if (dragged !== null) {
            place(dragged, id);
        }
        endDrag();
    }

    function endDrag() {
        dragged = null;
        target = null;
    }

    function moveWithKeys(event: KeyboardEvent, id: string) {
        if (!event.altKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) {
            return;
        }
        const order = tabs.map((tab) => tab.id);
        const neighbour = order[order.indexOf(id) + (event.key === 'ArrowLeft' ? -1 : 1)];
        if (neighbour) {
            event.preventDefault();
            place(id, neighbour);
        }
    }

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
        {@attach scrollFade({ axis: 'x', size: 32 })}
        class={`hide-scrollbar-all flex min-w-0 flex-1 items-center gap-1 overflow-x-auto p-0.5 ${fadeX}`}
    >
        {#each tabs as tab (tab.id)}
            <div
                role="presentation"
                draggable={tabs.length > 1}
                ondragstart={(event) => startDrag(event, tab.id)}
                ondragover={(event) => dragOver(event, tab.id)}
                ondrop={(event) => drop(event, tab.id)}
                ondragend={endDrag}
                onkeydown={(event) => moveWithKeys(event, tab.id)}
                class={`shrink-0 rounded-[var(--radius-sm)] transition-opacity [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none ${dragged === tab.id ? 'opacity-40' : ''} ${target === tab.id ? 'shadow-[var(--focus-ring)]' : ''}`}
            >
                <TabPill
                    label={tab.label}
                    icon={pageIcon(tab.href)}
                    href={tab.href}
                    current={tab.id === active}
                    onclose={tabs.length > 1 ? () => shell.tabs.close(tab.id) : undefined}
                />
            </div>
        {/each}
    </nav>
</div>
