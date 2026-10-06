<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
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

<div data-docs-page class="flex flex-col gap-10 [--docs-sticky-offset:var(--docs-row-height)]">
    <PageIntro {title}>{description}</PageIntro>

    <section data-docs-toolbar aria-label={searchLabel} class="flex flex-col gap-3">
        <div class="flex min-w-0 items-center justify-between gap-3">
            <div class="min-w-0 flex-1 sm:max-w-sm">
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
            <Typography.Metadata
                class="sr-only shrink-0 whitespace-nowrap tabular-nums sm:not-sr-only"
                aria-live="polite"
            >
                {countLabel}
            </Typography.Metadata>
        </div>
    </section>

    {#if visibleTotal === 0}
        <section aria-label="No matching components" class="flex flex-col items-start gap-3">
            <Typography.Text variant="supporting">
                {`No entries match “${query.trim()}”.`}
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
        {#if group.heading === title && groups.length === 1}
            <h2 id={group.id} class="sr-only">{group.heading}</h2>
        {:else}
            <div class="flex items-baseline gap-2">
                {#if nested}
                    <Typography.H3 id={group.id} class="m-0">{group.heading}</Typography.H3>
                {:else}
                    <Typography.H2 id={group.id} class="m-0">{group.heading}</Typography.H2>
                {/if}
                <Typography.Metadata
                    class={nested ? 'tabular-nums' : 'tabular-nums text-current/70'}
                >
                    {group.items.length}
                </Typography.Metadata>
            </div>
        {/if}
        <div class="@container">
            <ul
                class="m-0 grid list-none grid-cols-1 gap-x-4 gap-y-8 p-0 @min-[32rem]:grid-cols-2 @min-[60rem]:grid-cols-3"
            >
                {#each group.items as component (component)}
                    <li
                        class="group relative flex min-w-0 flex-col gap-3 rounded-[var(--radius-xl)] has-[[data-catalog-link]:focus-visible]:shadow-[var(--focus-ring)]"
                    >
                        <div class="mielui-inset-frame">
                            <div
                                class="mielui-inset-surface flex h-48 items-center justify-center overflow-hidden"
                            >
                                <CatalogPreview slug={component} />
                            </div>
                        </div>
                        <div class="flex flex-col gap-0.5 px-1">
                            <a
                                data-catalog-link
                                href={resolve(componentHref(component) as '/docs/components/accordion')}
                                class="text-sm font-medium text-foreground after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                            >
                                {sanitizeComponent(component)}
                            </a>
                            {#if descriptions[component]}
                                <p class="m-0 line-clamp-2 text-sm leading-6 text-foreground-muted">
                                    {descriptions[component]}
                                </p>
                            {/if}
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </section>
{/snippet}
