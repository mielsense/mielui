<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Table from '@mielui/svelte/components/table';
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import InlineText, { inlineLinkClass } from '$lib/components/docs/inline-text.svelte';
    import PackageCommand from '$lib/components/docs/package-command.svelte';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

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

    const nextSteps = [
        {
            label: 'Installation',
            href: resolve('/docs/installation'),
            description: 'Set up package imports or the source-copy workflow.'
        },
        {
            label: 'Components',
            href: resolve('/docs/components'),
            description: 'Explore live examples, supported props, and composition patterns.'
        },
        {
            label: 'Theming',
            href: resolve('/docs/theming'),
            description: 'Apply a preset or connect theme tokens to your own design.'
        },
        {
            label: 'Agent skill',
            href: resolve('/docs/agent-skill'),
            description: 'Give your coding agent Mielui-specific guidance for implementation.'
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
            Mielui brings components, motion, and theming together for Svelte 5. Start with everyday
            controls, compose more involved interfaces from named parts, and tune their appearance
            through a shared set of theme tokens.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            The library includes inputs, navigation, dialogs, data displays, charts, and AI
            interface components. Each component page pairs a live preview with source examples and
            an API reference, so you can try the behavior before adding it to your project.
        </Typography.Text>
    </section>

    <section id="two-ways" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Choose how to use it</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Both paths use the same components and theme system. Choose based on whether you want
            dependency updates or direct ownership of the implementation.
        </Typography.Text>
        <Table.ScrollArea
            tabindex={0}
            aria-label="Package imports and CLI source copy"
            class="focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        >
            <Table.Root variant="inset" class="min-w-[34rem]">
                <Table.Caption class="sr-only">
                    Package imports and CLI source copy compared
                </Table.Caption>
                <Table.Header>
                    <Table.Row class="hover:bg-transparent">
                        <Table.Head class="w-1/5">Decision</Table.Head>
                        <Table.Head>Package import</Table.Head>
                        <Table.Head>CLI source copy</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each comparison as row (row.decision)}
                        <Table.Row class="align-top hover:bg-transparent">
                            <Table.Head
                                {...{ scope: 'row' as const }}
                                class="border-b-0 align-top font-medium text-foreground"
                            >
                                {row.decision}
                            </Table.Head>
                            <Table.Cell class="align-top text-foreground-muted">
                                {row.package}
                            </Table.Cell>
                            <Table.Cell class="align-top text-foreground-muted">
                                {row.source}
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
        <Typography.Text variant="body" class="m-0">
            If you are trying Mielui for the first time, package imports are a straightforward place
            to start. Choose source copy when you already know you need to change component
            behavior.
        </Typography.Text>
    </section>

    <section id="requirements" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Requirements</Typography.H2>
        <ul
            class="m-0 flex list-disc flex-col gap-1.5 ps-5 text-base leading-relaxed text-foreground marker:text-foreground-muted"
        >
            <li>Svelte 5.56 or newer, with or without SvelteKit</li>
            <li>Tailwind CSS v4</li>
        </ul>
        <Typography.Text variant="body" class="m-0">
            Use pnpm, npm, Yarn, or Bun to install the library. Each command below has a tab per
            package manager. Start with an existing Svelte app and import the Mielui stylesheet once
            at the application level.
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
                text={`Set colors, typography, corners, spacing, and motion together in [Theme Studio](${resolve('/studio')}). Preview the result on working components, then export CSS or JSON. Shared tokens keep your controls and surfaces consistent as the interface grows.`}
            />
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Compound components expose named parts such as Root, Trigger, and Content. Compose the
            parts shown in each component’s documentation, and use classes to adjust individual
            regions without replacing the whole component.
        </Typography.Text>
    </section>

    <section id="next" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Where to go next</Typography.H2>
        <dl class="m-0 grid gap-x-8 gap-y-3 text-base leading-relaxed sm:grid-cols-[auto_1fr]">
            {#each nextSteps as step (step.href)}
                <div class="grid gap-y-0.5 sm:col-span-2 sm:grid-cols-subgrid">
                    <dt class="font-medium">
                        <a class={inlineLinkClass} href={step.href}>{step.label}</a>
                    </dt>
                    <dd class="m-0 text-foreground-muted">{step.description}</dd>
                </div>
            {/each}
        </dl>
    </section>
</div>
