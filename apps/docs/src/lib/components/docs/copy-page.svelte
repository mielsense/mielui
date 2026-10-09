<script lang="ts">
    import {
        ArrowDown01Icon as ArrowDownIcon,
        Copy01Icon as CopyIcon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import * as Popover from '@mielui/svelte/components/popover';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { page } from '$app/state';

    let open = $state(false);
    let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
    let timer: ReturnType<typeof setTimeout> | undefined;
    let request: AbortController | undefined;
    const statusMessage = $derived(
        status === 'error'
            ? 'Could not copy. Open the Markdown page to copy it manually.'
            : status === 'success'
              ? 'Page copied to clipboard.'
              : ''
    );
    const markdownPath = $derived(`${page.url.pathname.replace(/\/$/, '')}.md`);
    const prompt = $derived(
        `Read ${new URL(markdownPath, 'https://ui.miel.my').href} so I can ask questions about it. Use Svelte 5 when writing examples.`
    );
    const links = $derived([
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
            status = 'success';
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

<Popover.Root bind:open placement="bottom-end">
    <Group.Root aria-label="Page actions">
        <Button
            variant="ghost"
            size="sm"
            {status}
            loadingLabel="Copying…"
            successLabel="Copied"
            errorLabel="Copy failed"
            onclick={copy}
        >
            <HugeiconsIcon icon={CopyIcon} size={14} />
            Copy page
        </Button>
        <Group.Separator />
        <Popover.Trigger
            variant="ghost"
            size="icon"
            class="size-[var(--size-control-sm)]"
            aria-label="More page actions"
        >
            <HugeiconsIcon icon={ArrowDownIcon} size={14} />
        </Popover.Trigger>
    </Group.Root>
    <Popover.Content class="w-48" surfaceClass="p-1" focusTrap={false} lockScroll={false}>
        <nav aria-label="Page resources" class="flex flex-col gap-0.5">
            {#each links as link (link.label)}
                {@render resource(link.label, link.href)}
            {/each}
            <div role="separator" class="mx-2 my-0.5 h-[length:var(--border-size)] bg-border"></div>
            {@render resource('View as Markdown', markdownPath)}
        </nav>
    </Popover.Content>
</Popover.Root>
{#snippet resource(label: string, href: string)}
    <Button
        variant="ghost"
        size="sm"
        class="w-full justify-start px-2 text-sm"
        {href}
        target="_blank"
        rel="noopener noreferrer"
        onclick={() => {
            open = false;
        }}
    >
        {label}
    </Button>
{/snippet}

<span role="status" class="sr-only">
    {statusMessage}
</span>
