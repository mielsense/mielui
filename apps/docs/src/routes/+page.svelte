<script lang="ts">
    import {
        AiChat02Icon,
        ArrowRight01Icon,
        ArrowUpRight01Icon,
        BookOpen01Icon,
        GithubIcon,
        Layers01Icon,
        PuzzleIcon
    } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import {
        catalogPages,
        components,
        componentTypeHref,
        navigationGroups,
        sanitizeComponent
    } from '$lib/components';
    import HomeDemos from '$lib/components/demos/demos.svelte';
    import HomeCompose from '$lib/components/home/compose.svelte';
    import HomeWall from '$lib/components/home/wall.svelte';
    import Logo from '$lib/components/logo.svelte';
    import { groupLook, mesh } from '$lib/components/shell/look';
    import type { ShellIcon } from '$lib/components/shell/page-icon';
    import Sticker from '$lib/components/shell/sticker.svelte';
    import ThemeToggle from '$lib/components/shell/theme-toggle.svelte';
    import { formatStarCount, GITHUB_URL } from '$lib/github';
    import pkg from '../../../../packages/mielui/package.json';

    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const stars = $derived(formatStarCount(data.starCount ?? null));

    const title = 'Mielui · Svelte components you own';
    const description = `${components.length} Svelte 5 components. Restyle all of them from a handful of design tokens.`;
    const installCommand = 'pnpm add @mielui/svelte';

    const nav = [
        {
            href: resolve('/docs/introduction'),
            label: 'Docs'
        },
        {
            href: resolve('/studio'),
            label: 'Studio'
        }
    ];

    const actions = navigationGroups.find((group) => group.id === 'actions');
    const groups = [
        ...catalogPages.map((group) => {
            return {
                ...groupLook(group.id, group.heading, componentTypeHref(group.id)),
                items: group.items
            };
        }),
        ...(actions
            ? [
                  {
                      ...groupLook(actions.id, actions.heading, '/docs/actions'),
                      items: actions.items
                  }
              ]
            : [])
    ];

    const firstComponent = `<script>
  import { Button } from '@mielui/svelte';
<${'/'}script>

<Button>Get started</Button>`;

    const next = [
        {
            href: resolve('/docs/installation'),
            title: 'Copy the source',
            detail: 'pnpm dlx @mielui/svelte add button puts the file in your project.',
            external: false
        },
        {
            href: resolve('/docs/agent-skill'),
            title: 'Teach your agent',
            detail: 'The Mielui skill gives coding agents the current component APIs.',
            external: false
        },
        {
            href: resolve('/studio'),
            title: 'Make a theme',
            detail: 'Tune color, type, corners, and motion, then export CSS.',
            external: false
        },
        {
            href: GITHUB_URL,
            title: 'Read the code',
            detail: 'Every component is plain Svelte and Tailwind, MIT licensed.',
            external: true
        }
    ];

    const lean =
        'transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none';
    const leanOut = `${lean} group-hover:-translate-y-0.5`;
    const heading = 'display m-0 text-3xl sm:text-4xl';
    const intro = 'm-0 max-w-[36rem] text-base leading-relaxed text-foreground-muted';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
</svelte:head>

{#snippet label(text: string, icon: ShellIcon, background: string)}
    <p class="m-0 flex items-center gap-2 text-sm font-medium text-foreground">
        <Sticker {icon} mesh={background} />
        {text}
    </p>
{/snippet}

{#snippet more(href: string, text: string)}
    <a {href} class="group inline-flex items-center gap-1 self-start text-sm text-foreground">
        <span
            class="underline decoration-border-strong decoration-1 underline-offset-4 group-hover:decoration-current"
        >
            {text}
        </span>
        <HugeiconsIcon icon={ArrowRight01Icon} size={13} class={lean} />
    </a>
{/snippet}

<a
    href="#home-content"
    class="sr-only z-50 rounded-md bg-card px-4 py-2 text-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
    Skip to content
</a>

<header>
    <div class="wrap flex h-16 items-center gap-2">
        <div class="me-auto">
            <Logo />
        </div>
        <nav aria-label="Site" class="flex items-center gap-1.5">
            {#each nav as link, index (link.href)}
                <a
                    href={link.href}
                    class={[
                        'press h-8 items-center rounded-[9px] px-3 text-sm text-foreground-muted hover:bg-[color-mix(in_oklab,var(--color-foreground)_5%,transparent)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none',
                        index === 0 ? 'flex' : 'hidden md:flex'
                    ]}
                >
                    {link.label}
                </a>
            {/each}
            <Button
                variant="ghost"
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Mielui on GitHub, {stars} stars"
                class="hidden h-8 gap-1.5 px-2.5 text-foreground-muted hover:text-foreground md:inline-flex"
            >
                <HugeiconsIcon icon={GithubIcon} size={16} />
                <span class="text-sm tabular-nums">{stars}</span>
            </Button>
            <ThemeToggle />
            <Button
                href={resolve('/docs/installation')}
                size="sm"
                class="ms-1.5 hidden md:inline-flex"
            >
                Get started
            </Button>
        </nav>
    </div>
</header>

<main id="home-content" class="flex flex-col">
    <section
        aria-labelledby="home-title"
        class="stagger wrap flex flex-col items-center gap-5 pt-10 pb-20 text-center sm:pt-20 sm:pb-28"
    >
        <a
            href={resolve('/docs/changelog')}
            class="group press inline-flex h-7 items-center gap-1.5 rounded-full bg-card ps-1 pe-2.5 text-xs text-foreground-muted shadow-[0_0_0_1px_var(--color-border)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
        >
            <span
                class="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground tabular-nums"
            >
                {pkg.version}
            </span>
            What's new
            <HugeiconsIcon icon={ArrowRight01Icon} size={12} class={lean} />
        </a>
        <h1 id="home-title" class="display m-0 max-w-[52rem] text-5xl sm:text-6xl lg:text-7xl">
            Svelte components you can <span class="accent">own</span>
        </h1>
        <p class="m-0 max-w-[40rem] text-lg leading-relaxed text-foreground-muted">
            Mielui is {components.length} components for Svelte 5 and Tailwind v4. They read one set
            of design tokens, so a theme restyles all of them. Pick one below and watch.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2">
            <Button href={resolve('/docs/components')} size="lg" class="ps-4">
                <HugeiconsIcon icon={Layers01Icon} size={16} />
                Browse components
            </Button>
            <Button
                href={resolve('/docs/introduction')}
                variant="glow"
                size="lg"
                class="glow-plain ps-4 max-sm:hidden"
            >
                <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                Read the docs
            </Button>
        </div>
        <div class="mt-5 w-full text-start sm:mt-7" data-rise>
            <HomeWall />
        </div>
    </section>

    <section aria-labelledby="home-components" class="wrap flex flex-col gap-10 pb-20 sm:pb-28">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div class="flex flex-col gap-4">
                <h2 id="home-components" class={heading}>
                    From a button to a <span class="accent">coding agent</span>
                </h2>
                <p class={intro}>
                    {components.length}
                    components in {groups.length - 1} groups, plus actions for motion. Native
                    controls keep their browser behavior.
                </p>
            </div>
            {@render more(resolve('/docs/components'), 'Browse the catalog')}
        </div>
        <ul class="m-0 grid list-none grid-cols-2 border-b border-border p-0 lg:grid-cols-4">
            {#each groups as group (group.id)}
                <li class="min-w-0 border-t border-border">
                    <a
                        href={group.href}
                        class="group/section flex h-full flex-col gap-3 py-4 pe-3 sm:py-5 sm:pe-6 focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
                    >
                        <span class="flex items-center gap-2.5">
                            <Sticker icon={group.icon} mesh={group.mesh} />
                            <span class="min-w-0 text-base font-medium text-foreground">
                                {group.title}
                                <span
                                    class="ms-1.5 text-sm font-normal text-foreground-muted tabular-nums"
                                >
                                    {group.items.length}
                                </span>
                            </span>
                            <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                size={13}
                                class="ms-auto text-foreground-muted opacity-0 transition-[opacity,translate] duration-150 ease-out group-hover/section:translate-x-0.5 group-hover/section:opacity-100 group-focus-visible/section:opacity-100 motion-reduce:transition-none"
                            />
                        </span>
                        <span
                            class="line-clamp-2 text-sm leading-relaxed text-foreground-muted max-sm:hidden"
                        >
                            {group.items.map(sanitizeComponent).join(', ')}
                        </span>
                    </a>
                </li>
            {/each}
        </ul>
    </section>

    <section
        aria-labelledby="home-compose"
        class="group/section wrap grid grid-cols-[minmax(0,1fr)] gap-10 pb-20 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16"
    >
        <div class="flex flex-col gap-4 lg:pt-1">
            {@render label('Composition', PuzzleIcon, mesh.indigo)}
            <h2 id="home-compose" class={heading}>
                Made of parts you can <span class="accent">rearrange</span>
            </h2>
            <p class={intro}>
                Larger components are named subparts. Omit one, reorder them, or pass a class to any
                of them. What you write is what renders.
            </p>
            {@render more(resolve('/docs/introduction'), 'How components are built')}
        </div>
        <HomeCompose />
    </section>

    <section
        aria-labelledby="home-demos"
        class="group/section wrap flex flex-col gap-8 pb-20 sm:pb-28"
    >
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div class="flex max-w-[40rem] flex-col gap-4">
                {@render label('Live demos', AiChat02Icon, mesh.mauve)}
                <h2 id="home-demos" class={heading}>Whole screens, still working</h2>
                <p class={intro}>
                    Each screen is put together from components in the docs. Pick another thread,
                    send a follow-up, or change the issue's labels.
                </p>
            </div>
            {@render more(resolve('/docs/components/ai-components'), 'AI components')}
        </div>
        <HomeDemos />
    </section>

    <section
        aria-labelledby="home-get"
        class="wrap flex flex-col gap-12 border-t border-border pt-20 pb-20 sm:pt-28 sm:pb-28"
    >
        <div class="mx-auto flex max-w-[40rem] flex-col items-center gap-4 text-center">
            <h2 id="home-get" class="display m-0 text-4xl sm:text-5xl">
                Start with one <span class="accent">command</span>
            </h2>
            <p class="m-0 text-base text-foreground-muted">
                Free and MIT licensed. Svelte 5.56 or newer, Tailwind CSS v4.
            </p>
        </div>
        <ol class="m-0 grid list-none grid-cols-[minmax(0,1fr)] gap-8 p-0 lg:grid-cols-3 lg:gap-6">
            <li class="flex min-w-0 flex-col gap-3">
                <span class="text-sm text-foreground-muted">
                    <span class="font-medium text-foreground tabular-nums">1</span>
                    Add the package
                </span>
                <CodeBlock code={installCommand} lang="sh" copy="overlay" class="flex-1" />
            </li>
            <li class="flex min-w-0 flex-col gap-3">
                <span class="text-sm text-foreground-muted">
                    <span class="font-medium text-foreground tabular-nums">2</span>
                    Import the stylesheet in your app.css
                </span>
                <CodeBlock
                    code="@import '@mielui/svelte/ui.css';"
                    lang="css"
                    copy="overlay"
                    class="flex-1"
                />
            </li>
            <li class="flex min-w-0 flex-col gap-3">
                <span class="text-sm text-foreground-muted">
                    <span class="font-medium text-foreground tabular-nums">3</span>
                    Use a component
                </span>
                <CodeBlock code={firstComponent} lang="svelte" copy="overlay" class="flex-1" />
            </li>
        </ol>
        <ul class="m-0 grid list-none grid-cols-[minmax(0,1fr)] p-0 sm:grid-cols-2 lg:grid-cols-4">
            {#each next as link (link.title)}
                <li class="min-w-0 border-t border-border">
                    <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        class="group flex h-full flex-col gap-1 py-5 pe-6 focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
                    >
                        <span class="flex items-center gap-1 text-base font-medium text-foreground">
                            {link.title}
                            <HugeiconsIcon
                                icon={link.external ? ArrowUpRight01Icon : ArrowRight01Icon}
                                size={13}
                                class={link.external ? leanOut : lean}
                            />
                        </span>
                        <span class="text-sm leading-relaxed text-foreground-muted">
                            {link.detail}
                        </span>
                    </a>
                </li>
            {/each}
        </ul>
    </section>
</main>

<footer>
    <div class="wrap flex h-16 items-center justify-between gap-6 text-xs text-foreground-muted">
        <span>
            MIT licensed. Made by
            <a class="link" href="https://miel.my" target="_blank" rel="noreferrer">mielsense</a>.
        </span>
        <nav aria-label="Elsewhere" class="flex items-center gap-4">
            <a href={resolve('/docs/introduction')} class="hover:text-foreground">Docs</a>
            <a href={resolve('/docs/changelog')} class="hover:text-foreground">Changelog</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" class="hover:text-foreground">
                GitHub
            </a>
        </nav>
    </div>
</footer>
