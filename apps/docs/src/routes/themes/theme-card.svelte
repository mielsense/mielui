<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { Theme } from '@mielui/svelte/themes/theme';
    import { mode } from 'mode-watcher';
    import { capitalize } from '$lib/text';
    import { fontName, specimen } from './specimen';

    let {
        theme,
        onApply,
        onDetails
    }: {
        theme: Theme;
        onApply: (theme: Theme) => void;
        onDetails: (theme: Theme) => void;
    } = $props();

    const look = $derived(specimen(theme, mode.current === 'dark'));
    const summary = $derived(
        [
            `${capitalize(theme.density)} density`,
            `${theme.radius} corners`,
            fontName(theme.fontSans)
        ].join(' · ')
    );
</script>

<!--
    @component
    One theme in the gallery: a tile holding a specimen in the theme's own colors, its summary,
    and its actions.
-->

<li class="tile flex min-w-0 flex-col gap-4 p-2 pb-4">
    <div
        aria-hidden="true"
        class="flex h-44 flex-col justify-between overflow-hidden rounded-[16px] p-5 shadow-[inset_0_0_0_1px_color-mix(in_oklab,currentColor_10%,transparent)]"
        style:background-color={look.background}
        style:color={look.foreground}
        style:font-family={theme.fontSans}
    >
        <div class="flex items-start justify-between gap-3">
            <span class="text-4xl leading-none font-medium tracking-[-0.03em]">Aa</span>
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
    <div class="flex min-w-0 flex-col gap-1 px-3">
        <div class="flex items-center justify-between gap-3">
            <h2 class="m-0 truncate text-[15px] leading-6 font-medium text-foreground">
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
            {summary}
        </div>
    </div>
    <div class="mt-auto flex items-center gap-1 px-3">
        <Button
            variant="glow"
            size="sm"
            class="glow-plain"
            aria-label={`Apply ${theme.name}`}
            onclick={() => {
                onApply(theme);
            }}
        >
            Apply
        </Button>
        <Button
            variant="ghost"
            size="sm"
            class="text-foreground-muted hover:text-foreground"
            aria-label={`View ${theme.name} details`}
            onclick={() => {
                onDetails(theme);
            }}
        >
            Details
        </Button>
    </div>
</li>
