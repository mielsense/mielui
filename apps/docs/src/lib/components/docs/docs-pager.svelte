<script lang="ts">
    import {
        ArrowLeft01Icon as ChevronLeft,
        ArrowRight01Icon as ChevronRight
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { page } from '$app/state';
    import { componentDocPages } from '$lib/docs-pages';

    type Page = {
        href: string;
        label: string;
    };

    const docsPages: Page[] = [
        { href: '/docs/introduction', label: 'Introduction' },
        { href: '/docs/installation', label: 'Installation' },
        { href: '/docs/theming', label: 'Theming' },
        { href: '/docs/agent-skill', label: 'Agent skill' },
        { href: '/docs/changelog', label: 'Changelog' },
        { href: '/docs/components', label: 'Components' }
    ];

    const pages = [...docsPages, ...componentDocPages];
    const pageIndex = $derived(pages.findIndex((item) => item.href === page.url.pathname));
    const prevPage = $derived<Page | undefined>(pageIndex > 0 ? pages[pageIndex - 1] : undefined);
    const nextPage = $derived<Page | undefined>(pageIndex >= 0 ? pages[pageIndex + 1] : undefined);
</script>

<nav
    aria-label="Adjacent pages"
    class="flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:flex-nowrap xl:w-full"
>
    <div class="flex shrink-0 flex-nowrap items-center gap-1.5 xl:w-full xl:justify-between">
        {#if prevPage}
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        href={prevPage.href}
                        variant="outline"
                        size="icon"
                        class="size-8 border-border/60"
                        aria-label={`Previous: ${prevPage.label}`}
                    >
                        <HugeiconsIcon icon={ChevronLeft} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>{`Previous: ${prevPage.label}`}</Tooltip.Content>
            </Tooltip.Root>
        {:else}
            <span class="hidden xl:block" aria-hidden="true"></span>
        {/if}
        {#if nextPage}
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        href={nextPage.href}
                        variant="outline"
                        size="icon"
                        class="size-8 border-border/60"
                        aria-label={`Next: ${nextPage.label}`}
                    >
                        <HugeiconsIcon icon={ChevronRight} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>{`Next: ${nextPage.label}`}</Tooltip.Content>
            </Tooltip.Root>
        {/if}
    </div>
</nav>
