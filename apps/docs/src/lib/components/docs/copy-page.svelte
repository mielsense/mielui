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
    import { page } from '$app/state';

    let open = $state(false);
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
    <Popover.Root bind:open placement="top-end">
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
            >
                <HugeiconsIcon icon={ArrowDownIcon} size={15} />
            </Popover.Trigger>
        </Group.Root>
        <Popover.Content class="w-48" surfaceClass="p-1" focusTrap={false} lockScroll={false}>
            <nav aria-label="Page resources" class="flex flex-col">
                {#each links as link (link.label)}
                    <Button
                        variant="quiet"
                        class="justify-start"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onclick={() => { open = false; }}
                    >
                        {link.label}
                    </Button>
                {/each}
            </nav>
        </Popover.Content>
    </Popover.Root>
    <span role="status" class={status === 'error' ? 'text-sm text-foreground-muted' : 'sr-only'}>
        {status === 'error' ? 'Could not copy. Open the Markdown page to copy it manually.' : status === 'copied' ? 'Page copied to clipboard.' : ''}
    </span>
</div>
