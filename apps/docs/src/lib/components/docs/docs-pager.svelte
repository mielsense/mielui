<script lang="ts">
    import {
        ArrowLeft01Icon as ChevronLeft,
        ArrowRight01Icon as ChevronRight
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { page } from '$app/state';
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

{#if prevPage || nextPage}
    <nav
        aria-label="Adjacent pages"
        class="mt-16 flex items-center justify-between gap-4 border-t border-[var(--docs-rule)] pt-5"
    >
        {#if prevPage}
            <Button href={prevPage.href} variant="ghost" class="-ms-3 min-w-0">
                <HugeiconsIcon icon={ChevronLeft} size={16} />
                <span class="sr-only">Previous:</span>
                <span class="truncate">{prevPage.label}</span>
            </Button>
        {/if}
        {#if nextPage}
            <Button href={nextPage.href} variant="ghost" class="ms-auto -me-3 min-w-0">
                <span class="sr-only">Next:</span>
                <span class="truncate">{nextPage.label}</span>
                <HugeiconsIcon icon={ChevronRight} size={16} />
            </Button>
        {/if}
    </nav>
{/if}
