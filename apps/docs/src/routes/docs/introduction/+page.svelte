<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import InlineText from '$lib/components/docs/inline-text.svelte';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';
    import Rows from '$lib/components/docs/rows.svelte';
    import { catalogSections } from '$lib/docs-pages';

    const packageQuick = 'pnpm add @mielui/svelte';

    const stylesheet = `@import '@mielui/svelte/ui.css';`;

    const firstComponent = `<script>
  import { Button } from '@mielui/svelte';
<${'/'}script>

<Button>Get started</Button>`;

    const cliQuick = `pnpm dlx @mielui/svelte init -y
pnpm dlx @mielui/svelte add button`;

    const comparison = [
        {
            decision: 'Best fit',
            package: 'Use the library through its public API.',
            source: 'Adapt component internals for your product.'
        },
        {
            decision: 'Source',
            package: 'Imported from @mielui/svelte.',
            source: 'Copied into your repository.'
        },
        {
            decision: 'Customization',
            package: 'Compose parts, set props, and apply classes or tokens.',
            source: 'Use the same options, plus edit the source directly.'
        },
        {
            decision: 'Updates',
            package: 'Upgrade the package dependency.',
            source: 'Review upstream changes alongside your local edits.'
        }
    ];

    const requirements = [
        { label: 'Svelte', value: '5.56 or newer, with or without SvelteKit' },
        { label: 'Tailwind CSS', value: 'v4' },
        { label: 'Package manager', value: 'pnpm, npm, Yarn, or Bun' }
    ];

    const paths = [
        {
            title: 'Package import',
            rows: comparison.map((row) => ({ decision: row.decision, text: row.package }))
        },
        {
            title: 'CLI source copy',
            rows: comparison.map((row) => ({ decision: row.decision, text: row.source }))
        }
    ];

    const nextSteps = [
        {
            label: 'Installation',
            href: resolve('/docs/installation'),
            value: 'Set up package imports or the source-copy workflow.'
        },
        {
            label: 'Components',
            href: resolve('/docs/components'),
            value: 'Explore live examples, supported props, and composition patterns.'
        },
        {
            label: 'Theming',
            href: resolve('/docs/theming'),
            value: 'Apply a preset or connect theme tokens to your own design.'
        },
        {
            label: 'Agent skill',
            href: resolve('/docs/agent-skill'),
            value: 'Give your coding agent Mielui-specific guidance for implementation.'
        }
    ];
</script>

<svelte:head>
    <title>Mielui · Introduction</title>
    <meta name="description" content="Mielui is a Svelte 5 and Tailwind v4 component library." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Introduction">
        Mielui is a component library for Svelte 5 and Tailwind v4. It includes components, theme
        tokens, and a CLI for copying source into your project.
    </PageIntro>

    <section id="overview" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Build with Mielui</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Start with everyday controls, compose larger interfaces from named parts, and tune
            everything through one set of theme tokens. Each component page pairs a live preview
            with source examples and an API reference.
        </Typography.Text>
        <Rows items={catalogSections} label="What is included" />
    </section>

    <section id="two-ways" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Choose how to use it</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Both paths use the same components and theme system. Choose based on whether you want
            dependency updates or direct ownership of the implementation.
        </Typography.Text>
        <div class="grid gap-3 sm:grid-cols-2">
            {#each paths as path (path.title)}
                <div class="mielui-inset-frame">
                    <div class="mielui-inset-surface flex h-full flex-col gap-3 p-4">
                        <h3 class="m-0 text-sm font-medium text-foreground">{path.title}</h3>
                        <dl class="m-0 flex flex-col gap-3">
                            {#each path.rows as row (row.decision)}
                                <div class="flex flex-col gap-0.5">
                                    <dt class="text-xs text-foreground-muted">{row.decision}</dt>
                                    <dd class="m-0 text-sm leading-6 text-foreground">
                                        {row.text}
                                    </dd>
                                </div>
                            {/each}
                        </dl>
                    </div>
                </div>
            {/each}
        </div>
        <Typography.Text variant="body" class="m-0">
            Trying Mielui for the first time? Start with package imports. Choose source copy when
            you already know you need to change component behavior.
        </Typography.Text>
    </section>

    <section id="requirements" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Requirements</Typography.H2>
        <Rows items={requirements} label="Requirements" />
        <Typography.Text variant="body" class="m-0">
            Start with an existing Svelte app and import the Mielui stylesheet once at the
            application level.
        </Typography.Text>
    </section>

    <section id="quick-start" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Quick start</Typography.H2>
        <Typography.Text variant="body" class="m-0">Install the package:</Typography.Text>
        <PackageCommand command={packageQuick} />
        <Typography.Text variant="body" class="m-0">
            Import the shared styles in your application stylesheet:
        </Typography.Text>
        <CodeBlock code={stylesheet} lang="css" copy="overlay" />
        <Typography.Text variant="body" class="m-0">Then use your first component:</Typography.Text>
        <CodeBlock code={firstComponent} lang="svelte" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            Prefer local source? Initialize the CLI and add a component instead:
        </Typography.Text>
        <PackageCommand command={cliQuick} />
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text={`Follow [Installation](${resolve('/docs/installation')}) for the local stylesheet import, component paths, and full setup for either approach.`}
            />
        </Typography.Text>
    </section>

    <section id="your-theme" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Make it your own</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            <InlineText
                text={`Set colors, typography, corners, spacing, and motion together in [Theme Studio](${resolve('/studio')}). Preview the result on working components, then export CSS or JSON.`}
            />
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Compound components expose named parts such as Root, Trigger, and Content. Compose the
            parts shown on each component page, and use classes to adjust individual regions without
            replacing the whole component.
        </Typography.Text>
    </section>

    <section id="next" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Where to go next</Typography.H2>
        <Rows items={nextSteps} label="Next steps" />
    </section>
</div>
