<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import * as Typography from '@mielui/svelte/components/typography';
    import { resolve } from '$app/paths';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    const packageQuick = `pnpm add @mielui/svelte`;

    const stylesheet = `@import '@mielui/svelte/ui.css';`;

    const firstComponent = `<script>
  import { Button } from '@mielui/svelte';
<${'/'}script>

<Button>Get started</Button>`;

    const cliQuick = `pnpm dlx @mielui/svelte init -y
pnpm dlx @mielui/svelte add button`;
</script>

<svelte:head>
    <title>Mielui · Introduction</title>
    <meta name="description" content="mielui is a Svelte 5 and Tailwind v4 component library." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Introduction">
        mielui is a component library for Svelte 5 and Tailwind v4. It includes components, theme
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
        <div class="overflow-x-auto rounded-[var(--radius-lg)] border border-border/60">
            <table class="w-full min-w-[34rem] border-collapse text-left text-sm leading-6">
                <caption class="sr-only">
                    Package imports and CLI source copy compared
                </caption>
                <thead class="bg-secondary/60 text-foreground">
                    <tr>
                        <th scope="col" class="px-4 py-3 font-semibold">Decision</th>
                        <th scope="col" class="px-4 py-3 font-semibold">Package import</th>
                        <th scope="col" class="px-4 py-3 font-semibold">CLI source copy</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-border/50 text-foreground-muted">
                    <tr>
                        <th scope="row" class="px-4 py-3 font-medium text-foreground">Best fit</th>
                        <td class="px-4 py-3">Use the library through its public API.</td>
                        <td class="px-4 py-3">Adapt component internals for your product.</td>
                    </tr>
                    <tr>
                        <th scope="row" class="px-4 py-3 font-medium text-foreground">Source</th>
                        <td class="px-4 py-3">Imported from @mielui/svelte.</td>
                        <td class="px-4 py-3">Copied into your repository.</td>
                    </tr>
                    <tr>
                        <th scope="row" class="px-4 py-3 font-medium text-foreground">
                            Customization
                        </th>
                        <td class="px-4 py-3">
                            Compose parts, set props, and apply classes or tokens.
                        </td>
                        <td class="px-4 py-3">
                            Use the same options, plus edit the source directly.
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="px-4 py-3 font-medium text-foreground">Updates</th>
                        <td class="px-4 py-3">Upgrade the package dependency.</td>
                        <td class="px-4 py-3">
                            Review upstream changes alongside your local edits.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Typography.Text variant="body" class="m-0">
            If you are trying Mielui for the first time, package imports are a straightforward place
            to start. Choose source copy when you already know you need to change component
            behavior.
        </Typography.Text>
    </section>

    <section id="requirements" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Requirements</Typography.H2>
        <ul
            class="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[1rem] text-foreground leading-relaxed"
        >
            <li>Svelte 5.56 or newer, with or without SvelteKit</li>
            <li>Tailwind CSS v4</li>
        </ul>
        <Typography.Text variant="body" class="m-0">
            Use pnpm, npm, or Yarn to install the library. The examples below use pnpm. Start with
            an existing Svelte app and import the Mielui stylesheet once at the application level.
        </Typography.Text>
    </section>

    <section id="quick-start" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Quick start</Typography.H2>
        <Typography.Text variant="body" class="m-0">Install the package:</Typography.Text>
        <CodeBlock code={packageQuick} lang="shell" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            Import the shared styles in your application stylesheet:
        </Typography.Text>
        <CodeBlock code={stylesheet} lang="css" copy="overlay" />
        <Typography.Text variant="body" class="m-0">Then use your first component:</Typography.Text>
        <CodeBlock code={firstComponent} lang="svelte" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            Prefer local source? Initialize the CLI and add a component instead:
        </Typography.Text>
        <CodeBlock code={cliQuick} lang="shell" copy="overlay" />
        <Typography.Text variant="body" class="m-0">
            Follow<a
                class="text-foreground underline underline-offset-4"
                href={resolve('/docs/installation')}
            >
                Installation
            </a>
            for the local stylesheet import, component paths, and full setup for either approach.
        </Typography.Text>
    </section>

    <section id="your-theme" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Make it your own</Typography.H2>
        <Typography.Text variant="body" class="m-0">
            Set colors, typography, corners, spacing, and motion together in
            <a class="text-foreground underline underline-offset-4" href={resolve('/studio')}>
                Theme Studio
            </a>
            . Preview the result on working components, then export CSS or JSON. Shared tokens keep
            your controls and surfaces consistent as the interface grows.
        </Typography.Text>
        <Typography.Text variant="body" class="m-0">
            Compound components expose named parts such as Root, Trigger, and Content. Compose the
            parts shown in each component’s documentation, and use classes to adjust individual
            regions without replacing the whole component.
        </Typography.Text>
    </section>

    <section id="next" class="scroll-mt-20 flex flex-col gap-4">
        <Typography.H2 class="docs-section-heading">Where to go next</Typography.H2>
        <dl class="m-0 grid gap-x-8 gap-y-4 text-sm leading-6 sm:grid-cols-[auto_1fr]">
            <dt>
                <a
                    class="font-medium text-foreground underline underline-offset-4"
                    href={resolve('/docs/installation')}
                >
                    Installation
                </a>
            </dt>
            <dd class="m-0 text-foreground-muted">
                Set up package imports or the source-copy workflow.
            </dd>
            <dt>
                <a
                    class="font-medium text-foreground underline underline-offset-4"
                    href={resolve('/docs/components')}
                >
                    Components
                </a>
            </dt>
            <dd class="m-0 text-foreground-muted">
                Explore live examples, supported props, and composition patterns.
            </dd>
            <dt>
                <a
                    class="font-medium text-foreground underline underline-offset-4"
                    href={resolve('/docs/theming')}
                >
                    Theming
                </a>
            </dt>
            <dd class="m-0 text-foreground-muted">
                Apply a preset or connect theme tokens to your own design.
            </dd>
            <dt>
                <a
                    class="font-medium text-foreground underline underline-offset-4"
                    href={resolve('/docs/agent-skill')}
                >
                    Agent skill
                </a>
            </dt>
            <dd class="m-0 text-foreground-muted">
                Give your coding agent Mielui-specific guidance for implementation.
            </dd>
        </dl>
    </section>
</div>
