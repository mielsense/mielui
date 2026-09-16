<script lang="ts">
    import ChevronLeft from '@hugeicons/core-free-icons/ArrowLeft01Icon';
    import ChevronRight from '@hugeicons/core-free-icons/ArrowRight01Icon';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { page } from '$app/state';
    import { components, sanitizeComponent } from '$lib/components';

    type Page = { href: string; label: string };

    const docsPages: Page[] = [
        { href: '/docs/introduction', label: 'Introduction' },
        { href: '/docs/installation', label: 'Installation' },
        { href: '/docs/theming', label: 'Theming' },
        { href: '/docs/changelog', label: 'Changelog' },
        { href: '/docs/components', label: 'Components' }
    ];

    const pages = $derived([
        ...docsPages,
        ...components.map((component) => ({
            href: `/docs/components/${component}`,
            label: sanitizeComponent(component)
        }))
    ]);
    const pageIndex = $derived(pages.findIndex((item) => item.href === page.url.pathname));
    const prevPage = $derived<Page | undefined>(pageIndex > 0 ? pages[pageIndex - 1] : undefined);
    const nextPage = $derived<Page | undefined>(pageIndex >= 0 ? pages[pageIndex + 1] : undefined);
</script>

{#if prevPage || nextPage}
    <nav class="flex items-center gap-1.5">
        {#if prevPage}
            <Button
                href={prevPage.href}
                variant="outline"
                size="icon"
                class="size-8"
                aria-label={`Previous: ${prevPage.label}`}
                title={`Previous: ${prevPage.label}`}
            >
                <HugeiconsIcon icon={ChevronLeft} size={16} />
            </Button>
        {/if}
        {#if nextPage}
            <Button
                href={nextPage.href}
                variant="outline"
                size="icon"
                class="size-8"
                aria-label={`Next: ${nextPage.label}`}
                title={`Next: ${nextPage.label}`}
            >
                <HugeiconsIcon icon={ChevronRight} size={16} />
            </Button>
        {/if}
    </nav>
{/if}
