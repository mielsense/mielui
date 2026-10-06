<script lang="ts">
    import {
        Tick02Icon as Check,
        ArrowLeft01Icon as ChevronLeft,
        ArrowRight01Icon as ChevronRight,
        Copy01Icon as Copy,
        ComputerTerminal01Icon as Terminal
    } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { components } from '$lib/components';
    import { allDocPages } from '$lib/docs-pages';
    import manifest from '../../../../../../packages/mielui/package.json';

    const component = $derived.by(() => {
        const segments = page.url.pathname.split('/').filter(Boolean);
        if (segments[0] !== 'docs' || segments[1] !== 'components') {
            return undefined;
        }

        return components.find((name) => name === segments[2]);
    });
    const command = $derived(
        component ? `pnpm dlx @mielui/svelte add ${component}` : 'pnpm add @mielui/svelte'
    );
    const pageIndex = $derived(allDocPages.findIndex((entry) => entry.href === page.url.pathname));
    const previous = $derived(pageIndex > 0 ? allDocPages[pageIndex - 1] : undefined);
    const next = $derived(pageIndex >= 0 ? allDocPages[pageIndex + 1] : undefined);

    let copied = $state(false);
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function copy() {
        try {
            await navigator.clipboard.writeText(command);
            copied = true;
        } catch {
            copied = false;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            copied = false;
        }, 1800);
    }

    $effect(() => {
        return () => {
            clearTimeout(timer);
        };
    });

    const itemClass =
        'inline-flex h-6 min-w-0 items-center gap-1.5 rounded-[6px] px-1.5 transition-colors [transition-duration:var(--motion-duration-hover)] hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none';
</script>

<div
    class="hidden h-9 shrink-0 items-center gap-1 ps-2.5 pe-0.5 pb-px text-[13px] text-white/55 lg:flex"
>
    <a href={resolve('/docs/changelog')} class={itemClass}>
        <span aria-hidden="true" class="size-1.5 rounded-full bg-primary"></span>
        <span class="font-medium tabular-nums text-white/90">{`mielui ${manifest.version}`}</span>
    </a>
    <span class="px-1.5">{`${components.length} components`}</span>
    <span aria-hidden="true" class="mx-1 h-3 w-px bg-white/15"></span>
    <button type="button" class={itemClass} aria-label={`Copy command: ${command}`} onclick={copy}>
        <HugeiconsIcon icon={Terminal} size={14} aria-hidden="true" />
        <code class="min-w-0 truncate font-mono text-xs">{command}</code>
        <HugeiconsIcon icon={copied ? Check : Copy} size={13} aria-hidden="true" />
    </button>
    <span role="status" class="sr-only">{copied ? 'Command copied.' : ''}</span>
    {#if previous || next}
        <nav aria-label="Adjacent pages" class="ms-auto flex min-w-0 items-center gap-1">
            {#if previous}
                <a href={previous.href} class={itemClass}>
                    <HugeiconsIcon icon={ChevronLeft} size={12} aria-hidden="true" />
                    <span class="sr-only">Previous:</span>
                    <span class="truncate">{previous.label}</span>
                </a>
            {/if}
            {#if next}
                <a href={next.href} class={`${itemClass} text-white/85`}>
                    <span class="sr-only">Next:</span>
                    <span class="truncate">{next.label}</span>
                    <HugeiconsIcon icon={ChevronRight} size={12} aria-hidden="true" />
                </a>
            {/if}
        </nav>
    {/if}
</div>
