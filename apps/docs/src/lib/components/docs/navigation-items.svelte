<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { page } from '$app/state';
    import { componentTypeHref, componentTypes, sanitizeComponent } from '$lib/components';
    import { componentGuidePages } from '$lib/docs-pages';

    let {
        group,
        onNavigate
    }: {
        group: { id: string; items: string[] };
        onNavigate?: () => void;
    } = $props();

    const entries = $derived.by(() => {
        if (group.id === 'components') {
            return componentTypes.flatMap((type) => [
                { href: componentTypeHref(type.id), label: type.heading, nested: false },
                ...type.items.map((component) => ({
                    href: `/docs/components/${component}`,
                    label: sanitizeComponent(component),
                    nested: true
                }))
            ]);
        }
        return group.items.flatMap((component) => [
            {
                href: `/docs/${group.id === 'actions' ? 'actions' : 'components'}/${component}`,
                label: sanitizeComponent(component),
                nested: false
            },
            ...componentGuidePages
                .filter((guide) => guide.component === component)
                .map((guide) => ({
                    href: guide.href,
                    label: guide.title,
                    nested: true
                }))
        ]);
    });
    const hasNestedEntries = $derived(entries.some((entry) => entry.nested));
</script>

{#each entries as entry, index (entry.href)}
    <Button
        variant="quiet"
        size="md"
        href={entry.href}
        onclick={onNavigate}
        aria-current={page.url.pathname === entry.href ? 'page' : undefined}
        class={`w-full justify-start rounded-[var(--radius-md)] pe-3 text-left text-sm text-foreground-muted hover:text-foreground aria-[current=page]:bg-primary/15 aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-[current=page]:hover:bg-primary/20 aria-[current=page]:hover:text-foreground ${entry.nested ? 'ps-6' : 'ps-3'} ${hasNestedEntries && !entry.nested ? `font-medium text-foreground ${index > 0 && (entries[index - 1]?.nested || entries[index + 1]?.nested) ? 'mt-4' : ''}` : ''}`}
    >
        {entry.label}
    </Button>
{/each}
