<script lang="ts">
    import {
        ArrowRight02Icon as ArrowRight,
        Menu01Icon as Menu,
        Moon02Icon as Moon,
        Sun03Icon as Sun,
        Cancel01Icon as X
    } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import { Button } from '@mielui/svelte/components/button';
    import * as Group from '@mielui/svelte/components/group';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import { components } from '$lib/components';
    import HomeComponentCloud from '$lib/components/home-component-cloud.svelte';
    import HomeTexture from '$lib/components/home-texture.svelte';
    import Logo from '$lib/components/logo.svelte';
    import SleepingCat from '$lib/components/sleeping-cat.svelte';
    import { formatStarCount } from '$lib/github';

    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();

    let mobileMenuOpen = $state(false);

    $effect(() => {
        page.url.pathname;
        mobileMenuOpen = false;
    });
</script>

<svelte:head>
    <title>mielui · Themed Svelte components</title>
    <meta
        name="description"
        content={`${components.length} Svelte 5 components. Restyle all of them from a handful of design tokens.`}
    />
</svelte:head>

<section
    class="relative isolate flex h-full flex-col overflow-hidden bg-background [--home-rail:1rem] sm:[--home-rail:3.5rem]"
    aria-label="mielui introduction"
>
    <HomeTexture />
    <HomeComponentCloud />
    <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-[var(--home-rail)] z-20 border-r border-border/50"
    ></div>
    <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-[var(--home-rail)] z-20 border-r border-border/50"
    ></div>
    {#each ['left-[var(--home-rail)] -translate-x-1/2', 'right-[var(--home-rail)] translate-x-1/2'] as edge}
        {#each ['top-14 -translate-y-1/2', 'bottom-14 translate-y-1/2'] as row}
            <span
                aria-hidden="true"
                class="pointer-events-none absolute z-30 size-2 rounded-[2px] border border-border bg-secondary {edge} {row}"
            ></span>
        {/each}
    {/each}
    <Sheet.Root bind:open={mobileMenuOpen}>
        <header
            class="relative z-10 flex h-14 shrink-0 w-full items-center justify-between border-y border-border/50 bg-secondary/10 px-[calc(var(--home-rail)+1rem)]"
        >
            <div class="flex min-w-0 flex-1 items-center gap-2">
                <Sheet.Trigger
                    class="sm:hidden"
                    aria-label="Open navigation menu"
                    variant="quiet"
                    size="icon"
                >
                    <HugeiconsIcon icon={Menu} size={18} />
                </Sheet.Trigger>
                <Logo />
            </div>
            <div class="ml-6 flex shrink-0 items-center gap-2">
                <nav aria-label="Primary" class="hidden sm:block">
                    <Group.Root aria-label="Resources">
                        <Button variant="outline" size="md" href={resolve('/docs/introduction')}>
                            <span class="text-label">Docs</span>
                        </Button>
                        <Group.Separator />
                        <Button variant="outline" size="md" href={resolve('/studio')}>
                            <span class="text-label">Studio</span>
                        </Button>
                        <Group.Separator />
                        <Button
                            variant="outline"
                            size="md"
                            href="https://github.com/mielsense/mielui"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Star mielui on GitHub"
                        >
                            <img
                                src={GitHubWhite}
                                alt=""
                                aria-hidden="true"
                                class="hidden size-4 dark:block"
                            />
                            <img
                                src={GitHubBlack}
                                alt=""
                                aria-hidden="true"
                                class="size-4 dark:hidden"
                            />
                            <span class="text-label tabular-nums">
                                {formatStarCount(data.starCount ?? null)}
                            </span>
                        </Button>
                    </Group.Root>
                </nav>
                <div class="flex shrink-0 items-center gap-2">
                    <Button
                        variant="outline"
                        size="md"
                        class="w-[calc(var(--size-control-md)-var(--size-hairline))] px-0"
                        style="border-radius: var(--radius-md);"
                        onclick={() => {
                        toggleMode();
                    }}
                        aria-label={mode.current === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'}
                    >
                        <span
                            class="inline-flex size-4"
                            aria-hidden="true"
                            use:morph={{ key: mode.current }}
                        >
                            <HugeiconsIcon icon={mode.current === 'dark' ? Moon : Sun} size={16} />
                        </span>
                    </Button>
                </div>
            </div>
        </header>
        <Sheet.Content side="left" class="p-0 sm:hidden">
            <Sheet.Title class="sr-only">Browse mielui</Sheet.Title>
            <Sheet.Description class="sr-only">
                Documentation and component categories.
            </Sheet.Description>
            <header class="flex shrink-0 items-center justify-between px-3 py-3">
                <a
                    href={resolve('/')}
                    class="font-semibold tracking-tight text-foreground no-underline"
                >
                    mielui
                </a>
                <Sheet.Close aria-label="Close navigation menu" variant="quiet" size="icon">
                    <HugeiconsIcon icon={X} size={18} />
                </Sheet.Close>
            </header>
            <div class="min-h-0 flex-1 overflow-y-auto px-3 py-4">
                <section class="flex flex-col gap-2 ">
                    <h2 class="mb-2 text-sm text-foreground-muted">Navigate</h2>
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => { mobileMenuOpen = false; }}
                        href={resolve('/docs/introduction')}
                    >
                        Docs
                    </Button>
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => { mobileMenuOpen = false; }}
                        href={resolve('/docs/components')}
                    >
                        Components
                    </Button>
                    <Button
                        variant="quiet"
                        class="w-full justify-start"
                        onclick={() => { mobileMenuOpen = false; }}
                        href={resolve('/studio')}
                    >
                        Studio
                    </Button>
                </section>
            </div>
        </Sheet.Content>
    </Sheet.Root>
    <div
        class="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-10 text-center [&>pre]:text-[clamp(0.65rem,2.1vw,1.8rem)] [&>pre]:mb-10"
    >
        <SleepingCat />
        <Typography.H1
            class="motion-safe:[animation:docs-block-in_280ms_var(--ease-out)_both]"
            style="font-size: 18px; font-weight: var(--font-weight-label);"
        >
            Themed Svelte components
        </Typography.H1>
        <Typography.Description
            class="mt-1 max-w-[38rem] motion-safe:[animation:docs-block-in_280ms_var(--ease-out)_both] motion-safe:[animation-delay:80ms]"
            style="font-size: 18px; font-weight: var(--font-weight-label);"
        >
            {`Restyle ${components.length} components from a handful of tokens.`}
        </Typography.Description>
        <div
            class="mt-3 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap motion-safe:[animation:docs-block-in_280ms_var(--ease-out)_both] motion-safe:[animation-delay:115ms]"
        >
            <Button
                href={resolve('/docs/components')}
                size="lg"
                class="w-full justify-center sm:w-auto"
            >
                {`Browse all ${components.length} components`}
                <HugeiconsIcon icon={ArrowRight} size={16} />
            </Button>
            <Button
                href="https://github.com/mielsense/mielui"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                class="w-full justify-center sm:w-auto"
            >
                View on GitHub
            </Button>
        </div>
    </div>
    <footer
        class="relative z-10 flex h-14 shrink-0 items-center justify-between border-t border-border/50 bg-secondary/10 px-[calc(var(--home-rail)+1rem)] text-xs text-foreground-muted"
    >
        <span>Mielui · Svelte components</span>
        <a href={resolve('/docs/changelog')} class="hover:text-foreground">Changelog</a>
    </footer>
</section>
