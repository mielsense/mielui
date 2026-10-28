<script lang="ts">
    import {
        ArrowLeft01Icon as ChevronLeft,
        ArrowRight01Icon as ChevronRight
    } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { page } from '$app/state';
    import { lookFor } from '$lib/components/shell/look';
    import Sticker from '$lib/components/shell/sticker.svelte';
    import { allDocPages } from '$lib/docs-pages';

    type Page = {
        href: string;
        label: string;
    };

    const pages: Page[] = allDocPages;
    const pageIndex = $derived(pages.findIndex((item) => item.href === page.url.pathname));
    const prevPage = $derived<Page | undefined>(pageIndex > 0 ? pages[pageIndex - 1] : undefined);
    const nextPage = $derived<Page | undefined>(pageIndex >= 0 ? pages[pageIndex + 1] : undefined);
</script>

{#snippet step(item: Page, direction: 'Previous' | 'Next')}
    {const look = $derived(lookFor(item.href))}
    {const next = $derived(direction === 'Next')}
    <a
        href={item.href}
        class={`tile group/section press-soft flex min-w-0 items-center gap-3.5 p-4 hover:shadow-[0_0_0_1px_var(--color-border-strong),0_6px_20px_-10px_rgb(0_0_0/0.2)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none ${next ? 'flex-row-reverse text-end sm:col-start-2' : ''}`}
    >
        <Sticker icon={look.icon} mesh={look.mesh} size={32} />
        <span class="flex min-w-0 flex-1 flex-col gap-0.5">
            <span
                class={`flex items-center gap-1 text-xs text-foreground-muted ${next ? 'justify-end' : ''}`}
            >
                {#if !next}
                    <HugeiconsIcon icon={ChevronLeft} size={12} />
                {/if}
                {direction}
                {#if next}
                    <HugeiconsIcon icon={ChevronRight} size={12} />
                {/if}
            </span>
            <span class="truncate text-base text-foreground">{item.label}</span>
        </span>
    </a>
{/snippet}

{#if prevPage || nextPage}
    <nav aria-label="Adjacent pages" class="mt-16 grid gap-3 sm:grid-cols-2">
        {#if prevPage}
            {@render step(prevPage, 'Previous')}
        {/if}
        {#if nextPage}
            {@render step(nextPage, 'Next')}
        {/if}
    </nav>
{/if}
