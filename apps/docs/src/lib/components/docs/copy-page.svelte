<script lang="ts">
    import {
        ArrowDown01Icon as ArrowDownIcon,
        Tick02Icon as CheckIcon,
        Copy01Icon as CopyIcon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import * as Popover from '@mielui/svelte/components/popover';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { travelingHighlight } from '@mielui/svelte/utils';
    import { tick } from 'svelte';
    import { page } from '$app/state';

    let open = $state(false);
    let menu = $state<HTMLDivElement>();
    let status = $state<'idle' | 'loading' | 'copied' | 'error'>('idle');
    let timer: ReturnType<typeof setTimeout> | undefined;
    let request: AbortController | undefined;
    const markdownPath = $derived(`${page.url.pathname.replace(/\/$/, '')}.md`);
    const prompt = $derived(
        `Read ${new URL(markdownPath, 'https://ui.miel.my').href} so I can ask questions about it. Use Svelte 5 when writing examples.`
    );
    const links = $derived([
        { label: 'View as Markdown', href: markdownPath },
        { label: 'Open in v0', href: `https://v0.dev/?q=${encodeURIComponent(prompt)}` },
        { label: 'Open in ChatGPT', href: `https://chatgpt.com/?q=${encodeURIComponent(prompt)}` },
        { label: 'Open in Claude', href: `https://claude.ai/new?q=${encodeURIComponent(prompt)}` },
        { label: 'Open in Scira', href: `https://scira.ai/?q=${encodeURIComponent(prompt)}` }
    ]);

    function navigateMenu(event: KeyboardEvent) {
        const items = [...(menu?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? [])];
        const active =
            document.activeElement instanceof HTMLAnchorElement
                ? items.indexOf(document.activeElement)
                : -1;
        let index: number;
        if (event.key === 'ArrowDown') {
            index = (active + 1) % items.length;
        } else if (event.key === 'ArrowUp') {
            index = (active - 1 + items.length) % items.length;
        } else if (event.key === 'Home') {
            index = 0;
        } else if (event.key === 'End') {
            index = items.length - 1;
        } else {
            return;
        }
        event.preventDefault();
        items[index]?.focus();
    }

    $effect(() => {
        if (open) {
            void tick().then(() => {
                if (open) {
                    menu?.querySelector<HTMLAnchorElement>('[role="menuitem"]')?.focus();
                }
            });
        }
    });

    async function copy() {
        request?.abort();
        const current = new AbortController();
        request = current;
        status = 'loading';
        try {
            const response = await fetch(markdownPath, { signal: current.signal });
            if (!response.ok) {
                throw new Error('Unable to load page');
            }
            const markdown = await response.text();
            if (current.signal.aborted) {
                return;
            }
            await navigator.clipboard.writeText(markdown);
            if (current.signal.aborted) {
                return;
            }
            status = 'copied';
        } catch {
            if (current.signal.aborted) {
                return;
            }
            status = 'error';
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            status = 'idle';
        }, 2500);
    }

    $effect(() => {
        page.url.pathname;
        status = 'idle';
        return () => {
            request?.abort();
            clearTimeout(timer);
        };
    });
</script>

<div class="flex flex-col items-end gap-1">
    <Popover.Root placement="bottom-end" bind:open>
        <Group.Root aria-label="Page actions">
            <Button variant="outline" size="sm" onclick={copy} disabled={status === 'loading'}>
                <HugeiconsIcon icon={status === 'copied' ? CheckIcon : CopyIcon} size={15} />
                {status === 'copied' ? 'Copied' : status === 'loading' ? 'Copying…' : 'Copy page'}
            </Button>
            <Group.Separator />
            <Popover.Trigger
                variant="outline"
                size="sm"
                class="px-2"
                aria-label="More page actions"
                aria-haspopup="menu"
            >
                <HugeiconsIcon icon={ArrowDownIcon} size={15} />
            </Popover.Trigger>
        </Group.Root>
        <Popover.Content role="menu" focusTrap={false} lockScroll={false} surfaceClass="p-1">
            <div
                role="presentation"
                bind:this={menu}
                use:travelingHighlight
                onkeydown={navigateMenu}
                class="flex flex-col"
            >
                {#each links as link (link.label)}
                    <a
                        role="menuitem"
                        onclick={() => { open = false; }}
                        data-collection-item
                        class="mielui-menu-item flex text-sm hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.label}
                    </a>
                {/each}
            </div>
        </Popover.Content>
    </Popover.Root>
    <span role="status" class={status === 'error' ? 'text-sm text-foreground-muted' : 'sr-only'}>
        {status === 'error' ? 'Could not copy. Open the Markdown page to copy it manually.' : status === 'copied' ? 'Page copied to clipboard.' : ''}
    </span>
</div>
