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
    <nav aria-label="Adjacent pages" class="mt-16 grid grid-cols-2 gap-3">
        {#if prevPage}
            <Button
                href={prevPage.href}
                variant="panel"
                class="h-auto min-w-0 flex-col items-start gap-1 px-5 py-4 whitespace-normal"
            >
                <span class="flex items-center gap-1.5 text-xs font-normal text-foreground-muted">
                    <HugeiconsIcon icon={ChevronLeft} size={12} />
                    Previous
                </span>
                <span class="max-w-full truncate text-[15px] leading-6">{prevPage.label}</span>
            </Button>
        {/if}
        {#if nextPage}
            <Button
                href={nextPage.href}
                variant="panel"
                class="col-start-2 h-auto min-w-0 flex-col items-end gap-1 px-5 py-4 whitespace-normal"
            >
                <span class="flex items-center gap-1.5 text-xs font-normal text-foreground-muted">
                    Next
                    <HugeiconsIcon icon={ChevronRight} size={12} />
                </span>
                <span class="max-w-full truncate text-[15px] leading-6">{nextPage.label}</span>
            </Button>
        {/if}
    </nav>
{/if}
