<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
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
    import { mode } from 'mode-watcher';
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

    function specimen(theme: Theme) {
        const dark = mode.current === 'dark';
        const foundation = dark ? theme.foundation?.dark : theme.foundation?.light;
        const radii = { sharp: '4px', default: '10px', rounded: '999px' };
        const accent = (dark ? theme.tokens?.dark?.['--color-primary'] : undefined) ?? theme.brand;

        return {
            background: foundation?.background ?? (dark ? '#0f0f0f' : '#fdfdfc'),
            base: foundation?.base ?? (dark ? '#171717' : '#ffffff'),
            secondary: foundation?.secondary ?? (dark ? '#252525' : '#efefee'),
            border: foundation?.border ?? (dark ? '#2a2a2a' : '#dedede'),
            foreground: foundation?.foreground ?? (dark ? '#f5f5f5' : '#171717'),
            onBrand: foundation?.onPrimary ?? '#ffffff',
            accent,
            swatches: [
                accent,
                foundation?.base,
                foundation?.secondary,
                foundation?.border,
                foundation?.foreground
            ].filter((color): color is string => Boolean(color)),
            radius: radii[theme.radius] ?? '10px'
        };
    }

    function summary(theme: Theme) {
        const density = theme.density.charAt(0).toUpperCase() + theme.density.slice(1);

        return [`${density} density`, `${theme.radius} corners`, fontName(theme.fontSans)].join(
            ' · '
        );
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

<div class="flex w-full flex-col gap-8 pb-10">
    <header class="flex flex-col gap-3">
        <h1
            class="m-0 text-[2rem] leading-10 font-semibold tracking-[-0.025em] text-foreground [font-family:var(--font-header)]"
        >
            Themes
        </h1>
        <p class="m-0 max-w-[64ch] text-base leading-7 text-foreground-muted">
            Apply a complete preset live, or copy its CSS and JSON into your project.
        </p>
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
        <ul
            class="m-0 grid list-none grid-cols-1 gap-x-5 gap-y-8 p-0 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
            {#each filteredThemes as theme (theme.slug)}
                {const look = $derived(specimen(theme))}
                <li class="flex min-w-0 flex-col gap-3">
                    <div class="mielui-inset-frame">
                        <div
                            aria-hidden="true"
                            class="mielui-inset-surface flex h-44 flex-col justify-between overflow-hidden p-5"
                            style:background-color={look.background}
                            style:color={look.foreground}
                            style:font-family={theme.fontSans}
                        >
                            <div class="flex items-start justify-between gap-3">
                                <span class="text-4xl leading-none font-medium tracking-[-0.03em]">
                                    Aa
                                </span>
                                <span class="flex items-center gap-1">
                                    {#each look.swatches as color, index (`${color}-${index}`)}
                                        <span
                                            class="size-4 rounded-full ring-1 ring-current/15 ring-inset"
                                            style:background-color={color}
                                        ></span>
                                    {/each}
                                </span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="inline-flex h-8 items-center px-3 text-sm font-medium"
                                    style:background-color={look.accent}
                                    style:color={look.onBrand}
                                    style:border-radius={look.radius}
                                >
                                    Button
                                </span>
                                <span
                                    class="inline-flex h-8 items-center border px-3 text-sm font-medium"
                                    style:background-color={look.base}
                                    style:border-color={look.border}
                                    style:border-radius={look.radius}
                                >
                                    Outline
                                </span>
                                <span
                                    class="ms-auto h-1.5 w-16 overflow-hidden rounded-full"
                                    style:background-color={look.secondary}
                                >
                                    <span
                                        class="block h-full w-2/3 rounded-full"
                                        style:background-color={look.accent}
                                    ></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex min-w-0 flex-col gap-1 px-1">
                        <div class="flex items-center justify-between gap-3">
                            <h2
                                class="m-0 truncate text-[15px] leading-6 font-medium text-foreground"
                            >
                                {theme.name}
                            </h2>
                            <code class="shrink-0 font-mono text-xs text-foreground-muted">
                                {theme.brand}
                            </code>
                        </div>
                        <p class="m-0 line-clamp-2 text-sm leading-6 text-foreground-muted">
                            {theme.description}
                        </p>
                        <div class="truncate text-xs leading-6 text-foreground-muted">
                            {summary(theme)}
                        </div>
                    </div>
                    <div class="mt-auto flex items-center gap-2 px-1">
                        <Button
                            variant="outline"
                            size="sm"
                            aria-label={`Apply ${theme.name}`}
                            onclick={() => applyTheme(theme)}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label={`View ${theme.name} details`}
                            onclick={() => openDetail(theme)}
                        >
                            Details
                        </Button>
                    </div>
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
