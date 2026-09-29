<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import { Input } from '@mielui/svelte/components/input';
    import { toast } from '@mielui/svelte/components/toast';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import { applyLiveThemeCss } from '@mielui/svelte/themes/live';
    import { type Theme, themeToCss } from '@mielui/svelte/themes/theme';
    import type { PageData } from './$types';

    const { data = { themes: builtInThemePresets } as PageData }: { data?: PageData } = $props();

    function getInitialThemes() {
        const builtInSlugs = new Set(builtInThemePresets.map((theme) => theme.slug));
        const registryThemes = Array.isArray(data?.themes) ? data.themes : [];

        return [
            ...builtInThemePresets,
            ...registryThemes.filter((theme) => !builtInSlugs.has(theme.slug))
        ];
    }

    let searchQuery = $state('');
    let themes = $state<Theme[]>(getInitialThemes());
    let detailOpen = $state(false);
    let detailTheme = $state<Theme | null>(null);

    const filteredThemes = $derived.by(() => {
        const needle = searchQuery.trim().toLowerCase();

        if (!needle) {
            return themes;
        }

        return themes.filter((theme) => {
            const haystack = [theme.name, theme.description, theme.publisher ?? '']
                .join(' ')
                .toLowerCase();

            return haystack.includes(needle);
        });
    });
    const countLabel = $derived(
        searchQuery.trim()
            ? `${filteredThemes.length} of ${themes.length} themes`
            : `${themes.length} themes`
    );
    const detailCss = $derived(detailTheme ? themeToCss(detailTheme) : '');
    const detailJson = $derived(detailTheme ? JSON.stringify(detailTheme, null, 2) : '');

    function fontName(family: string) {
        return family.split(',')[0].replaceAll(/['"]/g, '').trim();
    }

    function palette(theme: Theme) {
        const foundation = theme.foundation?.light;
        const colors = [
            theme.brand,
            foundation?.base,
            foundation?.secondary,
            foundation?.border,
            foundation?.foreground
        ];

        return colors.filter((color): color is string => Boolean(color));
    }

    function details(theme: Theme) {
        return [
            {
                label: 'Neutral',
                value: theme.neutral
            },
            {
                label: 'Radius',
                value: theme.radius
            },
            {
                label: 'Density',
                value: theme.density
            },
            {
                label: 'Motion',
                value: theme.motion
            },
            {
                label: 'Font',
                value: fontName(theme.fontSans)
            }
        ];
    }

    function applyTheme(theme: Theme) {
        applyLiveThemeCss(themeToCss(theme));
        toast({
            title: `${theme.name} applied`,
            description: 'Live tokens updated across the app.',
            duration: 2000,
            type: 'success'
        });
    }

    function openDetail(theme: Theme) {
        detailTheme = theme;
        detailOpen = true;
    }

    function applyDetail() {
        if (detailTheme) {
            applyTheme(detailTheme);
        }

        detailOpen = false;
    }
</script>

<svelte:head>
    <title>Mielui · Themes</title>
    <meta name="description" content="Explore and customize Mielui themes." />
</svelte:head>

<div class="flex w-full flex-col gap-8 py-10 md:py-14">
    <header class="flex max-w-2xl flex-col gap-2">
        <Typography.H1>Themes</Typography.H1>
        <Typography.Text>
            Apply a complete preset live, or copy its CSS and JSON into your project.
        </Typography.Text>
    </header>

    <div class="flex min-w-0 items-center justify-between gap-3">
        <div class="min-w-0 flex-1 sm:max-w-sm">
            <Input
                bind:value={searchQuery}
                type="search"
                aria-label="Search themes"
                placeholder="Search themes"
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

    {#if filteredThemes.length === 0}
        <EmptyState.Root class="py-12">
            <EmptyState.Header>
                <EmptyState.Title>No themes found</EmptyState.Title>
                <EmptyState.Description>
                    Try another keyword, or clear the search to see every theme.
                </EmptyState.Description>
            </EmptyState.Header>
            <EmptyState.Actions>
                <Button
                    variant="outline"
                    onclick={() => {
                        searchQuery = '';
                    }}
                >
                    Clear search
                </Button>
            </EmptyState.Actions>
        </EmptyState.Root>
    {:else}
        <ul class="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
            {#each filteredThemes as theme (theme.slug)}
                <li class="flex min-w-0">
                    <Card.Root class="w-full">
                        <Card.Header>
                            <div class="flex items-center justify-between gap-3">
                                <Card.Title>{theme.name}</Card.Title>
                                <span
                                    class="text-2xl leading-none text-foreground"
                                    style:font-family={theme.fontSans}
                                    aria-hidden="true"
                                >
                                    Aa
                                </span>
                            </div>
                            <Card.Description class="line-clamp-2">
                                {theme.description}
                            </Card.Description>
                        </Card.Header>
                        <Card.Content class="flex flex-col gap-4">
                            <div class="flex items-center gap-1.5" aria-hidden="true">
                                {#each palette(theme) as color, index (`${color}-${index}`)}
                                    <span
                                        class="size-5 rounded-full ring-1 ring-foreground/10 ring-inset"
                                        style:background-color={color}
                                    ></span>
                                {/each}
                                <span class="ms-1 font-mono text-xs text-foreground-muted">
                                    {theme.brand}
                                </span>
                            </div>
                            <dl class="m-0 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                {#each details(theme) as detail (detail.label)}
                                    <div class="flex min-w-0 items-baseline gap-2">
                                        <dt class="text-foreground-muted">{detail.label}</dt>
                                        <dd class="m-0 truncate capitalize text-foreground">
                                            {detail.value}
                                        </dd>
                                    </div>
                                {/each}
                            </dl>
                        </Card.Content>
                        <Card.Footer class="mt-auto">
                            <Button
                                variant="ghost"
                                class="me-auto"
                                aria-label={`View ${theme.name} details`}
                                onclick={() => openDetail(theme)}
                            >
                                Details
                            </Button>
                            <Button
                                variant="outline"
                                aria-label={`Apply ${theme.name}`}
                                onclick={() => applyTheme(theme)}
                            >
                                Apply
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<Dialog.Root bind:open={detailOpen}>
    <Dialog.Content>
        {#if detailTheme}
            <Dialog.Header>
                <Dialog.Title>{detailTheme.name}</Dialog.Title>
                <Dialog.Description>{detailTheme.description}</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body class="gap-5">
                <dl class="m-0 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div class="flex flex-col gap-1">
                        <dt class="text-foreground-muted">Brand</dt>
                        <dd class="m-0 flex items-center gap-2">
                            <span
                                class="size-4 rounded-full ring-1 ring-foreground/10 ring-inset"
                                style:background-color={detailTheme.brand}
                                aria-hidden="true"
                            ></span>
                            <code class="font-mono text-foreground">{detailTheme.brand}</code>
                        </dd>
                    </div>
                    {#each details(detailTheme) as detail (detail.label)}
                        <div class="flex flex-col gap-1">
                            <dt class="text-foreground-muted">{detail.label}</dt>
                            <dd class="m-0 capitalize text-foreground">{detail.value}</dd>
                        </div>
                    {/each}
                </dl>
                <div class="flex flex-wrap gap-2">
                    <CopyButton
                        text={detailCss}
                        label="Copy CSS"
                        copiedLabel="CSS copied"
                        variant="outline"
                        size="md"
                    >
                        Copy CSS
                    </CopyButton>
                    <CopyButton
                        text={detailJson}
                        label="Copy JSON"
                        copiedLabel="JSON copied"
                        variant="outline"
                        size="md"
                    >
                        Copy JSON
                    </CopyButton>
                </div>
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.Close>Close</Dialog.Close>
                <Dialog.Confirm onclick={applyDetail}>Apply theme</Dialog.Confirm>
            </Dialog.Footer>
        {/if}
    </Dialog.Content>
</Dialog.Root>
