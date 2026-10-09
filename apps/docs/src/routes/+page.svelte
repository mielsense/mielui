<script lang="ts">
    import { ArrowRight02Icon as ArrowRight } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { resolve } from '$app/paths';
    import { components } from '$lib/components';
    import NavigationSheet from '$lib/components/docs/navigation-sheet.svelte';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import Rows from '$lib/components/docs/rows.svelte';
    import { catalogSections } from '$lib/docs-pages';
    import '$lib/components/docs/docs-layout.css';
    import HomeDemos from '$lib/components/demos/demos.svelte';
    import { reveal, revealClass } from '$lib/components/home/reveal';
    import HomeShowcase from '$lib/components/home/showcase.svelte';
    import Header from '$lib/components/shell/header.svelte';
    import pkg from '../../../../packages/mielui/package.json';

    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();

    const title = 'mielui · Premium Svelte components you own';
    const description = `${components.length} Svelte 5 components. Restyle all of them from a handful of design tokens.`;

    const installCommand = 'pnpm add @mielui/svelte';

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
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
</svelte:head>

<div class="@container flex min-h-dvh flex-col">
    <a
        href="#home-content"
        class="sr-only z-50 rounded-[var(--radius-control)] bg-card px-4 py-2 text-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
    >
        Skip to content
    </a>
    <Header floating starCount={data.starCount ?? null}>
        {#snippet leading()}
            <NavigationSheet />
        {/snippet}
    </Header>

    <div
        class="mx-auto flex w-full max-w-[76rem] flex-col gap-16 px-3 pt-3 pb-12 sm:gap-24 sm:px-6 sm:pb-20"
    >
        <section
            id="home-content"
            aria-labelledby="home-title"
            class="mielui-inset-frame grid grid-cols-1 shadow-[var(--elevation-1)] @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
        >
            <div
                class="flex flex-col justify-center px-6 pt-10 pb-8 @xl:px-10 @4xl:py-16 @6xl:px-14"
            >
                <a
                    href={resolve('/docs/changelog')}
                    class="group flex w-fit items-center gap-2 rounded-[var(--radius-control)] border-[length:var(--border-size)] border-border bg-card py-1 ps-2.5 pe-3 text-xs font-medium text-foreground-muted shadow-[var(--elevation-1)] transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none motion-reduce:transition-none"
                >
                    <span aria-hidden="true" class="size-1.5 rounded-full bg-primary"></span>
                    <span class="tabular-nums">Version {pkg.version}</span>
                    <span aria-hidden="true" class="text-border-strong">·</span>
                    <span>See what changed</span>
                    <HugeiconsIcon
                        icon={ArrowRight}
                        size={12}
                        aria-hidden="true"
                        class="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                </a>
                <h1
                    id="home-title"
                    class="m-0 mt-7 text-[clamp(2.75rem,7cqw,4.75rem)] leading-[1] font-medium tracking-[-0.035em] text-foreground"
                >
                    Svelte UI.
                    <span class="block text-foreground-muted">Your way.</span>
                </h1>
                <p class="m-0 mt-6 max-w-[34ch] text-[17px] leading-7 text-foreground-muted">
                    <span class="tabular-nums text-foreground">{components.length} components</span>
                    on one theme. Install the package or copy the source, then make every one of
                    them yours from a handful of tokens.
                </p>
                <div class="mt-8 flex flex-wrap items-center gap-2.5">
                    <Button href={resolve('/docs/components')} variant="glow" size="lg">
                        Browse components
                        <HugeiconsIcon icon={ArrowRight} size={15} />
                    </Button>
                    <Button href={resolve('/studio')} variant="secondary" size="lg">
                        Open Studio
                    </Button>
                </div>
                <div
                    class="mt-8 flex w-fit max-w-full items-center gap-1 font-mono text-[13px] text-foreground-muted"
                >
                    <span aria-hidden="true" class="text-border-strong select-none">$</span>
                    <code class="truncate ps-1.5">{installCommand}</code>
                    <CopyButton text={installCommand} label="Copy the install command" />
                </div>
            </div>
            <div
                class="mielui-inset-surface relative flex min-h-[25rem] min-w-0 items-center justify-center overflow-clip px-4 py-8 @xl:px-8 @4xl:min-h-[34rem]"
            >
                <HomeShowcase />
            </div>
        </section>

        <div {@attach reveal()} class={revealClass}>
            <HomeDemos />
        </div>

        <div class="docs-article flex w-full flex-col gap-16 sm:gap-24">
            {#each sections as section (section.id)}
                <section
                    {@attach reveal()}
                    aria-labelledby={section.id}
                    class={`grid grid-cols-1 gap-x-12 gap-y-5 @4xl:grid-cols-[18rem_minmax(0,1fr)] ${revealClass}`}
                >
                    <div class="flex flex-col gap-2 px-1">
                        <h2
                            id={section.id}
                            class="m-0 text-2xl leading-8 font-medium tracking-[-0.025em] text-foreground tabular-nums"
                        >
                            {section.title}
                        </h2>
                        <p class="m-0 max-w-[36ch] text-[15px] leading-7 text-foreground-muted">
                            {section.description}
                        </p>
                    </div>
                    <div class="flex min-w-0 flex-col gap-3">
                        {#if section.id === 'home-install'}
                            <PackageCommand command={installCommand} />
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

        <section
            {@attach reveal()}
            aria-labelledby="home-start"
            class={`mielui-plate flex flex-col items-center gap-6 px-6 py-14 text-center sm:py-20 ${revealClass}`}
        >
            <h2
                id="home-start"
                class="m-0 max-w-[18ch] text-[clamp(2rem,5cqw,3.25rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance text-foreground"
            >
                Start with a button.
                <span class="text-foreground-muted">Keep the whole kit.</span>
            </h2>
            <div class="flex flex-wrap items-center justify-center gap-2.5">
                <Button href={resolve('/docs/installation')} variant="glow" size="lg">
                    Install Mielui
                    <HugeiconsIcon icon={ArrowRight} size={15} />
                </Button>
                <Button href={resolve('/themes')} variant="ghost" size="lg">Browse themes</Button>
            </div>
        </section>

        <footer
            class="flex w-full flex-wrap items-center justify-between gap-3 px-1 text-xs text-foreground-muted"
        >
            <span>Mielui · Made for Svelte</span>
            <div class="flex items-center gap-5">
                <a
                    href={resolve('/docs/installation')}
                    class="transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground motion-reduce:transition-none"
                >
                    Get started
                </a>
                <a
                    href={resolve('/docs/changelog')}
                    class="transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground motion-reduce:transition-none"
                >
                    Changelog
                </a>
                <a
                    href="https://github.com/mielsense/mielui"
                    target="_blank"
                    rel="noreferrer"
                    class="transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground motion-reduce:transition-none"
                >
                    GitHub
                </a>
            </div>
        </footer>
    </div>
</div>
