<script lang="ts">
    import {
        ArrowLeft01Icon as ChevronLeft,
        ArrowRight01Icon as ChevronRight
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { page } from '$app/state';
    import { components, sanitizeComponent } from '$lib/components';

    type Page = {
        href: string;
        label: string;
    };

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
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        href={prevPage.href}
                        variant="outline"
                        size="icon"
                        class="size-8"
                        aria-label={`Previous: ${prevPage.label}`}
                    >
                        <HugeiconsIcon icon={ChevronLeft} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>{`Previous: ${prevPage.label}`}</Tooltip.Content>
            </Tooltip.Root>
        {/if}
        {#if nextPage}
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        href={nextPage.href}
                        variant="outline"
                        size="icon"
                        class="size-8"
                        aria-label={`Next: ${nextPage.label}`}
                    >
                        <HugeiconsIcon icon={ChevronRight} size={16} />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>{`Next: ${nextPage.label}`}</Tooltip.Content>
            </Tooltip.Root>
        {/if}
    </nav>
{/if}
