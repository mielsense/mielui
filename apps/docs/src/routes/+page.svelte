<script lang="ts">
    import {
        AiChat02Icon,
        Analytics01Icon,
        ArrowRight01Icon,
        ArrowUpRight01Icon,
        BookOpen01Icon,
        CommandLineIcon,
        GithubIcon,
        Layers01Icon,
        PaintBoardIcon,
        SparklesIcon
    } from '@hugeicons/core-free-icons';
    import BrandMark from '@mielui/svelte/brand-mark';
    import { Badge } from '@mielui/svelte/components/badge';
    import { Button } from '@mielui/svelte/components/button';
    import * as Chart from '@mielui/svelte/components/chart';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { Input } from '@mielui/svelte/components/input';
    import { Progress } from '@mielui/svelte/components/progress';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import { resolve } from '$app/paths';
    import { components } from '$lib/components';
    import HomeDemos from '$lib/components/demos/demos.svelte';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import HomeShowcase from '$lib/components/home/showcase.svelte';
    import Logo from '$lib/components/logo.svelte';
    import { mesh } from '$lib/components/shell/look';
    import type { ShellIcon } from '$lib/components/shell/page-icon';
    import Sticker from '$lib/components/shell/sticker.svelte';
    import ThemeToggle from '$lib/components/shell/theme-toggle.svelte';
    import { catalogSections } from '$lib/docs-pages';
    import { formatStarCount, GITHUB_URL } from '$lib/github';

    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const stars = $derived(formatStarCount(data.starCount ?? null));

    const title = 'Mielui · Svelte components you own';
    const description = `${components.length} Svelte 5 components. Restyle all of them from a handful of design tokens.`;

    const nav = [
        {
            href: resolve('/docs/introduction'),
            label: 'Docs'
        },
        {
            href: resolve('/docs/components'),
            label: 'Components'
        },
        {
            href: resolve('/studio'),
            label: 'Studio'
        },
        {
            href: resolve('/themes'),
            label: 'Themes'
        }
    ];

    const firstComponent = `<script>
  import { Button } from '@mielui/svelte';
<${'/'}script>

<Button>Get started</Button>`;

    const cliCommands = `pnpm dlx @mielui/svelte add button
pnpm dlx @mielui/svelte list`;

    const skillCommand = 'npx skills add mielsense/mielui --skill mielui';

    const chartData = [
        {
            month: 'May',
            installs: 32
        },
        {
            month: 'Jun',
            installs: 41
        },
        {
            month: 'Jul',
            installs: 38
        },
        {
            month: 'Aug',
            installs: 56
        },
        {
            month: 'Sep',
            installs: 64
        },
        {
            month: 'Oct',
            installs: 81
        }
    ];
    const chartConfig = {
        installs: {
            label: 'Installs',
            color: 'var(--chart-1)'
        }
    };

    const installs = chartData.reduce((total, entry) => total + entry.installs, 0);
    const lastMonth = chartData[chartData.length - 1].installs;
    const monthBefore = chartData[chartData.length - 2].installs;
    const growth = Math.round(((lastMonth - monthBefore) / monthBefore) * 100);

    const stats = [
        {
            value: components.length,
            label: 'Components',
            detail: 'Controls, overlays, charts, and AI interfaces'
        },
        {
            value: catalogSections.length,
            label: 'Categories',
            detail: 'From native controls to blocks and actions'
        },
        {
            value: builtInThemePresets.length,
            label: 'Built-in themes',
            detail: 'Each one a set of tokens you can copy'
        }
    ];

    let presetSlug = $state(builtInThemePresets[0].slug);
    const preset = $derived(
        builtInThemePresets.find((entry) => entry.slug === presetSlug) ?? builtInThemePresets[0]
    );
    let volume = $state(64);

    const lean =
        'transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none';
    const leanOut = `${lean} group-hover:-translate-y-0.5`;
    const copy = 'flex flex-col gap-4 p-4 pb-6 sm:p-6 sm:pb-8';
    const heading = 'display text-3xl sm:text-4xl';
    const stage = 'grain flex flex-1 items-center justify-center rounded-[16px] p-4 sm:p-8';
    const card =
        'w-full rounded-[12px] bg-card text-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.1),0_18px_40px_-12px_rgb(0_0_0/0.4)]';
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

{#snippet stepTitle(number: number, text: string)}
    <span class="flex items-center gap-3 text-base text-foreground">
        <span
            class="grid size-6 shrink-0 place-items-center rounded-[7px] bg-secondary text-xs font-medium tabular-nums"
        >
            {number}
        </span>
        {text}
    </span>
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
        class="group/section wrap flex flex-col gap-12 pt-12 pb-16 sm:gap-16 sm:pt-20 sm:pb-20"
    >
        <div class="stagger flex max-w-[46rem] flex-col gap-5">
            <span
                class="grid size-16 place-items-center rounded-[15px] bg-primary shadow-[0_4px_14px_rgb(0_0_0/0.18)] [--color-foreground:white]"
            >
                <BrandMark size={40} />
            </span>
            <h1 id="home-title" class="display m-0 text-5xl sm:text-6xl lg:text-7xl">
                Svelte components you can <span class="accent">own</span>
            </h1>
            <p class="m-0 max-w-[38rem] text-lg leading-relaxed text-foreground-muted">
                Mielui is {components.length} components for Svelte 5 and Tailwind v4. They read one
                set of design tokens, so a theme restyles all of them, and the CLI copies the source
                into your project when you want to change it.
            </p>
            <div class="flex flex-wrap items-center gap-2">
                <Button href={resolve('/docs/components')} size="lg" class="ps-4">
                    <HugeiconsIcon icon={Layers01Icon} size={16} />
                    Browse components
                </Button>
                <Button
                    href={resolve('/docs/introduction')}
                    variant="glow"
                    size="lg"
                    class="glow-plain ps-4"
                >
                    <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                    Read the docs
                </Button>
            </div>
            <p class="m-0 text-sm text-foreground-muted">
                Free and MIT licensed. Svelte 5.56 or newer, Tailwind CSS v4.
            </p>
        </div>
        <div class="grain dusk @container rounded-[24px] p-3 sm:p-8 lg:p-12" data-rise>
            <HomeShowcase />
        </div>
    </section>

    <div class="wrap grid grid-cols-[minmax(0,1fr)] gap-3 sm:gap-4 lg:grid-cols-12">
        <section
            aria-labelledby="home-components"
            class="tile group/section grid grid-cols-[minmax(0,1fr)] gap-2 p-2 lg:col-span-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
            <div class="{copy} justify-center lg:p-8">
                {@render label('Components', Layers01Icon, mesh.indigo)}
                <h2 id="home-components" class="{heading} m-0">
                    {components.length}
                    components, from a button to a coding agent
                </h2>
                <p class="m-0 text-base leading-relaxed text-foreground">
                    Native controls keep their browser behavior. Larger parts, like dialogs, charts,
                    and the AI conversation, are built from named subparts you can omit, reorder, or
                    restyle.
                </p>
                <ul class="m-0 flex list-none flex-wrap gap-1.5 p-0">
                    {#each catalogSections as section (section.href)}
                        <li>
                            <a
                                href={section.href}
                                class="press inline-flex h-7 items-center rounded-[8px] bg-secondary px-2.5 text-sm text-foreground hover:bg-[color-mix(in_oklab,var(--color-foreground)_9%,transparent)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
                            >
                                {section.label}
                            </a>
                        </li>
                    {/each}
                </ul>
                {@render more(resolve('/docs/components'), 'Every component')}
            </div>
            <div class={stage} style:background={mesh.indigo}>
                <div class="{card} flex max-w-[26rem] flex-col gap-5 p-5 sm:p-6">
                    <div class="flex items-center justify-between gap-3">
                        <span class="text-base font-medium">New project</span>
                        <Badge variant="success">Draft saved</Badge>
                    </div>
                    <Input label="Project name" value="Release dashboard" />
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-foreground-muted">Visible to</span>
                        <ToggleGroup.Root type="single" value="team" aria-label="Visible to">
                            <ToggleGroup.Item value="me">Only me</ToggleGroup.Item>
                            <ToggleGroup.Item value="team">Team</ToggleGroup.Item>
                            <ToggleGroup.Item value="public">Everyone</ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    <Checkbox checked label="Send a weekly summary" />
                    <div class="flex justify-end gap-2">
                        <Button variant="secondary">Cancel</Button>
                        <Button>Create project</Button>
                    </div>
                </div>
            </div>
        </section>

        <section
            aria-labelledby="home-studio"
            class="tile group/section flex flex-col p-2 lg:col-span-7"
        >
            <div class={copy}>
                {@render label('Theme Studio', PaintBoardIcon, mesh.pink)}
                <h2 id="home-studio" class="{heading} m-0">
                    One theme, <span class="accent">every</span> component
                </h2>
                <p class="m-0 text-base leading-relaxed text-foreground">
                    Color, type, corners, spacing, and motion are tokens. Change them in Theme
                    Studio, watch real screens update, then export CSS or JSON. Pick a built-in
                    theme below to recolor these controls.
                </p>
                {@render more(resolve('/studio'), 'Open Theme Studio')}
            </div>
            <div class="{stage} flex-col gap-4" style:background={mesh.pink}>
                <div
                    role="group"
                    aria-label="Built-in themes"
                    class="flex max-w-[28rem] flex-wrap justify-center gap-1.5"
                >
                    {#each builtInThemePresets as entry (entry.slug)}
                        <button
                            type="button"
                            aria-label={entry.name}
                            aria-pressed={entry.slug === presetSlug}
                            title={entry.name}
                            class="press size-7 rounded-full shadow-[0_0_0_2px_rgb(255_255_255/0.85),0_2px_6px_rgb(0_0_0/0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white aria-pressed:shadow-[0_0_0_2px_white,0_0_0_4px_rgb(0_0_0/0.55)]"
                            style:background={entry.brand}
                            onclick={() => {
                                presetSlug = entry.slug;
                            }}
                        ></button>
                    {/each}
                </div>
                <div
                    class="{card} flex max-w-[24rem] flex-col gap-5 p-5 sm:p-6"
                    style:--color-primary={preset.brand}
                    style:--color-on-primary={preset.foundation?.light?.onPrimary ?? '#ffffff'}
                    style:--chart-1={preset.brand}
                >
                    <div class="flex flex-col gap-1">
                        <span class="text-base font-medium">{preset.name}</span>
                        <span class="text-sm text-foreground-muted">{preset.description}</span>
                    </div>
                    <Switch checked label="Release alerts" />
                    <Slider bind:value={volume} aria-label="Alert volume" />
                    <Progress value={volume} aria-label="Volume" />
                    <Button class="self-start">Apply theme</Button>
                </div>
            </div>
        </section>

        <section
            aria-labelledby="home-charts"
            class="tile group/section flex flex-col p-2 lg:col-span-5"
        >
            <div class={copy}>
                {@render label('Charts', Analytics01Icon, mesh.blue)}
                <h2 id="home-charts" class="{heading} m-0">Charts on the same tokens</h2>
                <p class="m-0 text-base leading-relaxed text-foreground">
                    Areas, bars, lines, gauges, and heatmaps take their color from the chart tokens,
                    so they match the rest of the page in light and dark mode.
                </p>
                {@render more(resolve('/docs/components/chart-components'), 'Chart components')}
            </div>
            <div class={stage} style:background={mesh.sky}>
                <div class="{card} flex flex-col gap-4 p-5">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex flex-col">
                            <span class="text-sm text-foreground-muted">Installs, sample data</span>
                            <span class="text-2xl font-semibold tabular-nums">{installs}</span>
                        </div>
                        <Badge variant="success">+{growth}%</Badge>
                    </div>
                    <Chart.Root
                        data={chartData}
                        config={chartConfig}
                        x="month"
                        aria-label="Sample installs per month"
                        class="w-full"
                    >
                        <Chart.Plot class="h-40">
                            <Chart.Grid />
                            <Chart.XAxis />
                            <Chart.Bar key="installs" radius={4} />
                        </Chart.Plot>
                        <Chart.Tooltip />
                    </Chart.Root>
                </div>
            </div>
        </section>

        <section
            aria-labelledby="home-skill"
            class="tile group/section flex flex-col p-2 lg:col-span-5"
        >
            <div class={copy}>
                {@render label('Agent skill', SparklesIcon, mesh.violet)}
                <h2 id="home-skill" class="{heading} m-0">Your coding agent knows the API</h2>
                <p class="m-0 text-base leading-relaxed text-foreground">
                    The Mielui skill gives your coding agent the component APIs, composition
                    patterns, and design guidance. It loads the current docs and checks your
                    installed version before it recommends an API.
                </p>
                {@render more(resolve('/docs/agent-skill'), 'Agent skill')}
            </div>
            <div class={stage} style:background={mesh.lime}>
                <div class="{card} p-2">
                    <CodeBlock code={skillCommand} lang="sh" copy="overlay" />
                </div>
            </div>
        </section>

        <section
            aria-labelledby="home-source"
            class="tile group/section flex flex-col p-2 lg:col-span-7"
        >
            <div class={copy}>
                {@render label('Your source', CommandLineIcon, mesh.orange)}
                <h2 id="home-source" class="{heading} m-0">
                    Import it, or <span class="accent">copy</span> it in
                </h2>
                <p class="m-0 text-base leading-relaxed text-foreground">
                    Use the package and get updates, or let the CLI copy a component's source into
                    your project. Copied files are plain Svelte and Tailwind, and they are yours to
                    change.
                </p>
                {@render more(resolve('/docs/installation'), 'Installation')}
            </div>
            <div class={stage} style:background={mesh.orange}>
                <div class="{card} max-w-[30rem] p-2">
                    <CodeBlock code={cliCommands} lang="sh" copy="overlay" />
                </div>
            </div>
        </section>
    </div>

    <section
        aria-labelledby="home-demos"
        class="group/section wrap flex flex-col gap-8 py-16 sm:py-24"
    >
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div class="flex max-w-[40rem] flex-col gap-4">
                {@render label('Live demos', AiChat02Icon, mesh.mauve)}
                <h2 id="home-demos" class="{heading} m-0">Try it before you install it</h2>
                <p class="m-0 text-base leading-relaxed text-foreground">
                    These three screens are live, and each one is put together from components in
                    the docs. Pick another thread, send a follow-up, or change the issue's labels.
                </p>
            </div>
            {@render more(resolve('/docs/components/ai-components'), 'AI components')}
        </div>
        <HomeDemos />
    </section>

    <section aria-labelledby="home-numbers" class="wrap flex flex-col gap-8 pb-16 sm:pb-24">
        <h2 id="home-numbers" class="sr-only">Mielui in numbers</h2>
        <dl class="tile m-0 grid sm:grid-cols-3">
            {#each stats as stat (stat.label)}
                <div
                    class="flex flex-col gap-1 border-t border-border p-6 first:border-t-0 sm:border-s sm:border-t-0 sm:p-8 sm:first:border-s-0"
                >
                    <dt class="order-2 text-base text-foreground">{stat.label}</dt>
                    <dd
                        class="order-1 m-0 mb-2 text-5xl font-medium tracking-[-0.035em] text-foreground tabular-nums"
                    >
                        {stat.value}
                    </dd>
                    <dd class="order-3 m-0 text-sm text-foreground-muted">{stat.detail}</dd>
                </div>
            {/each}
        </dl>
    </section>

    <section
        aria-labelledby="home-get"
        class="group/section wrap grid grid-cols-[minmax(0,1fr)] gap-12 pb-16 sm:pb-24 lg:grid-cols-2 lg:gap-16"
    >
        <div
            class="grain sunrise flex min-h-[22rem] flex-col justify-between gap-10 rounded-[24px] p-6 text-[#2b1000] sm:min-h-[26rem] sm:p-8"
        >
            <span
                class="grid size-16 place-items-center rounded-[15px] bg-[#2b1000] shadow-[0_8px_24px_rgb(120_30_0/0.35)] [--color-foreground:white]"
            >
                <BrandMark size={40} />
            </span>
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <h2
                        id="home-get"
                        class="m-0 text-5xl leading-[1.02] font-medium tracking-[-0.035em] text-balance text-[#2b1000]"
                    >
                        Build with Mielui
                    </h2>
                    <p class="m-0 text-base text-[#3b1600]">
                        Free and MIT licensed. Every component ships with its source.
                    </p>
                </div>
                <Button
                    variant="glow"
                    href={resolve('/docs/installation')}
                    class="group glow-white h-12 w-full justify-between rounded-[12px] ps-4 pe-3.5 text-base"
                >
                    <span class="flex items-center gap-2">
                        <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                        Read the installation guide
                    </span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={15} class={lean} />
                </Button>
                <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        class="group inline-flex items-center gap-1.5 font-medium text-[#2b1000] decoration-1 underline-offset-4 hover:underline"
                    >
                        <HugeiconsIcon icon={GithubIcon} size={14} />
                        Source on GitHub
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={12} class={leanOut} />
                    </a>
                    <a
                        href={resolve('/docs/changelog')}
                        class="group inline-flex items-center gap-1.5 font-medium text-[#2b1000] decoration-1 underline-offset-4 hover:underline"
                    >
                        What's new
                        <HugeiconsIcon icon={ArrowRight01Icon} size={12} class={lean} />
                    </a>
                </div>
            </div>
        </div>
        <div class="flex min-w-0 flex-col justify-center gap-6">
            <h3 class="m-0 text-lg font-medium text-foreground">Get started in a minute</h3>
            <ol class="m-0 flex list-none flex-col gap-6 p-0">
                <li class="flex min-w-0 flex-col gap-3">
                    {@render stepTitle(1, 'Add the package')}
                    <PackageCommand command="pnpm add @mielui/svelte" />
                </li>
                <li class="flex min-w-0 flex-col gap-3">
                    {@render stepTitle(2, 'Import the stylesheet in your app.css')}
                    <CodeBlock code="@import '@mielui/svelte/ui.css';" lang="css" copy="overlay" />
                </li>
                <li class="flex min-w-0 flex-col gap-3">
                    {@render stepTitle(3, 'Use a component')}
                    <CodeBlock code={firstComponent} lang="svelte" copy="overlay" />
                </li>
            </ol>
        </div>
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
