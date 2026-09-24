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
    import * as Sheet from '@mielui/svelte/components/sheet';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import { components } from '$lib/components';
    import HomeShowcase from '$lib/components/home-showcase.svelte';
    import Logo from '$lib/components/logo.svelte';
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
    <title>mielui · Premium Svelte components you own</title>
    <meta
        name="description"
        content={`${components.length} Svelte 5 components. Restyle all of them from a handful of design tokens.`}
    />
</svelte:head>

<div class="@container min-h-dvh bg-background p-3 pt-0 sm:p-4 sm:pt-0">
    <a
        href="#home-content"
        class="sr-only z-50 rounded-md bg-card px-4 py-2 text-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
    >
        Skip to content
    </a>
    <Sheet.Root bind:open={mobileMenuOpen}>
        <header
            class="relative z-20 mx-auto grid h-20 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 px-2 @3xl:grid-cols-[1fr_auto_1fr] @3xl:px-6"
        >
            <Logo />
            <nav aria-label="Primary" class="hidden items-center gap-7 text-sm @3xl:flex">
                <a
                    href={resolve('/docs/components')}
                    class="rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                    Components
                </a>
                <a
                    href={resolve('/docs/introduction')}
                    class="rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                    Documentation
                </a>
                <a
                    href={resolve('/studio')}
                    class="rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                    Studio
                </a>
            </nav>
            <div class="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    href="https://github.com/mielsense/mielui"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Star mielui on GitHub"
                    class="gap-2"
                >
                    <img src={GitHubWhite} alt="" class="hidden size-4 dark:block" />
                    <img src={GitHubBlack} alt="" class="size-4 dark:hidden" />
                    <span class="tabular-nums">{formatStarCount(data.starCount ?? null)}</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onclick={toggleMode}
                    aria-label={mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    <span
                        class="inline-flex size-4"
                        aria-hidden="true"
                        use:morph={{key: mode.current}}
                    >
                        <HugeiconsIcon icon={mode.current === 'dark' ? Moon : Sun} size={16} />
                    </span>
                </Button>
                <Sheet.Trigger
                    class="@3xl:hidden"
                    aria-label="Open navigation menu"
                    variant="ghost"
                    size="icon"
                >
                    <HugeiconsIcon icon={Menu} size={18} />
                </Sheet.Trigger>
            </div>
        </header>
        <Sheet.Content side="left" class="p-0">
            <Sheet.Title class="sr-only">Browse mielui</Sheet.Title>
            <Sheet.Description class="sr-only">
                Documentation, components, and Theme Studio.
            </Sheet.Description>
            <div class="flex items-center justify-between px-5 py-4">
                <Logo />
                <Sheet.Close aria-label="Close navigation menu" variant="ghost" size="icon">
                    <HugeiconsIcon icon={X} size={18} />
                </Sheet.Close>
            </div>
            <nav aria-label="Mobile navigation" class="flex flex-col gap-2 p-4">
                <Button
                    variant="ghost"
                    class="justify-start"
                    href={resolve('/docs/components')}
                    onclick={() => { mobileMenuOpen = false; }}
                >
                    Components
                </Button>
                <Button
                    variant="ghost"
                    class="justify-start"
                    href={resolve('/docs/introduction')}
                    onclick={() => { mobileMenuOpen = false; }}
                >
                    Documentation
                </Button>
                <Button
                    variant="ghost"
                    class="justify-start"
                    href={resolve('/studio')}
                    onclick={() => { mobileMenuOpen = false; }}
                >
                    Studio
                </Button>
            </nav>
        </Sheet.Content>
    </Sheet.Root>

    <section
        id="home-content"
        aria-labelledby="home-title"
        class="relative isolate mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1600px] grid-cols-1 overflow-hidden rounded-[var(--radius-xl)] bg-[#133555] text-white @5xl:grid-cols-[0.95fr_1.05fr]"
    >
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_110%,#ffc8b5_0%,transparent_55%),radial-gradient(ellipse_at_56%_110%,#c5b4f8_0%,transparent_60%),radial-gradient(ellipse_at_105%_65%,#66b1f3_0%,transparent_62%),linear-gradient(140deg,#102e49_15%,#214b7d_65%,#83a8f1)]"
        ></div>
        <div
            class="relative z-10 flex flex-col px-6 pt-10 pb-6 @xl:px-10 @xl:pt-12 @5xl:py-14 @6xl:px-14 @6xl:py-16"
        >
            <div class="mb-7 flex items-center gap-3 text-sm text-white/80">
                <span class="size-1.5 rounded-full bg-[#b8d4ff]" aria-hidden="true"></span>
                <span>Svelte 5. Open source. Yours to build with.</span>
            </div>
            <h1
                id="home-title"
                class="max-w-[15ch] text-5xl leading-[1.07] font-medium tracking-[-0.045em] text-balance @xl:text-6xl"
            >
                Beautiful interfaces. Down to the details.
            </h1>
            <p class="mt-6 max-w-[27rem] text-base leading-relaxed text-white/80 @6xl:text-lg">
                Thoughtful Svelte components with fluid motion and a theme that ties it all
                together. Copy the source. Make it yours.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button
                    href={resolve('/docs/components')}
                    size="lg"
                    class="h-12 bg-[#fafbff] px-5 text-[#163859] shadow-[0_2px_8px_#0b244930] hover:bg-[#e9efff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    Explore components<HugeiconsIcon icon={ArrowRight} size={17} />
                </Button>
                <a
                    href={resolve('/studio')}
                    class="inline-flex items-center gap-2 rounded-sm text-sm text-white/90 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    Make a theme
                </a>
            </div>
            <div
                class="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/90 @5xl:text-[#183750] @5xl:mt-auto @5xl:pt-24"
            >
                <p>
                    <span class="font-medium">{components.length} components</span>
                    <br />
                    <span class="text-white/70 @5xl:text-[#183750]/70">
                        One shared design language
                    </span>
                </p>
                <p>
                    <span class="font-medium">Your source code</span>
                    <br />
                    <span class="text-white/70 @5xl:text-[#183750]/70">
                        Ready to shape around your idea
                    </span>
                </p>
            </div>
        </div>
        <div class="relative min-w-0 px-6 pb-6 @xl:px-10 @5xl:py-0 @5xl:pl-3 @5xl:pr-10 @6xl:pr-16">
            <HomeShowcase />
        </div>
    </section>
    <footer
        class="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-2 pt-4 pb-1 text-xs text-foreground-muted @3xl:px-6"
    >
        <span>Mielui · Made for Svelte</span>
        <div class="flex items-center gap-5">
            <a href={resolve('/docs/installation')} class="hover:text-foreground">Get started</a>
            <a href={resolve('/docs/changelog')} class="hover:text-foreground">Changelog</a>
        </div>
    </footer>
</div>
