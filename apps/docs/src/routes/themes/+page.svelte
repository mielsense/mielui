<script lang="ts">
    import { Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as EmptyState from '@mielui/svelte/components/empty-state';
    import { Input } from '@mielui/svelte/components/input';
    import { toast } from '@mielui/svelte/components/toast';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import { applyLiveThemeCss } from '@mielui/svelte/themes/live';
    import { type Theme, themeToCss } from '@mielui/svelte/themes/theme';
    import { onMount } from 'svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import { searchField } from '$lib/components/shell/look';
    import { loadGoogleFonts } from '$lib/fonts.svelte';
    import { handOffTheme } from '$lib/studio/handoff';
    import type { PageData } from './$types';
    import ThemeCard from './theme-card.svelte';
    import ThemeDetailDialog from './theme-detail-dialog.svelte';

    let { data }: { data: PageData } = $props();

    onMount(loadGoogleFonts);

    const builtInSlugs = new Set(builtInThemePresets.map((theme) => theme.slug));

    let searchQuery = $state('');
    let detailOpen = $state(false);
    let detailTheme = $state<Theme | null>(null);

    const themes = $derived<Theme[]>([
        ...builtInThemePresets,
        ...data.themes.filter((theme) => !builtInSlugs.has(theme.slug))
    ]);
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

    function applyTheme(theme: Theme) {
        applyLiveThemeCss(themeToCss(theme));
        handOffTheme(theme);
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
</script>

<svelte:head>
    <title>Mielui · Themes</title>
    <meta name="description" content="Explore and customize Mielui themes." />
</svelte:head>

<div class="flex w-full flex-col gap-8 pb-10">
    <PageIntro title="Themes">
        Apply a complete preset live, or copy its CSS and JSON into your project.
    </PageIntro>

    <div class="flex min-w-0 items-center justify-between gap-3">
        <div class={`min-w-0 flex-1 sm:max-w-sm ${searchField}`}>
            <Input
                bind:value={searchQuery}
                type="search"
                aria-label="Search themes"
                placeholder="Search themes"
                class="w-full"
            >
                {#snippet leading()}
                    <HugeiconsIcon icon={Search} size={14} aria-hidden="true" />
                {/snippet}
            </Input>
        </div>
        <Typography.Metadata
            class="shrink-0 whitespace-nowrap text-[13px] tabular-nums"
            aria-live="polite"
        >
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
            class="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
            {#each filteredThemes as theme (theme.slug)}
                <ThemeCard {theme} onApply={applyTheme} onDetails={openDetail} />
            {/each}
        </ul>
    {/if}
</div>

<ThemeDetailDialog bind:open={detailOpen} theme={detailTheme} onApply={applyTheme} />
