<script lang="ts">
    import {
        InformationCircleIcon as Info,
        Search01Icon as Search
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import * as HoverCard from '@mielui/svelte/components/hover-card';
    import { Input } from '@mielui/svelte/components/input';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { componentTypes, sanitizeComponent } from '$lib/components';
    import CatalogPreview from '$lib/components/docs/catalog-preview.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    let {
        groups,
        descriptions,
        title = 'Components',
        description = 'Browse components, blocks, charts, and motion actions.'
    }: {
        groups: { id: string; heading: string; items: string[] }[];
        descriptions: Record<string, string>;
        title?: string;
        description?: string;
    } = $props();

    let query = $state('');
    const searchLabel = $derived(
        title === 'Components' ? 'Search components and actions' : `Search ${title.toLowerCase()}`
    );

    function matches(component: string): boolean {
        const needle = query.trim().toLowerCase();
        if (needle === '') {
            return true;
        }
        return (
            component.includes(needle) ||
            sanitizeComponent(component).toLowerCase().includes(needle) ||
            descriptions[component]?.toLowerCase().includes(needle) === true
        );
    }

    const visibleGroups = $derived(
        groups
            .map((group) => ({ ...group, items: group.items.filter(matches) }))
            .filter((group) => group.items.length > 0 || query.trim() === '')
    );
    const nestedGroups = $derived(
        title === 'Components'
            ? visibleGroups.filter((group) => componentTypes.some((type) => type.id === group.id))
            : []
    );
    const topLevelGroups = $derived(visibleGroups.filter((group) => !nestedGroups.includes(group)));
    const visibleTotal = $derived(
        visibleGroups.reduce((sum, group) => sum + group.items.length, 0)
    );
    const actions = $derived(groups.find((group) => group.id === 'actions')?.items ?? []);
    const catalogTotal = $derived(groups.reduce((total, group) => total + group.items.length, 0));
    const countLabel = $derived.by(() => {
        if (query.trim()) {
            return `${visibleTotal} of ${catalogTotal} entries`;
        }
        if (actions.length) {
            return `${catalogTotal - actions.length} components · ${actions.length} actions`;
        }
        return `${catalogTotal} components`;
    });

    function componentHref(component: string): string {
        return actions.includes(component)
            ? `/docs/actions/${component}`
            : `/docs/components/${component}`;
    }
</script>

<div data-docs-page class="flex flex-col gap-10">
    <PageIntro {title}>{description}</PageIntro>

    <section data-docs-toolbar aria-label={searchLabel} class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="w-full shrink-0 sm:max-w-sm">
                <Input
                    bind:value={query}
                    type="search"
                    aria-label={searchLabel}
                    placeholder={searchLabel}
                    class="w-full"
                >
                    {#snippet trailing()}
                        <HugeiconsIcon icon={Search} size={16} aria-hidden="true" />
                    {/snippet}
                </Input>
            </div>
            <Typography.Metadata class="shrink-0 whitespace-nowrap tabular-nums" aria-live="polite">
                {countLabel}
            </Typography.Metadata>
        </div>
    </section>

    {#if visibleTotal === 0}
        <section aria-label="No matching components" class="flex flex-col items-start gap-3">
            <Typography.Text variant="supporting">
                No entries match “{query.trim()}
                ”.
            </Typography.Text>
            <Button
                variant="outline"
                size="md"
                onclick={() => {
                query = '';
            }}
            >
                Clear search
            </Button>
        </section>
    {/if}

    {#if nestedGroups.length}
        <section aria-labelledby="components" class="flex flex-col gap-12!">
            <Typography.H2 id="components">Components</Typography.H2>
            {#each nestedGroups as group (group.id)}
                {@render catalogGroup(group, true)}
            {/each}
        </section>
    {/if}
    {#each topLevelGroups as group (group.id)}
        {@render catalogGroup(group, false)}
    {/each}
</div>

{#snippet catalogGroup(group: { id: string; heading: string; items: string[] }, nested: boolean)}
    <section aria-labelledby={group.id} class="flex flex-col gap-4">
        <div class="flex items-baseline gap-2">
            {#if nested}
                <Typography.H3 id={group.id} class="m-0">{group.heading}</Typography.H3>
            {:else}
                <Typography.H2 id={group.id} class="m-0">{group.heading}</Typography.H2>
            {/if}
            <Typography.Metadata class="tabular-nums">{group.items.length}</Typography.Metadata>
        </div>
        <div class="@container">
            <ul
                class="m-0 grid list-none grid-cols-1 p-0 gap-6 @min-[60rem]:gap-x-6 @min-[60rem]:gap-y-8 @min-[32rem]:grid-cols-2 @min-[60rem]:grid-cols-3"
            >
                {#each group.items as component (component)}
                    <li class="min-w-0">
                        <Card.Root variant="inset" class="h-full [&>[data-ui=card-surface]]:p-0">
                            <a
                                href={resolve(componentHref(component) as '/docs/components/accordion')}
                                aria-label={`View ${sanitizeComponent(component)}`}
                                class="relative flex h-52 items-center justify-center overflow-hidden rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                            >
                                <div class="contents" aria-hidden="true" inert>
                                    <CatalogPreview slug={component} />
                                </div>
                            </a>
                            <Card.Footer class="!justify-between !px-3 !py-2">
                                <a
                                    href={resolve(componentHref(component) as '/docs/components/accordion')}
                                    class="rounded-[var(--radius-sm)] text-sm font-medium text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    {sanitizeComponent(component)}
                                </a>
                                <HoverCard.Root>
                                    <HoverCard.Trigger
                                        class="size-7 items-center justify-center rounded-[var(--radius-sm)] text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                                    >
                                        <HugeiconsIcon icon={Info} size={16} />
                                        <span class="sr-only">
                                            {`About ${sanitizeComponent(component)}`}
                                        </span>
                                    </HoverCard.Trigger>
                                    <HoverCard.Content
                                        side="top"
                                        align="end"
                                        class="w-72 max-w-[calc(100vw-2rem)]"
                                    >
                                        <p class="text-sm font-medium">
                                            {sanitizeComponent(component)}
                                        </p>
                                        <p class="mt-2 text-sm leading-6 text-foreground-muted">
                                            {descriptions[component]}
                                        </p>
                                    </HoverCard.Content>
                                </HoverCard.Root>
                            </Card.Footer>
                        </Card.Root>
                    </li>
                {/each}
            </ul>
        </div>
    </section>
{/snippet}
