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
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import { components } from '$lib/components';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import Rows from '$lib/components/docs/rows.svelte';
    import { catalogSections } from '$lib/docs-pages';
    import '$lib/components/docs/docs-layout.css';
    import HomeShowcase from '$lib/components/home/showcase.svelte';
    import Logo from '$lib/components/logo.svelte';
    import { formatStarCount } from '$lib/github';

    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();

    const title = 'mielui · Premium Svelte components you own';
    const description = `${components.length} Svelte 5 components. Restyle all of them from a handful of design tokens.`;

    let mobileMenuOpen = $state(false);

    const links = [
        { href: resolve('/docs/components'), label: 'Components' },
        { href: resolve('/docs/introduction'), label: 'Documentation' },
        { href: resolve('/studio'), label: 'Studio' }
    ];

    const firstComponent = `<script>
  import { Button } from '@mielui/svelte';
<${'/'}script>

<Button>Get started</Button>`;

    const next = [
        {
            label: 'Theme Studio',
            value: 'Set color, type, corners, spacing, and motion, then export CSS or JSON.',
            href: resolve('/studio')
        },
        {
            label: 'Theming',
            value: 'Apply a preset or connect the tokens to your own design.',
            href: resolve('/docs/theming')
        },
        {
            label: 'Agent skill',
            value: 'Give your coding agent the current APIs and patterns.',
            href: resolve('/docs/agent-skill')
        }
    ];

    const sections = [
        {
            id: 'home-install',
            title: 'Get started',
            description: 'Install the package, import one stylesheet, and use a component.'
        },
        {
            id: 'home-inside',
            title: `${components.length} components`,
            description: 'Native controls, overlays, charts, and AI interfaces on one theme.'
        },
        {
            id: 'home-next',
            title: 'Make it yours',
            description: 'Every component reads the same tokens, so one theme restyles all of them.'
        }
    ];

    $effect(() => {
        page.url.pathname;
        mobileMenuOpen = false;
    });
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
</svelte:head>

<div class="@container flex min-h-dvh flex-col bg-background p-3 pt-0 sm:p-4 sm:pt-0">
    <a
        href="#home-content"
        class="sr-only z-50 rounded-md bg-card px-4 py-2 text-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
    >
        Skip to content
    </a>
    <Sheet.Root bind:open={mobileMenuOpen}>
        <header
            class="relative z-20 mx-auto grid h-16 w-full grid-cols-[1fr_auto] items-center gap-4 px-2 @3xl:grid-cols-[1fr_auto_1fr] @3xl:px-6"
        >
            <Logo />
            <nav aria-label="Primary" class="hidden items-center gap-0.5 @3xl:flex">
                {#each links as link (link.href)}
                    <Button
                        variant="ghost"
                        href={link.href}
                        class="font-normal text-foreground-muted hover:text-foreground"
                    >
                        {link.label}
                    </Button>
                {/each}
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
                {#each links as link (link.href)}
                    <Button
                        variant="ghost"
                        class="justify-start"
                        href={link.href}
                        onclick={() => {
                            mobileMenuOpen = false;
                        }}
                    >
                        {link.label}
                    </Button>
                {/each}
            </nav>
        </Sheet.Content>
    </Sheet.Root>

    <section
        id="home-content"
        aria-labelledby="home-title"
        class="relative isolate grid w-full shrink-0 grid-cols-1 overflow-hidden rounded-[var(--radius-xl)] bg-[color-mix(in_oklab,var(--color-primary)_18%,#18181b)] text-white @5xl:h-[clamp(32rem,calc(100svh-11rem),44rem)] @5xl:grid-cols-[0.9fr_1.1fr]"
    >
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_95%_10%,color-mix(in_oklab,var(--color-primary)_30%,transparent),transparent_60%),linear-gradient(115deg,color-mix(in_oklab,var(--color-primary)_8%,#18181b)_20%,color-mix(in_oklab,var(--color-primary)_28%,#18181b)_75%,color-mix(in_oklab,var(--color-primary)_45%,#18181b))]"
        ></div>
        <div
            class="relative z-10 flex flex-col justify-center px-7 pt-12 pb-5 @xl:px-10 @5xl:py-12 @6xl:px-14"
        >
            <h1
                id="home-title"
                class="text-4xl leading-[1.1] font-medium tracking-[-0.035em] @xl:text-5xl"
            >
                Svelte UI.<br />
                Your way.
            </h1>
            <p class="mt-5 max-w-xs text-base leading-relaxed text-white/70">
                {components.length}
                components. One theme.<br />
                The source is yours.
            </p>
            <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button
                    href={resolve('/docs/components')}
                    class="h-10 bg-[color-mix(in_oklab,var(--color-primary)_10%,white)] px-4 text-[color-mix(in_oklab,var(--color-primary)_25%,#18181b)] shadow-[0_2px_6px_#160f1b30] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    Browse components<HugeiconsIcon icon={ArrowRight} size={15} />
                </Button>
                <a
                    href={resolve('/studio')}
                    class="rounded-sm text-sm text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    Open Studio
                </a>
            </div>
        </div>
        <div class="relative min-w-0 px-7 pb-5 @xl:px-10 @5xl:py-6 @5xl:pl-3 @5xl:pr-10 @6xl:pr-14">
            <HomeShowcase />
        </div>
    </section>
    <div
        class="docs-article mx-auto flex w-full max-w-[68rem] flex-col gap-20 px-2 py-20 @3xl:px-6"
    >
        {#each sections as section (section.id)}
            <section
                aria-labelledby={section.id}
                class="grid grid-cols-1 gap-x-12 gap-y-5 @4xl:grid-cols-[18rem_minmax(0,1fr)]"
            >
                <div class="flex flex-col gap-2">
                    <h2
                        id={section.id}
                        class="m-0 text-xl leading-7 font-semibold tracking-[-0.015em] text-foreground"
                    >
                        {section.title}
                    </h2>
                    <p class="m-0 max-w-[36ch] text-[15px] leading-7 text-foreground-muted">
                        {section.description}
                    </p>
                </div>
                <div class="flex min-w-0 flex-col gap-3">
                    {#if section.id === 'home-install'}
                        <PackageCommand command="pnpm add @mielui/svelte" />
                        <CodeBlock code={firstComponent} lang="svelte" copy="overlay" />
                    {:else if section.id === 'home-inside'}
                        <Rows items={catalogSections} label="Component categories" />
                    {:else}
                        <Rows items={next} label="Where to go next" />
                    {/if}
                </div>
            </section>
        {/each}
    </div>
    <footer
        class="mx-auto flex w-full flex-wrap items-center justify-between gap-3 px-2 pt-4 pb-1 text-xs text-foreground-muted @3xl:px-6"
    >
        <span>Mielui · Made for Svelte</span>
        <div class="flex items-center gap-5">
            <a href={resolve('/docs/installation')} class="hover:text-foreground">Get started</a>
            <a href={resolve('/docs/changelog')} class="hover:text-foreground">Changelog</a>
        </div>
    </footer>
</div>
